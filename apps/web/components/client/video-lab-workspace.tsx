"use client";

import { useMemo, useState, type FormEvent } from "react";

import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Progress,
  Select,
} from "@levelup/ui";
import {
  BookOpen,
  CircleCheck,
  Clock,
  FileText,
  Languages,
  Link2,
  Play,
  ShieldCheck,
  Sparkles,
  Upload,
  Volume2,
} from "@levelup/ui/icons";

import {
  demoVideoLesson,
  interfaceLanguages,
  learningLanguages,
  lessonModulePreview,
  pipelineSteps,
  proficiencyLevels,
  vocabularyPreview,
} from "../../data/demo/video-lab";

type SourceType = "youtube" | "subtitle" | "transcript";

function isSupportedYouTubeUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "youtu.be",
    ].includes(url.hostname.toLocaleLowerCase());
  } catch {
    return false;
  }
}

function toSelectOptions(
  values: Array<{ value: string; label: string; nativeLabel?: string }>,
) {
  return values.map((item) => ({
    value: item.value,
    label:
      item.nativeLabel && item.nativeLabel !== item.label
        ? `${item.label} · ${item.nativeLabel}`
        : item.label,
  }));
}

export function VideoLabWorkspace() {
  const [sourceType, setSourceType] = useState<SourceType>("youtube");
  const [sourceUrl, setSourceUrl] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [explanationLanguage, setExplanationLanguage] = useState("vi");
  const [level, setLevel] = useState("intermediate");
  const [urlError, setUrlError] = useState<string>();
  const [showPreview, setShowPreview] = useState(false);

  const targetLanguageOptions = useMemo(
    () => toSelectOptions(learningLanguages),
    [],
  );
  const interfaceLanguageOptions = useMemo(
    () => toSelectOptions(interfaceLanguages),
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (sourceType !== "youtube") {
      setUrlError("Nguồn này đang ở trạng thái thiết kế và chưa nhận dữ liệu thật.");
      setShowPreview(false);
      return;
    }

    if (!isSupportedYouTubeUrl(sourceUrl)) {
      setUrlError("Hãy nhập URL YouTube hợp lệ, ví dụ youtube.com/watch?v=…");
      setShowPreview(false);
      return;
    }

    setUrlError(undefined);
    setShowPreview(true);
  }

  return (
    <div className="video-lab" data-demo="true">
      <section className="video-lab__hero" aria-labelledby="video-lab-title">
        <div className="video-lab__hero-copy">
          <Badge tone="info">Preview · chưa gọi API</Badge>
          <span className="video-lab__eyebrow">LANGUAGE STUDIO</span>
          <h1 id="video-lab-title">Biến transcript thành một bài học có cấu trúc.</h1>
          <p>
            Chọn ngôn ngữ, đưa nguồn được phép sử dụng vào hệ thống và nhận bộ từ
            vựng, bài hiểu nội dung, shadowing cùng lịch ôn cá nhân.
          </p>
        </div>
        <div className="video-lab__hero-metric" aria-label="Hạn mức bản miễn phí">
          <span>Hạn mức hôm nay</span>
          <strong>
            {demoVideoLesson.quotaUsed}/{demoVideoLesson.quotaLimit}
          </strong>
          <Progress
            label="Lượt tạo bài học"
            value={demoVideoLesson.quotaUsed}
            max={demoVideoLesson.quotaLimit}
          />
          <small>Quota là demo UI, chưa ghi nhận usage thật.</small>
        </div>
      </section>

      <Alert tone="warning" title="Nguồn video và transcript phải có quyền sử dụng">
        Dán URL không đồng nghĩa hệ thống được phép tải phụ đề, âm thanh hoặc video.
        Bản production sẽ yêu cầu transcript do người học cung cấp, video thuộc quyền
        quản lý hoặc nguồn đã được cấp phép.
      </Alert>

      <section className="video-lab__builder" aria-labelledby="lesson-builder-title">
        <Card className="video-lab__source-card" tone="elevated">
          <CardHeader>
            <div>
              <span className="video-lab__eyebrow">01 · LESSON SOURCE</span>
              <h2 id="lesson-builder-title">Tạo bài học mới</h2>
              <p>Thiết lập nguồn và cặp ngôn ngữ trước khi phân tích.</p>
            </div>
            <Sparkles size={24} aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <form className="video-lab__form" onSubmit={handleSubmit} noValidate>
              <fieldset className="video-lab__source-options">
                <legend>Chọn loại nguồn</legend>
                <label className="video-source-option">
                  <input
                    type="radio"
                    name="sourceType"
                    value="youtube"
                    checked={sourceType === "youtube"}
                    onChange={() => {
                      setSourceType("youtube");
                      setUrlError(undefined);
                    }}
                  />
                  <span className="video-source-option__icon" aria-hidden="true">
                    <Link2 size={20} />
                  </span>
                  <span>
                    <strong>YouTube URL</strong>
                    <small>URL + transcript được cấp quyền</small>
                  </span>
                </label>
                <label className="video-source-option">
                  <input
                    type="radio"
                    name="sourceType"
                    value="subtitle"
                    checked={sourceType === "subtitle"}
                    onChange={() => {
                      setSourceType("subtitle");
                      setUrlError(undefined);
                    }}
                  />
                  <span className="video-source-option__icon" aria-hidden="true">
                    <Upload size={20} />
                  </span>
                  <span>
                    <strong>Tệp phụ đề</strong>
                    <small>VTT hoặc SRT · sắp kết nối upload</small>
                  </span>
                </label>
                <label className="video-source-option">
                  <input
                    type="radio"
                    name="sourceType"
                    value="transcript"
                    checked={sourceType === "transcript"}
                    onChange={() => {
                      setSourceType("transcript");
                      setUrlError(undefined);
                    }}
                  />
                  <span className="video-source-option__icon" aria-hidden="true">
                    <FileText size={20} />
                  </span>
                  <span>
                    <strong>Dán transcript</strong>
                    <small>Văn bản tự sở hữu · sắp triển khai</small>
                  </span>
                </label>
              </fieldset>

              <Input
                type="url"
                label={sourceType === "youtube" ? "Liên kết YouTube" : "Nguồn đang chuẩn bị"}
                placeholder="https://www.youtube.com/watch?v=..."
                value={sourceUrl}
                onChange={(event) => {
                  setSourceUrl(event.target.value);
                  setUrlError(undefined);
                  setShowPreview(false);
                }}
                error={urlError}
                disabled={sourceType !== "youtube"}
                hint="Bản preview chỉ kiểm tra định dạng URL trong trình duyệt và không gửi dữ liệu đi."
                inputMode="url"
                autoComplete="off"
              />

              <div className="video-lab__language-grid">
                <Select
                  label="Ngôn ngữ đang học"
                  value={targetLanguage}
                  onChange={(event) => setTargetLanguage(event.target.value)}
                  options={targetLanguageOptions}
                />
                <Select
                  label="Ngôn ngữ giải thích"
                  value={explanationLanguage}
                  onChange={(event) => setExplanationLanguage(event.target.value)}
                  options={interfaceLanguageOptions}
                />
                <Select
                  label="Trình độ"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  options={proficiencyLevels}
                />
              </div>

              <div className="video-lab__form-footer">
                <div>
                  <ShieldCheck size={18} aria-hidden="true" />
                  <span>Không tải video và không trừ quota trong bản preview.</span>
                </div>
                <Button type="submit" size="lg">
                  Xem bài học mẫu
                  <Sparkles size={18} aria-hidden="true" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="video-lab__pipeline-card">
          <CardHeader>
            <div>
              <span className="video-lab__eyebrow">PROCESSING PIPELINE</span>
              <h2>Một nguồn, nhiều hoạt động học.</h2>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="video-pipeline">
              {pipelineSteps.map((step, index) => (
                <li className={`video-pipeline__step is-${step.state}`} key={step.id}>
                  <span className="video-pipeline__marker" aria-hidden="true">
                    {step.state === "complete" ? <CircleCheck size={20} /> : index + 1}
                  </span>
                  <div>
                    <strong>{step.label}</strong>
                    <p>{step.description}</p>
                  </div>
                  <Badge
                    tone={
                      step.state === "complete"
                        ? "success"
                        : step.state === "active"
                          ? "primary"
                          : "neutral"
                    }
                  >
                    {step.state === "complete"
                      ? "Sẵn sàng"
                      : step.state === "active"
                        ? "Đang thiết kế"
                        : "Tiếp theo"}
                  </Badge>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <section
        className={`video-lab__preview ${showPreview ? "is-visible" : ""}`}
        aria-labelledby="lesson-preview-title"
        aria-live="polite"
      >
        <div className="video-lab__preview-heading">
          <div>
            <span className="video-lab__eyebrow">DEMO LESSON OUTPUT</span>
            <h2 id="lesson-preview-title">
              {showPreview ? demoVideoLesson.title : "Bài học mẫu sẽ xuất hiện tại đây"}
            </h2>
            <p>
              {showPreview
                ? `${demoVideoLesson.source} · ${demoVideoLesson.duration} · ${demoVideoLesson.languagePair}`
                : "Nhập URL YouTube hợp lệ để mở dữ liệu demo đã tách riêng khỏi production."}
            </p>
          </div>
          {showPreview ? <Badge tone="warning">Demo content</Badge> : null}
        </div>

        {showPreview ? (
          <>
            <div className="video-lab__module-grid">
              {lessonModulePreview.map((module) => (
                <Card key={module.title} className="video-module-card">
                  <CardContent>
                    <span className="video-module-card__icon" aria-hidden="true">
                      <BookOpen size={20} />
                    </span>
                    <strong>{module.title}</strong>
                    <p>{module.description}</p>
                    <Badge tone="neutral">{module.metric}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="video-lab__lesson-layout">
              <section className="video-lab__vocabulary" aria-labelledby="vocabulary-title">
                <div className="video-lab__section-heading">
                  <div>
                    <span className="video-lab__eyebrow">VOCABULARY DECK</span>
                    <h3 id="vocabulary-title">Chạm hoặc mở thẻ để xem nghĩa.</h3>
                  </div>
                  <Badge tone="info">4 thẻ mẫu</Badge>
                </div>
                <div className="video-vocabulary-grid">
                  {vocabularyPreview.map((item) => (
                    <details className="video-vocabulary-card" key={item.term}>
                      <summary>
                        <span>Mở thẻ</span>
                        <strong>{item.term}</strong>
                        <small>{item.partOfSpeech}</small>
                      </summary>
                      <div className="video-vocabulary-card__answer">
                        <div className="video-vocabulary-card__term-row">
                          <div>
                            <strong>{item.term}</strong>
                            <span>{item.partOfSpeech}</span>
                          </div>
                          <button
                            type="button"
                            aria-label={`Phát âm mẫu cho ${item.term}`}
                            disabled
                            title="Âm thanh chưa được kết nối"
                          >
                            <Volume2 size={18} aria-hidden="true" />
                          </button>
                        </div>
                        <b>{item.translation}</b>
                        <p>{item.definition}</p>
                        <blockquote>{item.example}</blockquote>
                        <Badge tone={item.difficulty === "core" ? "success" : "warning"}>
                          {item.difficulty === "core" ? "Core word" : "Stretch word"}
                        </Badge>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <aside className="video-lab__practice-panel" aria-labelledby="practice-title">
                <div className="video-lab__section-heading">
                  <div>
                    <span className="video-lab__eyebrow">SHADOWING PREVIEW</span>
                    <h3 id="practice-title">Nghe, nhại lại, rồi tự đánh giá.</h3>
                  </div>
                </div>
                <div className="video-shadowing-card">
                  <div className="video-shadowing-card__meta">
                    <Badge tone="primary">Segment 2/4</Badge>
                    <span>
                      <Clock size={16} aria-hidden="true" /> 00:42–00:51
                    </span>
                  </div>
                  <p lang="en">
                    Responsibility is not only about following rules; it is also about
                    understanding the consequence of a choice.
                  </p>
                  <span lang="vi">
                    Trách nhiệm không chỉ là tuân theo quy tắc, mà còn là hiểu hậu quả
                    của một lựa chọn.
                  </span>
                  <Button variant="outline" block disabled>
                    <Play size={18} aria-hidden="true" />
                    Phát đoạn và bắt đầu ghi âm
                  </Button>
                  <small>Audio, recording và speech feedback sẽ nối ở phase worker/API.</small>
                </div>

                <div className="video-lab__language-summary">
                  <Languages size={22} aria-hidden="true" />
                  <div>
                    <strong>Cấu hình bài học</strong>
                    <span>
                      {targetLanguage.toLocaleUpperCase()} → {explanationLanguage.toLocaleUpperCase()} · {level}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <Card className="video-lab__empty" tone="muted">
            <CardContent>
              <Sparkles size={28} aria-hidden="true" />
              <strong>Chưa có preview</strong>
              <p>
                Kết quả production sau này sẽ đến từ transcript đã được xác thực quyền
                sử dụng, không phải dữ liệu lấy âm thầm từ YouTube.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
