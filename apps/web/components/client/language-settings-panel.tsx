"use client";

import { useMemo, useState } from "react";

import {
  formatCurrency,
  formatDate,
  learningLanguageDefinitions,
  localeDefinitions,
  supportedUiLocales,
  type LearningLanguageCode,
  type UiLocale,
} from "@levelup/i18n";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Select,
} from "@levelup/ui";
import { Languages, Save, ShieldCheck } from "@levelup/ui/icons";

const vietnameseLearningLanguageLabels: Record<LearningLanguageCode, string> = {
  en: "Tiếng Anh",
  "zh-CN": "Tiếng Trung",
  fr: "Tiếng Pháp",
  es: "Tiếng Tây Ban Nha",
  de: "Tiếng Đức",
  ja: "Tiếng Nhật",
  ko: "Tiếng Hàn",
  vi: "Tiếng Việt",
};

export function LanguageSettingsPanel() {
  const [uiLocale, setUiLocale] = useState<UiLocale>("vi");
  const [learningLanguage, setLearningLanguage] =
    useState<LearningLanguageCode>("en");
  const [explanationLanguage, setExplanationLanguage] =
    useState<LearningLanguageCode>("vi");

  const uiLocaleOptions = useMemo(
    () =>
      supportedUiLocales.map((locale) => ({
        value: locale,
        label: `${localeDefinitions[locale].label} · ${localeDefinitions[locale].nativeLabel}`,
      })),
    [],
  );

  const learningLanguageOptions = useMemo(
    () =>
      learningLanguageDefinitions.map((language) => ({
        value: language.code,
        label: `${vietnameseLearningLanguageLabels[language.code]} · ${language.nativeLabel}`,
      })),
    [],
  );

  return (
    <section className="language-settings" aria-labelledby="language-settings-title">
      <Card tone="elevated">
        <CardHeader>
          <div className="language-settings__heading">
            <span className="language-settings__icon" aria-hidden="true">
              <Languages size={22} />
            </span>
            <div>
              <span>INTERNATIONAL PROFILE</span>
              <h2 id="language-settings-title">Ngôn ngữ và khu vực</h2>
              <p>
                Ngôn ngữ giao diện, ngôn ngữ đang học và ngôn ngữ giải thích được
                quản lý độc lập.
              </p>
            </div>
          </div>
          <Badge tone="info">Preview</Badge>
        </CardHeader>
        <CardContent>
          <div className="language-settings__grid">
            <Select
              label="Ngôn ngữ giao diện"
              value={uiLocale}
              options={uiLocaleOptions}
              onChange={(event) => setUiLocale(event.target.value as UiLocale)}
              hint="Điều khiển navigation, system copy, định dạng ngày và số."
            />
            <Select
              label="Ngôn ngữ đang học"
              value={learningLanguage}
              options={learningLanguageOptions}
              onChange={(event) =>
                setLearningLanguage(event.target.value as LearningLanguageCode)
              }
              hint="Dùng cho lesson, quest, transcript và skill taxonomy."
            />
            <Select
              label="Ngôn ngữ giải thích"
              value={explanationLanguage}
              options={learningLanguageOptions}
              onChange={(event) =>
                setExplanationLanguage(event.target.value as LearningLanguageCode)
              }
              hint="Dùng cho bản dịch, định nghĩa và hướng dẫn học."
            />
          </div>

          <div className="language-settings__preview" aria-live="polite">
            <div>
              <span>HTML locale</span>
              <strong>{localeDefinitions[uiLocale].htmlLang}</strong>
            </div>
            <div>
              <span>Hướng chữ</span>
              <strong>{localeDefinitions[uiLocale].direction.toUpperCase()}</strong>
            </div>
            <div>
              <span>Ngày mẫu</span>
              <strong>
                {formatDate("2026-08-05T00:00:00.000Z", uiLocale, {
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </strong>
            </div>
            <div>
              <span>Giá mẫu</span>
              <strong>{formatCurrency(199000, "VND", uiLocale)}</strong>
            </div>
          </div>

          <Alert
            tone="info"
            icon={<ShieldCheck size={19} aria-hidden="true" />}
            title="Thay đổi hiện chỉ nằm trong trình duyệt"
            description={`Cấu hình xem trước: ${learningLanguage.toUpperCase()} → ${explanationLanguage.toUpperCase()}. API profile, cookie locale và catalog dịch chưa được nối.`}
          />

          <div className="language-settings__footer">
            <p>
              Lưu cấu hình chỉ được bật sau khi có session, validation server-side và
              audit cho thay đổi nhạy cảm.
            </p>
            <Button disabled>
              <Save size={18} aria-hidden="true" />
              Lưu tùy chọn
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
