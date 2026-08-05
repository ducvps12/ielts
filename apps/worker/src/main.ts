import { Worker, type Job } from "bullmq";
import { parseEnvironment } from "@levelup/config";

import { connectionFromUrl } from "./redis-connection.js";

const QUEUE_NAME = "levelup-jobs";

async function processJob(job: Job): Promise<Record<string, unknown>> {
  switch (job.name) {
    case "system.ping":
      return {
        ok: true,
        jobId: job.id,
        processedAt: new Date().toISOString(),
      };
    default:
      throw new Error(`Unsupported job type: ${job.name}`);
  }
}

async function bootstrap(): Promise<void> {
  const environment = parseEnvironment();
  const worker = new Worker(QUEUE_NAME, processJob, {
    connection: connectionFromUrl(environment.REDIS_URL),
    concurrency: 5,
  });

  worker.on("ready", () => {
    console.info(`[worker] ready on queue ${QUEUE_NAME}`);
  });

  worker.on("completed", (job) => {
    console.info(`[worker] completed ${job.name}#${job.id}`);
  });

  worker.on("failed", (job, error) => {
    console.error(
      `[worker] failed ${job?.name ?? "unknown"}#${job?.id ?? "unknown"}`,
      error,
    );
  });

  const shutdown = async (signal: string): Promise<void> => {
    console.info(`[worker] received ${signal}, closing`);
    await worker.close();
    process.exit(0);
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
}

bootstrap().catch((error: unknown) => {
  console.error("Worker failed to start", error);
  process.exit(1);
});
