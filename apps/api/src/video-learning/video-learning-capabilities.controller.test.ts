import { describe, expect, it } from "vitest";

import { VideoLearningCapabilitiesController } from "./video-learning-capabilities.controller.js";

describe("VideoLearningCapabilitiesController", () => {
  it("keeps processing disabled until authorization and security gates exist", () => {
    const controller = new VideoLearningCapabilitiesController();
    const response = controller.getCapabilities();

    expect(response.processingEnabled).toBe(false);
    expect(response.sourceCapabilities.every((source) => !source.enabled)).toBe(
      true,
    );
    expect(response.safeguards).toContain("source authorization");
    expect(response.safeguards).toContain("prompt injection isolation");
  });

  it("publishes international locale and learning language catalogues", () => {
    const controller = new VideoLearningCapabilitiesController();
    const response = controller.getCapabilities();

    expect(response.uiLocales).toEqual(["vi", "en", "zh-CN", "fr"]);
    expect(response.learningLanguages).toContain("en");
    expect(response.learningLanguages).toContain("zh-CN");
    expect(response.learningLanguages).toContain("fr");
  });
});
