import { describe, expect, it } from "vitest";

import { connectionFromUrl } from "./redis-connection.js";

describe("connectionFromUrl", () => {
  it("parses a local Redis URL", () => {
    expect(connectionFromUrl("redis://localhost:6380")).toEqual({
      host: "localhost",
      port: 6380,
      username: undefined,
      password: undefined,
    });
  });

  it("enables TLS for rediss URLs", () => {
    expect(connectionFromUrl("rediss://user:secret@redis.example.com")).toEqual({
      host: "redis.example.com",
      port: 6379,
      username: "user",
      password: "secret",
      tls: {},
    });
  });

  it("rejects unsupported protocols", () => {
    expect(() => connectionFromUrl("http://localhost:6379")).toThrow(
      "Unsupported Redis protocol",
    );
  });
});
