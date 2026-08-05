import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const schemaPath = fileURLToPath(new URL("../prisma/schema.prisma", import.meta.url));
const schema = readFileSync(schemaPath, "utf8");

describe("Prisma schema invariants", () => {
  it("keeps wallet transactions idempotent", () => {
    expect(schema).toContain("model WalletTransaction");
    expect(schema).toContain("idempotencyKey String");
    expect(schema).toContain("@unique");
  });

  it("prevents duplicate quest completion records", () => {
    expect(schema).toContain("questInstanceId String");
    expect(schema).toContain("questInstanceId String        @unique");
  });

  it("stores template versions explicitly", () => {
    expect(schema).toContain("version        Int");
    expect(schema).toContain("@@unique([slug, version])");
  });

  it("separates generic goals from IELTS templates", () => {
    expect(schema).toContain("model Goal {");
    expect(schema).toContain("category       GoalCategory");
    expect(schema).toContain("goalTemplateId String?");
    expect(schema).toContain("model LanguageProfile {");
  });

  it("requires authorization metadata for video learning sources", () => {
    expect(schema).toContain("model LearningSource {");
    expect(schema).toContain("authorizationStatus SourceAuthorizationStatus");
    expect(schema).toContain("model VideoLesson {");
    expect(schema).toContain("idempotencyKey       String");
  });

  it("uses minor units and idempotent facts for billing", () => {
    expect(schema).toContain("amountMinor     Int");
    expect(schema).toContain("model ProviderWebhookEvent {");
    expect(schema).toContain("@@unique([provider, merchantAccount, providerEventId])");
    expect(schema).toContain("model EntitlementGrant {");
    expect(schema).toContain("idempotencyKey String            @unique");
  });
});
