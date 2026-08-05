import type { LearningLanguage } from "./goals.js";

export const learningSourceTypes = [
  "YOUTUBE_URL",
  "SUBTITLE_UPLOAD",
  "PASTED_TRANSCRIPT",
  "LICENSED_PROVIDER",
] as const;

export type LearningSourceType = (typeof learningSourceTypes)[number];

export const sourceAuthorizationStatuses = [
  "UNVERIFIED",
  "USER_OWNED",
  "USER_AUTHORIZED",
  "LICENSED",
  "REJECTED",
] as const;

export type SourceAuthorizationStatus =
  (typeof sourceAuthorizationStatuses)[number];

export const videoLessonStatuses = [
  "DRAFT",
  "SOURCE_VALIDATING",
  "TRANSCRIPT_REQUIRED",
  "TRANSCRIPT_READY",
  "ANALYZING",
  "REVIEW_REQUIRED",
  "READY",
  "FAILED",
  "ARCHIVED",
] as const;

export type VideoLessonStatus = (typeof videoLessonStatuses)[number];

export interface CreateVideoLessonCommand {
  userId: string;
  sourceType: LearningSourceType;
  sourceUrl?: string;
  sourceAssetId?: string;
  authorizationStatus: SourceAuthorizationStatus;
  learningLanguage: LearningLanguage;
  explanationLanguage: LearningLanguage;
  proficiencyLevel: string;
  idempotencyKey: string;
}

export interface VideoLessonSummary {
  id: string;
  title: string;
  status: VideoLessonStatus;
  learningLanguage: LearningLanguage;
  explanationLanguage: LearningLanguage;
  sourceType: LearningSourceType;
  transcriptSegmentCount: number;
  vocabularyCount: number;
  createdAt: string;
}

export interface TranscriptSegmentContract {
  id: string;
  lessonId: string;
  sequence: number;
  startMs: number;
  endMs: number;
  language: LearningLanguage;
  text: string;
}
