export const supportedUiLocales = ["vi", "en", "zh-CN", "fr"] as const;

export type UiLocale = (typeof supportedUiLocales)[number];

export interface LocaleDefinition {
  code: UiLocale;
  label: string;
  nativeLabel: string;
  htmlLang: string;
  direction: "ltr" | "rtl";
  fallback: UiLocale;
}

export const localeDefinitions: Record<UiLocale, LocaleDefinition> = {
  vi: {
    code: "vi",
    label: "Tiếng Việt",
    nativeLabel: "Tiếng Việt",
    htmlLang: "vi",
    direction: "ltr",
    fallback: "en",
  },
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    htmlLang: "en",
    direction: "ltr",
    fallback: "en",
  },
  "zh-CN": {
    code: "zh-CN",
    label: "Simplified Chinese",
    nativeLabel: "简体中文",
    htmlLang: "zh-CN",
    direction: "ltr",
    fallback: "en",
  },
  fr: {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
    htmlLang: "fr",
    direction: "ltr",
    fallback: "en",
  },
};

export const learningLanguageDefinitions = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "zh-CN", label: "Mandarin Chinese", nativeLabel: "中文" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
  { code: "ko", label: "Korean", nativeLabel: "한국어" },
  { code: "vi", label: "Vietnamese", nativeLabel: "Tiếng Việt" },
] as const;

export type LearningLanguageCode =
  (typeof learningLanguageDefinitions)[number]["code"];

export function isUiLocale(value: string): value is UiLocale {
  return supportedUiLocales.some((locale) => locale === value);
}

export function resolveUiLocale(value: string | undefined): UiLocale {
  if (!value) {
    return "vi";
  }

  if (isUiLocale(value)) {
    return value;
  }

  const normalized = value.toLocaleLowerCase();
  const languageOnly = normalized.split("-")[0];

  if (languageOnly === "zh") {
    return "zh-CN";
  }

  return supportedUiLocales.find((locale) => locale === languageOnly) ?? "vi";
}
