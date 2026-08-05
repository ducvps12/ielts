import type { OnModuleDestroy } from "@nestjs/common";
import { Redis } from "ioredis";

export interface RateLimitSnapshot {
  count: number;
  retryAfterSeconds: number;
}

export interface AuthRateLimitStore {
  consume(key: string, windowSeconds: number): Promise<RateLimitSnapshot>;
  get(key: string): Promise<RateLimitSnapshot>;
  reset(key: string): Promise<void>;
}

const CONSUME_SCRIPT = `
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("TTL", KEYS[1])
if ttl < 0 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
  ttl = tonumber(ARGV[1])
end
return {current, ttl}
`;

const READ_SCRIPT = `
local value = redis.call("GET", KEYS[1])
if not value then
  return {0, 0}
end
local ttl = redis.call("TTL", KEYS[1])
if ttl < 0 then
  ttl = 0
end
return {tonumber(value), ttl}
`;

function parseSnapshot(result: unknown): RateLimitSnapshot {
  if (!Array.isArray(result) || result.length < 2) {
    throw new Error("Redis returned an invalid auth rate-limit snapshot.");
  }

  const count = Number(result[0]);
  const retryAfterSeconds = Number(result[1]);

  if (!Number.isFinite(count) || !Number.isFinite(retryAfterSeconds)) {
    throw new Error("Redis returned a non-numeric auth rate-limit snapshot.");
  }

  return {
    count: Math.max(0, Math.trunc(count)),
    retryAfterSeconds: Math.max(0, Math.trunc(retryAfterSeconds)),
  };
}

export class RedisAuthRateLimitStore
  implements AuthRateLimitStore, OnModuleDestroy
{
  private readonly client: Redis;
  private connectionAttempt?: Promise<void>;

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl, {
      lazyConnect: true,
      connectTimeout: 1_500,
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
    });
  }

  async consume(
    key: string,
    windowSeconds: number,
  ): Promise<RateLimitSnapshot> {
    await this.ensureConnected();
    const result = await this.client.eval(
      CONSUME_SCRIPT,
      1,
      key,
      String(windowSeconds),
    );
    return parseSnapshot(result);
  }

  async get(key: string): Promise<RateLimitSnapshot> {
    await this.ensureConnected();
    const result = await this.client.eval(READ_SCRIPT, 1, key);
    return parseSnapshot(result);
  }

  async reset(key: string): Promise<void> {
    await this.ensureConnected();
    await this.client.del(key);
  }

  onModuleDestroy(): void {
    this.client.disconnect();
  }

  private async ensureConnected(): Promise<void> {
    if (this.client.status === "ready") {
      return;
    }

    if (!this.connectionAttempt) {
      this.connectionAttempt = this.client
        .connect()
        .then(() => undefined)
        .finally(() => {
          this.connectionAttempt = undefined;
        });
    }

    await this.connectionAttempt;
  }
}
