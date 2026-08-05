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

export interface LanguageProfileContract {
  userId: string;
  uiLocale: UiLocale;
  learningLanguage: LearningLanguage;
  explanationLanguage: LearningLanguage;
  proficiencyFramework: "CEFR" | "HSK" | "JLPT" | "TOPIK" | "CUSTOM";
  proficiencyLevel: string;
}
