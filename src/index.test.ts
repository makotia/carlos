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

  // 上をまとめたい
  it.each(["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"])(
    "%s: 410 Gone が返ってくる",
    async (method) => {
      const resp = await worker.fetch("/", { method });
      expect(resp.status).toBe(410);
    }
  );

  it("どんなパスでも 410 Gone が返ってくる", async () => {
    const random = Math.random().toString(36).slice(2);
    const resp = await worker.fetch(`/${random}`);
    expect(resp.status).toBe(410);
  });
});
