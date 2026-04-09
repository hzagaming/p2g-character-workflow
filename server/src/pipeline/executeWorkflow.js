const path = require("path");
const fs = require("fs/promises");
const {
  getWorkflow,
  markStepStatus,
  mergeWorkflowOutputs,
  setWorkflowOutputs,
  setWorkflowStatus
} = require("../services/workflowStore");
const {
  createBackgroundRemovalPrompt,
  getCgPrompts,
  getExpressionPrompt
} = require("../services/promptLoader");
const {
  getBackgroundRemovalRunner,
  getCgRunner,
  getExpressionRunner,
  getMimeTypeFromPath
} = require("../services/providerRegistry");
const { formatErrorDetails } = require("../utils/errors");

function toPublicOutputUrl(workflowId, fileName) {
  return `/outputs/${workflowId}/${fileName}`;
}

async function writeManifestSnapshot(workflowId, outputDir, promptPack) {
  const workflow = getWorkflow(workflowId);
  if (!workflow) {
    return null;
  }

  const manifest = {
    workflow_id: workflowId,
    status: workflow.status,
    current_step: workflow.current_step,
    generated_at: new Date().toISOString(),
    error: workflow.error,
    error_details: workflow.error_details,
    steps: workflow.steps,
    prompts: promptPack,
    outputs: workflow.outputs
  };

  const manifestFileName = "manifest.json";
  await fs.writeFile(path.join(outputDir, manifestFileName), JSON.stringify(manifest, null, 2), "utf8");
  mergeWorkflowOutputs(workflowId, {
    manifest: toPublicOutputUrl(workflowId, manifestFileName)
  });

  return manifest;
}

async function runStep(workflowId, stepName, provider, runFn, onSuccess, options = {}) {
  const { fatal = true, updateCurrentStep = true } = options;
  markStepStatus(workflowId, stepName, "running", null, { provider });
  if (updateCurrentStep) {
    setWorkflowStatus(workflowId, "running", stepName, null, null);
  }

  try {
    const result = await runFn();
    const outputUrl = result?.output_path
      ? toPublicOutputUrl(workflowId, path.basename(result.output_path))
      : null;

    markStepStatus(workflowId, stepName, "success", null, {
      provider,
      output_url: outputUrl,
      debug: result?.debug || null
    });

    if (typeof onSuccess === "function") {
      await onSuccess(result, outputUrl);
    }

    return result;
  } catch (error) {
    const detailed = formatErrorDetails(error, {
      step: stepName,
      provider,
      workflow_id: workflowId
    });

    markStepStatus(workflowId, stepName, "failed", detailed.message, {
      provider,
      debug: detailed.debug
    });
    if (fatal) {
      setWorkflowStatus(workflowId, "failed", stepName, detailed.message, detailed.debug);
      throw error;
    }

    return null;
  }
}

async function skipStep(workflowId, outputDir, promptPack, stepName, provider, message, debug = null) {
  markStepStatus(workflowId, stepName, "skipped", message, {
    provider,
    debug
  });
  setWorkflowStatus(workflowId, "running", stepName, null, null);
  await writeManifestSnapshot(workflowId, outputDir, promptPack);
}

