import { describe, expect, it } from "vitest";

import {
  demoJourneyArcs,
  demoLearner,
  demoTodayQuests,
} from "../data/demo/client";

describe("client demo data", () => {
  it("keeps the campaign day inside the configured journey", () => {
    expect(demoLearner.campaignDay).toBeGreaterThanOrEqual(1);
    expect(demoLearner.campaignDay).toBeLessThanOrEqual(demoLearner.totalDays);
  });

  it("contains exactly one main quest for the daily preview", () => {
    expect(demoTodayQuests.filter((quest) => quest.kind === "main")).toHaveLength(1);
  });

  it("orders journey arcs and exposes one current arc", () => {
    expect(demoJourneyArcs.map((arc) => arc.order)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(demoJourneyArcs.filter((arc) => arc.state === "current")).toHaveLength(1);
  });
});
