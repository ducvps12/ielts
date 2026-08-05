export const goalCategories = [
  "LANGUAGE",
  "EDUCATION",
  "CAREER",
  "FITNESS",
  "CREATIVE",
  "BUSINESS",
  "PERSONAL",
  "CUSTOM",
] as const;

export type GoalCategory = (typeof goalCategories)[number];

export const goalStatuses = [
  "DRAFT",
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
  "ABANDONED",
] as const;

export type GoalStatus = (typeof goalStatuses)[number];

export interface GoalSummary {
  id: string;
  ownerId: string;
  category: GoalCategory;
  title: string;
  outcome: string;
  status: GoalStatus;
  targetDate?: string;
  timezone: string;
  templateVersionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGoalRequest {
  category: GoalCategory;
  title: string;
  outcome: string;
  targetDate?: string;
  baseline?: Record<string, unknown>;
  constraints?: Record<string, unknown>;
  learningProfile?: UpsertLanguageProfileRequest;
}

export interface UpdateGoalStatusRequest {
  status: GoalStatus;
}

export const supportedUiLocales = ["vi", "en", "zh-CN", "fr"] as const;
export type UiLocale = (typeof supportedUiLocales)[number];

export const initialLearningLanguages = [
  "en",
  "zh-CN",
  "fr",
  "es",
  "de",
  "ja",
  "ko",
  "vi",
] as const;

export type LearningLanguage = (typeof initialLearningLanguages)[number];

export const proficiencyFrameworks = [
  "CEFR",
  "HSK",
  "JLPT",
  "TOPIK",
  "CUSTOM",
] as const;

export type ProficiencyFramework = (typeof proficiencyFrameworks)[number];

export interface LanguageProfileContract {
  id?: string;
  userId: string;
  uiLocale: UiLocale;
  learningLanguage: LearningLanguage;
  explanationLanguage: LearningLanguage;
  proficiencyFramework: ProficiencyFramework;
  proficiencyLevel: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpsertLanguageProfileRequest {
  uiLocale: UiLocale;
  learningLanguage: LearningLanguage;
  explanationLanguage: LearningLanguage;
  proficiencyFramework: ProficiencyFramework;
  proficiencyLevel: string;
}
