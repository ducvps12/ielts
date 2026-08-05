import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const schemaPath = fileURLToPath(new URL("../prisma/schema.prisma", import.meta.url));
const schema = readFileSync(schemaPath, "utf8");

describe("Prisma schema invariants", () => {
  it("keeps wallet transactions idempotent", () => {
    expect(schema).toContain("idempotencyKey String");
    expect(schema).toContain("@unique");
  });

  it("prevents duplicate quest completion records", () => {
    expect(schema).toContain("questInstanceId String");
    expect(schema).toContain("@unique");
  });

  it("stores template versions explicitly", () => {
    expect(schema).toContain("version        Int");
    expect(schema).toContain("@@unique([slug, version])");
  });
});
