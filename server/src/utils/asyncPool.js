function parseConcurrency(value, fallback) {
  const n = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(n) || Number.isNaN(n)) {
    return fallback;
  }
  return Math.max(1, n);
}

/**
 * Runs async tasks with a concurrency limit.
 *
 * @template T
 * @param {Array<() => Promise<T>>} tasks
 * @param {number} concurrency
 * @returns {Promise<T[]>}
 */
async function asyncPool(tasks, concurrency) {
  const limit = parseConcurrency(concurrency, 1);
  const results = new Array(tasks.length);

  let nextIndex = 0;

  async function worker() {
    while (true) {
      const current = nextIndex;
      nextIndex += 1;
      if (current >= tasks.length) {
        return;
      }
      results[current] = await tasks[current]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

module.exports = {
  asyncPool
};

