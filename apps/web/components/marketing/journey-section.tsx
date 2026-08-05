import { Badge, Card, LinkButton } from "@levelup/ui";
import { ArrowRight, BookOpen, LockKeyhole } from "@levelup/ui/icons";

import { journeys } from "../../data/demo/marketing";

export function JourneySection() {
  return (
    <section className="marketing-section" aria-labelledby="journey-title">
      <div className="marketing-container">
        <div className="marketing-section-heading marketing-section-heading--split">
          <div>
            <span className="marketing-eyebrow">JOURNEY LIBRARY</span>
            <h2 id="journey-title">Bắt đầu sâu với IELTS, rồi mới mở rộng.</h2>
          </div>
          <p>
            Vertical đầu tiên được tập trung toàn lực là IELTS. Các hành trình khác
            chỉ mở khi Goal Engine đã chứng minh người dùng quay lại và hoàn thành.
          </p>
        </div>

        <div className="marketing-journey-grid">
          {journeys.map((journey) => (
            <Card
              key={journey.slug}
              className="marketing-journey-card"
              tone={journey.available ? "default" : "muted"}
            >
              <div className="marketing-journey-card__topline">
                <span className="marketing-journey-card__icon" aria-hidden="true">
                  {journey.available ? <BookOpen size={24} /> : <LockKeyhole size={24} />}
                </span>
                <Badge tone={journey.available ? "success" : "neutral"}>
                  {journey.available ? "Đang mở" : "Sắp ra mắt"}
                </Badge>
              </div>
              <h3>{journey.title}</h3>
              <p>{journey.description}</p>
              <span className="marketing-journey-card__meta">{journey.meta}</span>
              {journey.available ? (
                <LinkButton
                  href={`/thu-thach/${journey.slug}`}
                  variant="outline"
                  block
                >
                  Xem hành trình
                  <ArrowRight size={17} aria-hidden="true" />
                </LinkButton>
              ) : (
                <button className="ui-button ui-button--outline ui-button--md ui-button--block" disabled>
                  Chưa mở đăng ký
                </button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
