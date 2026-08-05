import { describe, expect, it } from "vitest";

import { HealthController } from "./health.controller.js";

describe("HealthController", () => {
  it("returns an explicit service health payload", () => {
    const payload = new HealthController().health();
    expect(payload.status).toBe("ok");
    expect(payload.service).toBe("levelup-api");
    expect(payload.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });
});
