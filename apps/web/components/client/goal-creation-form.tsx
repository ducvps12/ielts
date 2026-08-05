"use client";

import { useState, type FormEvent } from "react";
import {
  goalCategories,
  initialLearningLanguages,
  proficiencyFrameworks,
  supportedUiLocales,
  type CreateGoalRequest,
  type GoalCategory,
  type GoalSummary,
  type LearningLanguage,
  type ProficiencyFramework,
  type UiLocale,
} from "@levelup/contracts";
import {
  Alert,
  Button,
  Card,
  Input,
  Select,
  Textarea,
} from "@levelup/ui";
import { CircleAlert, CircleCheck, Target } from "@levelup/ui/icons";

import { ApiClientError, apiRequest } from "../../lib/api-client";

const categoryLabels: Record<GoalCategory, string> = {
  LANGUAGE: "Học ngôn ngữ",
  EDUCATION: "Học tập",
  CAREER: "Sự nghiệp",
  FITNESS: "Sức khỏe và thể chất",
  CREATIVE: "Sáng tạo",
  BUSINESS: "Kinh doanh",
  PERSONAL: "Phát triển cá nhân",
  CUSTOM: "Mục tiêu khác",
};

const languageLabels: Record<LearningLanguage, string> = {
  en: "English",
  "zh-CN": "中文 · Mandarin Chinese",
  fr: "Français · French",
  es: "Español · Spanish",
  de: "Deutsch · German",
  ja: "日本語 · Japanese",
  ko: "한국어 · Korean",
  vi: "Tiếng Việt",
};

function value(form: FormData, key: string): string {
  const item = form.get(key);
  return typeof item === "string" ? item : "";
}

export function GoalCreationForm() {
  const [category, setCategory] = useState<GoalCategory>("LANGUAGE");
  const [loading, setLoading] = useState(false);
  const [createdGoal, setCreatedGoal] = useState<GoalSummary>();
  const [error, setError] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    setCreatedGoal(undefined);

    const form = new FormData(event.currentTarget);
    const payload: CreateGoalRequest = {
      category,
      title: value(form, "title"),
      outcome: value(form, "outcome"),
      ...(value(form, "targetDate")
        ? { targetDate: value(form, "targetDate") }
        : {}),
      ...(category === "LANGUAGE"
        ? {
            learningProfile: {
              uiLocale: value(form, "uiLocale") as UiLocale,
              learningLanguage: value(
                form,
                "learningLanguage",
              ) as LearningLanguage,
              explanationLanguage: value(
                form,
                "explanationLanguage",
              ) as LearningLanguage,
              proficiencyFramework: value(
                form,
                "proficiencyFramework",
              ) as ProficiencyFramework,
              proficiencyLevel: value(form, "proficiencyLevel"),
            },
          }
        : {}),
    };

    try {
      const goal = await apiRequest<GoalSummary>("/goals", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setCreatedGoal(goal);
      event.currentTarget.reset();
      setCategory("LANGUAGE");
    } catch (requestError: unknown) {
      setError(
        requestError instanceof ApiClientError
          ? requestError.message
          : "Không thể kết nối tới Goal API.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="goal-create-card">
      <div className="goal-create-card__heading">
        <span aria-hidden="true">
          <Target size={24} />
        </span>
        <div>
          <h2>Định nghĩa kết quả trước, hệ thống hóa hành trình sau.</h2>
          <p>
            Goal này được lưu thật vào tài khoản. Campaign và quest tự động sẽ được
            nối ở phase Goal Engine tiếp theo.
          </p>
        </div>
      </div>

      {createdGoal ? (
        <Alert
          tone="success"
          icon={<CircleCheck size={20} aria-hidden="true" />}
          title="Mục tiêu đã được tạo"
          description={`${createdGoal.title} hiện ở trạng thái ${createdGoal.status}.`}
        />
      ) : null}

      {error ? (
        <Alert
          tone="danger"
          icon={<CircleAlert size={20} aria-hidden="true" />}
          title="Không thể tạo mục tiêu"
          description={error}
        />
      ) : null}

      <form className="goal-create-form" onSubmit={handleSubmit}>
        <Select
          label="Nhóm mục tiêu"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value as GoalCategory)}
          options={goalCategories.map((item) => ({
            value: item,
            label: categoryLabels[item],
          }))}
          disabled={loading}
          required
        />

        <Input
          label="Tên mục tiêu"
          name="title"
          placeholder="Ví dụ: Giao tiếp tiếng Trung trong công việc"
          minLength={3}
          maxLength={120}
          disabled={loading}
          required
        />

        <Textarea
          label="Kết quả cụ thể muốn đạt"
          name="outcome"
          placeholder="Mô tả điều bạn có thể làm được khi hoàn thành, cách đo và bối cảnh sử dụng."
          hint="Tránh mục tiêu mơ hồ như ‘giỏi hơn’. Hãy mô tả kết quả có thể quan sát."
          minLength={10}
          maxLength={1000}
          disabled={loading}
          required
        />

        <Input
          label="Ngày mục tiêu"
          name="targetDate"
          type="date"
          optional
          disabled={loading}
        />

        {category === "LANGUAGE" ? (
          <fieldset className="goal-language-fields">
            <legend>Hồ sơ ngôn ngữ</legend>
            <Select
              label="Ngôn ngữ đang học"
              name="learningLanguage"
              defaultValue="en"
              options={initialLearningLanguages.map((item) => ({
                value: item,
                label: languageLabels[item],
              }))}
              disabled={loading}
              required
            />
            <Select
              label="Ngôn ngữ giải thích"
              name="explanationLanguage"
              defaultValue="vi"
              options={initialLearningLanguages.map((item) => ({
                value: item,
                label: languageLabels[item],
              }))}
              disabled={loading}
              required
            />
            <Select
              label="Ngôn ngữ giao diện"
              name="uiLocale"
              defaultValue="vi"
              options={supportedUiLocales.map((item) => ({
                value: item,
                label: item,
              }))}
              disabled={loading}
              required
            />
            <Select
              label="Khung trình độ"
              name="proficiencyFramework"
              defaultValue="CEFR"
              options={proficiencyFrameworks.map((item) => ({
                value: item,
                label: item,
              }))}
              disabled={loading}
              required
            />
            <Input
              label="Trình độ hiện tại"
              name="proficiencyLevel"
              defaultValue="A1"
              placeholder="A1, HSK 1, N5..."
              maxLength={32}
              disabled={loading}
              required
            />
          </fieldset>
        ) : null}

        <Button type="submit" size="lg" loading={loading}>
          Tạo mục tiêu riêng
        </Button>
      </form>
    </Card>
  );
}
