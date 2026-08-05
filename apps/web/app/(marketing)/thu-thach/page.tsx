import type { Metadata } from "next";
import { Alert, Badge, Card, LinkButton } from "@levelup/ui";
import { ArrowRight, BookOpen, CircleAlert, LockKeyhole } from "@levelup/ui/icons";

import { MarketingPageHero } from "../../../components/marketing/page-hero";
import { journeys } from "../../../data/demo/marketing";

export const metadata: Metadata = {
  title: "Thử thách",
  description: "Thư viện hành trình học tập của LevelUp.",
};

export default function ChallengesPage() {
  return (
    <main id="main-content">
      <MarketingPageHero
        eyebrow="THƯ VIỆN HÀNH TRÌNH"
        title="Một mục tiêu rõ ràng. Một hệ thống đủ sâu."
        description="IELTS là hành trình đầu tiên. Các hành trình khác chỉ mở sau khi nội dung, retention và vận hành đã được kiểm chứng."
      />

      <section className="public-content-section">
        <div className="marketing-container">
          <Alert
            tone="info"
            icon={<CircleAlert size={20} aria-hidden="true" />}
            title="Danh mục đang trong giai đoạn thử nghiệm"
            description="Chỉ hành trình IELTS có cấu trúc sản phẩm ban đầu. Các mục còn lại là định hướng nghiên cứu, không phải lời hứa phát hành."
          />
          <div className="challenge-list">
            {journeys.map((journey) => (
              <Card key={journey.slug} className="challenge-list__card">
                <div className="challenge-list__icon" aria-hidden="true">
                  {journey.available ? <BookOpen size={26} /> : <LockKeyhole size={26} />}
                </div>
                <div className="challenge-list__copy">
                  <Badge tone={journey.available ? "success" : "neutral"}>
                    {journey.available ? "Đang mở" : "Đang nghiên cứu"}
                  </Badge>
                  <h2>{journey.title}</h2>
                  <p>{journey.description}</p>
                  <span>{journey.meta}</span>
                </div>
                {journey.available ? (
                  <LinkButton href={`/thu-thach/${journey.slug}`} variant="outline">
                    Xem chi tiết
                    <ArrowRight size={17} aria-hidden="true" />
                  </LinkButton>
                ) : (
                  <button className="ui-button ui-button--outline ui-button--md" disabled>
                    Chưa mở
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
