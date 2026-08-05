export interface RedisConnectionOptions {
  host: string;
  port: number;
  username?: string;
  password?: string;
  tls?: Record<string, never>;
}

export function connectionFromUrl(redisUrl: string): RedisConnectionOptions {
  const parsed = new URL(redisUrl);

  if (parsed.protocol !== "redis:" && parsed.protocol !== "rediss:") {
    throw new Error(`Unsupported Redis protocol: ${parsed.protocol}`);
  }

  return {
    host: parsed.hostname,
    port: Number(parsed.port || 6379),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    ...(parsed.protocol === "rediss:" ? { tls: {} } : {}),
  };
}
