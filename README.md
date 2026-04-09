# character-workflow-agent

Open-source workflow agent for turning one character image into reusable character assets.

## Why This Project Exists
Most users do not struggle with "clicking generate". They struggle with:
- writing stable prompts
- describing visual details clearly
- keeping character identity consistent across outputs
- getting a usable asset pack instead of random one-off images

`character-workflow-agent` is designed as a workflow product, not a generic image playground.

## Phase 1 Goal
Convert:

`single image input -> cutout -> 3 expressions -> 2 CG outputs`

into a structured and repeatable pipeline.

## Phase 1 Workflow
1. Upload one character image (background allowed)
2. Validate input file (type, size, dimensions)
3. Generate expression variant: `thinking`
4. Generate expression variant: `surprise`
5. Generate expression variant: `angry`
6. Generate `2` CG-style outputs while keeping the same character identity
7. Run `rembg` on the 3 expression images to create transparent expression cutouts
8. Continue the workflow even if a non-critical generation step fails, while recording step-level errors and skipped dependencies
9. Return a bundled result set suitable for downstream creative use

## Included In Phase 1
- Single image upload
- Basic image validation
- Background removal step
- 3 expression outputs (`thinking`, `surprise`, `angry`)
- 3 expression cutout outputs generated after the expression stage
- 2 CG outputs
- Simple web UI for upload + workflow progress + outputs
- Server-side pipeline orchestration with mock/stub adapters
- Non-fatal step execution so one failed generation step does not stop the entire workflow

## Not Included In Phase 1
- Character element decomposition
- Face customization / pre-generation face editing
- LoRA training
- Multi-character support
- Animation rigging
- Advanced accounts / billing / quotas
- Production deployment hardening

## Architecture Direction (Prototype-Friendly)
- root static frontend: `index.html`, `app.js`, `styles.css`, `vite.config.js`
- `web/`: frontend notes / legacy packaging metadata
- `server/`: API + orchestration pipeline + provider adapters
- `workflows/`: pipeline definition and stage contracts
- `prompts/`: reusable prompt templates for expression and CG generation
- Mock-first adapters so we can ship Phase 1 before wiring production APIs

## Repository Structure

```text
character-workflow-agent/
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
├── docs/
│   ├── phase-1-spec.md
│   └── roadmap.md
├── prompts/
│   ├── expression-thinking.md
│   ├── expression-surprise.md
│   ├── expression-angry.md
│   └── cg-generation.md
├── examples/
│   └── sample-input-output.md
├── workflows/
│   └── pipeline-overview.md
├── tmp/                         # generated at runtime (gitignored)
├── index.html
├── app.js
├── styles.css
├── vite.config.js
├── web/
│   └── README.md
└── server/
    ├── README.md
    ├── package.json
    └── src/
        ├── app.js
        ├── config.js
        ├── index.js
        ├── routes/
        ├── pipeline/
        ├── adapters/
        ├── services/
        └── utils/
```

## Current Status
Phase 1 prototype code is now included:
- upload API (`POST /api/workflows`)
- workflow status API (`GET /api/workflows/:id`)
- pipeline that produces:
  - `cutout`
  - `expression-thinking`
  - `expression-surprise`
  - `expression-angry`
  - `cg-01`
  - `cg-02`
- mock mode by default
- Banana2 live provider integration for:
  - background removal edit
  - 3 expression edits
  - 2 CG generations
- simple web UI served by the server

## Roadmap
See:
- [`docs/phase-1-spec.md`](docs/phase-1-spec.md)
- [`docs/roadmap.md`](docs/roadmap.md)

## Quick Start
1. Install dependencies
```bash
npm install
npm --prefix server install
```
2. Create environment file
```bash
cp .env.example .env
```
3. Start backend
```bash
npm --prefix server run dev
```
4. Start frontend (new terminal)
```bash
npm run dev:web
```
5. Open static site in dev mode
```text
http://localhost:5173
```

## GitHub Pages + Hosted Backend
GitHub Pages can only serve the static frontend. It cannot run the Node/Express API.

That means:
- `https://hzagaming.github.io/...` can host `index.html`, `app.js`, and `styles.css`
- it cannot handle `POST /api/workflows`
- the backend must be deployed separately on a real Node host such as Render, Railway, Fly.io, or your own server

Recommended setup:
1. Deploy the frontend from this repository to GitHub Pages
2. Deploy `server/` to a Node host with HTTPS enabled
3. Set `CORS_ORIGIN` on the backend to your GitHub Pages origin, for example:
```dotenv
CORS_ORIGIN=https://hzagaming.github.io
```
4. Open the GitHub Pages site, go to `设置 -> 接口`, and set:
```text
https://your-backend.example.com
```
5. Start the workflow from the GitHub Pages frontend

Notes:
- Do not use the GitHub Pages URL itself as the API address
- The API address must point to your deployed backend root, not to `/api/workflows`
- If the page is opened on GitHub Pages and no API address is configured, the frontend now blocks workflow submission and shows a direct setup warning instead of letting the request fail with `405`

## Live Provider Setup
If you want the workflow to behave closer to the current `p2g` flow, switch the pipeline to Plato AI:

```bash
cp .env.example .env
```

Then set:

```dotenv
PIPELINE_MODE=live
BG_REMOVAL_PROVIDER=rembg
EXPRESSION_PROVIDER=plato
CG_PROVIDER=plato
REMBG_PYTHON_PATH=./.venv/bin/python
REMBG_SCRIPT_PATH=./server/scripts/rembg_remove.py
PLATO_API_KEY=sk-your-key
PLATO_BASE_URL=https://api.bltcy.ai/v1
PLATO_MODEL=gemini-3.1-flash-image-preview
```

Notes:
- `rembg` is recommended for `remove_background` because it is cheaper, deterministic, and better suited to transparent cutouts than image generation APIs.
- Plato live mode currently accepts `PNG`, `JPG/JPEG`, and `WEBP` uploads for expression / CG generation.
- If Plato is selected but no API key is configured, the server falls back to mock mode automatically.
- The current Plato account must have positive quota, otherwise requests will fail with `额度不足`.
- Expressions and CG are generated from the cutout result, not directly from the raw upload.

## Build And Serve
1. Build frontend bundle
```bash
npm run build
```
2. Start backend
```bash
npm --prefix server run start
```
3. Open app at `http://localhost:3001`

## Production Checklist
- Frontend deployed to GitHub Pages or another static host
- Backend deployed to a Node runtime with persistent storage or writable temp storage
- `CORS_ORIGIN` set to the frontend origin
- `PIPELINE_MODE`, provider keys, and `rembg` runtime configured on the backend
- Backend served over `https`

## API (Phase 1 Prototype)
- `POST /api/workflows`
  - `multipart/form-data`
  - field name: `image`
  - returns `202 Accepted` with `workflow_id`
- `GET /api/workflows/:id`
  - returns workflow status, per-step progress, and output URLs
- `GET /outputs/:workflowId/manifest.json`
  - returns packaged workflow manifest for the finished run
- `GET /outputs/:workflowId/:fileName`
  - serves generated mock assets

## Contributing (Early Stage)
1. Keep changes focused on current phase scope
2. Preserve clear separation between UI, orchestration logic, and provider adapters
3. Prefer mock-compatible design to keep local development fast
