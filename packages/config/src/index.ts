import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";
import { z } from "zod";

const booleanFromEnvironment = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.url().default("http://localhost:3000"),
  ADMIN_URL: z.url().default("http://localhost:3001"),
  API_URL: z.url().default("http://localhost:4000"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  S3_ENDPOINT: z.url().default("http://localhost:9000"),
  S3_REGION: z.string().default("us-east-1"),
  S3_BUCKET: z.string().default("levelup-local"),
  S3_ACCESS_KEY: z.string().min(1).default("minio"),
  S3_SECRET_KEY: z.string().min(8).default("change-me-now"),
  MAIL_HOST: z.string().default("localhost"),
  MAIL_PORT: z.coerce.number().int().positive().default(1025),
  MAIL_FROM: z.string().default("LevelUp <no-reply@levelup.local>"),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  SESSION_SECRET: z.string().min(32),
  AUTH_SESSION_COOKIE_NAME: z.string().min(1).default("levelup_session"),
  AUTH_CSRF_COOKIE_NAME: z.string().min(1).default("levelup_csrf"),
  AUTH_SESSION_TTL_HOURS: z.coerce.number().int().min(1).max(168).default(12),
  AUTH_REMEMBER_TTL_DAYS: z.coerce.number().int().min(1).max(90).default(30),
  AUTH_TOKEN_TTL_MINUTES: z.coerce.number().int().min(5).max(1440).default(30),
  AUTH_DEV_TOKENS_ENABLED: booleanFromEnvironment,
});

export type AppEnvironment = z.infer<typeof environmentSchema>;

function loadLocalEnvironment(): void {
  const candidates = [
    resolve(process.cwd(), ".env"),
    resolve(process.cwd(), "../../.env"),
  ];

  const file = candidates.find((candidate) => existsSync(candidate));
  if (file) {
    loadDotenv({ path: file, override: false, quiet: true });
  }
}

export function parseEnvironment(
  input?: NodeJS.ProcessEnv,
): AppEnvironment {
  if (!input) {
    loadLocalEnvironment();
  }

  const result = environmentSchema.safeParse(input ?? process.env);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return result.data;
}
