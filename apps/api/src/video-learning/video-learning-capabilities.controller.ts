import { Controller, Get } from "@nestjs/common";
import {
  initialLearningLanguages,
  learningSourceTypes,
  supportedUiLocales,
  type LearningSourceType,
} from "@levelup/contracts";

interface SourceCapability {
  type: LearningSourceType;
  enabled: boolean;
  requiresAuthorization: boolean;
  reasonDisabled?: string;
}

interface VideoLearningCapabilitiesResponse {
  processingEnabled: boolean;
  uiLocales: readonly string[];
  learningLanguages: readonly string[];
  sourceCapabilities: SourceCapability[];
  safeguards: string[];
}

const sourceCapabilities: SourceCapability[] = learningSourceTypes.map((type) => {
  switch (type) {
    case "YOUTUBE_URL":
      return {
        type,
        enabled: false,
        requiresAuthorization: true,
        reasonDisabled:
          "A URL alone does not prove transcript rights; authorized transcript acquisition is not implemented.",
      };
    case "SUBTITLE_UPLOAD":
      return {
        type,
        enabled: false,
        requiresAuthorization: true,
        reasonDisabled:
          "Upload validation, malware scanning and private object storage are not implemented.",
      };
    case "PASTED_TRANSCRIPT":
      return {
        type,
        enabled: false,
        requiresAuthorization: true,
        reasonDisabled:
          "Authentication, usage accounting and prompt-injection-safe processing are not implemented.",
      };
    case "LICENSED_PROVIDER":
      return {
        type,
        enabled: false,
        requiresAuthorization: true,
        reasonDisabled: "No licensed content provider is configured.",
      };
  }
});

@Controller("video-learning/capabilities")
export class VideoLearningCapabilitiesController {
  @Get()
  getCapabilities(): VideoLearningCapabilitiesResponse {
    return {
      processingEnabled: false,
      uiLocales: supportedUiLocales,
      learningLanguages: initialLearningLanguages,
      sourceCapabilities,
      safeguards: [
        "source authorization",
        "idempotent lesson creation",
        "private-by-default transcripts",
        "prompt injection isolation",
        "usage and entitlement checks",
      ],
    };
  }
}
