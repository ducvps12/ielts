import { describe, expect, it } from "vitest";

import { parseEnvironment } from "./index.js";

const validEnvironment = {
  NODE_ENV: "test",
  APP_URL: "http://localhost:3000",
  ADMIN_URL: "http://localhost:3001",
  API_URL: "http://localhost:4000",
  PORT: "4000",
  DATABASE_URL: "postgresql://levelup:levelup@localhost:5432/levelup",
  REDIS_URL: "redis://localhost:6379",
  S3_ENDPOINT: "http://localhost:9000",
  S3_REGION: "us-east-1",
  S3_BUCKET: "levelup-local",
  S3_ACCESS_KEY: "minio",
  S3_SECRET_KEY: "change-me-now",
  MAIL_HOST: "localhost",
  MAIL_PORT: "1025",
  MAIL_FROM: "LevelUp <no-reply@levelup.local>",
  SESSION_SECRET: "test-session-secret-at-least-32-characters",
};

describe("parseEnvironment", () => {
  it("coerces typed values from environment strings", () => {
    const result = parseEnvironment(validEnvironment);
    expect(result.PORT).toBe(4000);
    expect(result.NODE_ENV).toBe("test");
  });

  it("rejects an unsafe session secret", () => {
    expect(() =>
      parseEnvironment({ ...validEnvironment, SESSION_SECRET: "short" }),
    ).toThrow("Invalid environment configuration");
  });
});
