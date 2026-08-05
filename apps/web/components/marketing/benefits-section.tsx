import { Card } from "@levelup/ui";
import {
  BarChart3,
  CalendarDays,
  ShieldCheck,
  Target,
} from "@levelup/ui/icons";

import {
  benefits,
  type MarketingBenefit,
} from "../../data/demo/marketing";

function BenefitIcon({ name }: { name: MarketingBenefit["icon"] }) {
  switch (name) {
    case "target":
      return <Target size={24} aria-hidden="true" />;
    case "calendar":
      return <CalendarDays size={24} aria-hidden="true" />;
    case "chart":
      return <BarChart3 size={24} aria-hidden="true" />;
    case "shield":
      return <ShieldCheck size={24} aria-hidden="true" />;
  }
}

export function BenefitsSection() {
  return (
    <section className="marketing-section" aria-labelledby="benefits-title">
      <div className="marketing-container">
        <div className="marketing-section-heading">
          <span className="marketing-eyebrow">HỌC CÓ HỆ THỐNG</span>
          <h2 id="benefits-title">Bớt nôn nóng. Tập trung vào bước tiếp theo.</h2>
          <p>
            Sản phẩm được thiết kế cho người có mục tiêu thật nhưng thường mất đà
            vì không biết nên ưu tiên việc gì.
          </p>
        </div>

        <div className="marketing-benefit-grid">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="marketing-benefit-card">
              <div className="marketing-benefit-card__icon">
                <BenefitIcon name={benefit.icon} />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