async function executeWorkflow(workflowId, config) {
  const workflow = getWorkflow(workflowId);
  if (!workflow) {
    return null;
  }

  const promptPack = {
    expressions: {},
    cg: [],
    expression_cutouts: {
      provider: config.bgRemovalProvider,
      prompt: createBackgroundRemovalPrompt()
    }
  };

  try {
    const originalSourcePath = workflow.source_image.upload_path;
    const originalSourceMimeType = workflow.source_image.mime_type;
    const outputDir = path.join(config.outputDir, workflowId);
    const backgroundRemovalRunner = getBackgroundRemovalRunner(config);
    const expressionRunner = getExpressionRunner(config);
    const cgRunner = getCgRunner(config);

    await fs.mkdir(outputDir, { recursive: true });

    mergeWorkflowOutputs(workflowId, {
      providers: {
        remove_background: backgroundRemovalRunner.provider,
        expressions: expressionRunner.provider,
        cg: cgRunner.provider
      }
    });

    await runStep(workflowId, "validate_input", "system", async () => true);
    await writeManifestSnapshot(workflowId, outputDir, promptPack);

    const expressionMap = {
      thinking: "expression_thinking",
      surprise: "expression_surprise",
      angry: "expression_angry"
    };
    const successfulExpressionArtifacts = {};

    // Two independent queues:
    // - Web image generation (Plato/Banana/etc): unlimited concurrency (no limiter).
    // - Local python post-processing (rembg): separate queue, typically concurrency=1.
    let rembgActive = 0;
    const rembgQueue = [];

    async function runRembgQueued(taskFn) {
      const limit = Math.max(1, Number.parseInt(String(config.rembgConcurrency ?? 1), 10) || 1);
      if (rembgActive >= limit) {
        await new Promise((resolve) => rembgQueue.push(resolve));
      }
      rembgActive += 1;
      try {
        return await taskFn();
      } finally {
        rembgActive -= 1;
        const next = rembgQueue.shift();
        if (next) {
          next();
        }
      }
    }

    async function enqueueCutout(expressionName) {
      const stepName = `cutout_expression_${expressionName}`;
      const sourceArtifact = successfulExpressionArtifacts[expressionName];

      if (!sourceArtifact?.outputPath) {
        await skipStep(
          workflowId,
          outputDir,
          promptPack,
          stepName,
          backgroundRemovalRunner.provider,
          `Skipped because ${expressionMap[expressionName]} failed, so no expression image was available for cutout.`,
          {
            dependency_step: expressionMap[expressionName],
            reason: "missing_expression_output"
          }
        );
        return null;
      }

      return runRembgQueued(() =>
        runStep(
          workflowId,
          stepName,
          backgroundRemovalRunner.provider,
          async () =>
            backgroundRemovalRunner.run({
              config,
              sourcePath: sourceArtifact.outputPath,
              sourceMimeType: sourceArtifact.mimeType,
              destinationPath: path.join(outputDir, `expression-${expressionName}-cutout.png`),
              prompt: promptPack.expression_cutouts.prompt
            }),
          async (_result, outputUrl) => {
            mergeWorkflowOutputs(workflowId, {
              expression_cutouts: {
                [expressionName]: outputUrl
              },
              providers: {
                remove_background: backgroundRemovalRunner.provider
              }
            });
            await writeManifestSnapshot(workflowId, outputDir, promptPack);
          },
          {
            fatal: false,
            updateCurrentStep: false
          }
        )
      );
    }

    setWorkflowStatus(workflowId, "running", "web_image_gen", null, null);

    const cutoutPromises = [];
    const expressionPromises = Object.entries(expressionMap).map(async ([expressionName, stepName]) => {
      const expressionPrompt = await getExpressionPrompt(expressionName);
      promptPack.expressions[expressionName] = expressionPrompt;

      const expressionResult = await runStep(
        workflowId,
        stepName,
        expressionRunner.provider,
        async () =>
          expressionRunner.run({
            config,
            sourcePath: originalSourcePath,
            sourceMimeType: originalSourceMimeType,
            destinationPath: path.join(outputDir, `expression-${expressionName}.png`),
            prompt: expressionPrompt
          }),
        async (result, outputUrl) => {
          successfulExpressionArtifacts[expressionName] = {
            outputPath: result.output_path,
            mimeType: getMimeTypeFromPath(result.output_path)
          };
          mergeWorkflowOutputs(workflowId, {
            expressions: {
              [expressionName]: outputUrl
            },
            providers: {
              expressions: expressionRunner.provider
            }
          });
          await writeManifestSnapshot(workflowId, outputDir, promptPack);

          // As soon as an expression image exists, enqueue cutout on the local queue.
          cutoutPromises.push(enqueueCutout(expressionName));
        },
        {
          fatal: false,
          updateCurrentStep: false
        }
      );

      if (!expressionResult) {
        successfulExpressionArtifacts[expressionName] = null;
        cutoutPromises.push(enqueueCutout(expressionName));
      }

      return expressionResult;
    });

    const cgPromptEntries = await getCgPrompts();

    const cgPromises = [
      ["cg_01", "cg-01.png"],
      ["cg_02", "cg-02.png"]
    ].map(async ([stepName, outputName], index) => {
      const cgPromptEntry = cgPromptEntries[index];
      promptPack.cg[index] = cgPromptEntry;

      return runStep(
        workflowId,
        stepName,
        cgRunner.provider,
        async () =>
          cgRunner.run({
            config,
            sourcePath: originalSourcePath,
            sourceMimeType: originalSourceMimeType,
            destinationPath: path.join(outputDir, outputName),
            prompt: cgPromptEntry.prompt
          }),
        async (_result, outputUrl) => {
          const nextCgOutputs = getWorkflow(workflowId)?.outputs?.cg_outputs || [null, null];
          nextCgOutputs[index] = outputUrl;

          mergeWorkflowOutputs(workflowId, {
            cg_outputs: nextCgOutputs,
            providers: {
              cg: cgRunner.provider
            }
          });
          await writeManifestSnapshot(workflowId, outputDir, promptPack);
        },
        {
          fatal: false,
          updateCurrentStep: false
        }
      );
    });

    // Web API generation runs concurrently (unlimited). Local rembg runs via its own queue concurrently with web tasks.
    await Promise.allSettled([...expressionPromises, ...cgPromises]);
    await Promise.allSettled(cutoutPromises);

    const currentWorkflow = getWorkflow(workflowId);
    const failedOrSkippedSteps = Object.entries(currentWorkflow.steps).filter(([, step]) =>
      step.status === "failed" || step.status === "skipped"
    );
    const outputs = {
      ...currentWorkflow.outputs,
      providers: {
        remove_background: backgroundRemovalRunner.provider,
        expressions: expressionRunner.provider,
        cg: cgRunner.provider
      }
    };

    setWorkflowOutputs(workflowId, outputs);
    if (failedOrSkippedSteps.length > 0) {
      setWorkflowStatus(
        workflowId,
        "completed_with_errors",
        "done",
        `${failedOrSkippedSteps.length} steps did not finish successfully.`,
        {
          failed_steps: failedOrSkippedSteps.map(([name, step]) => ({
            step: name,
            status: step.status,
            provider: step.provider,
            error: step.error
          }))
        }
      );
    } else {
      setWorkflowStatus(workflowId, "completed", "done", null, null);
    }
    await writeManifestSnapshot(workflowId, outputDir, promptPack);
  } catch (error) {
    const currentWorkflow = getWorkflow(workflowId);
    const outputDir = path.join(config.outputDir, workflowId);

    if (currentWorkflow) {
      await writeManifestSnapshot(workflowId, outputDir, promptPack).catch(() => null);
    }
  }

  return getWorkflow(workflowId);
}

module.exports = {
  executeWorkflow
};
