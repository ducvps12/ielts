import { Alert, Badge } from "@levelup/ui";
import { CircleAlert } from "@levelup/ui/icons";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalDocumentProps {
  title: string;
  description: string;
  version: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export function LegalDocument({
  title,
  description,
  version,
  effectiveDate,
  sections,
}: LegalDocumentProps) {
  return (
    <main id="main-content" className="legal-page">
      <div className="marketing-container legal-page__layout">
        <header className="legal-page__header">
          <Badge tone="warning">BẢN DỰ THẢO</Badge>
          <h1>{title}</h1>
          <p>{description}</p>
          <dl className="legal-page__meta">
            <div>
              <dt>Phiên bản</dt>
              <dd>{version}</dd>
            </div>
            <div>
              <dt>Ngày dự kiến hiệu lực</dt>
              <dd>{effectiveDate}</dd>
            </div>
          </dl>
        </header>

        <Alert
          tone="warning"
          icon={<CircleAlert size={20} aria-hidden="true" />}
          title="Tài liệu chưa được phê duyệt pháp lý"
          description="Nội dung dưới đây chỉ là cấu trúc dự thảo sản phẩm và phải được chuyên gia pháp lý Việt Nam rà soát trước khi áp dụng cho người dùng thật."
        />

        <article className="legal-page__document">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
