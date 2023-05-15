import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("GET: 410 Gone が返ってくる", async () => {
    const resp = await worker.fetch();
    expect(resp.status).toBe(410);
  });

  it("POST: 410 Gone が返ってくる", async () => {
    const resp = await worker.fetch("/", { method: "POST" });
    expect(resp.status).toBe(410);
  });
});
