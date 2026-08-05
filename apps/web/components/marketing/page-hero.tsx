import type { ReactNode } from "react";
import { Badge } from "@levelup/ui";

interface MarketingPageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
}

export function MarketingPageHero({
  eyebrow,
  title,
  description,
  badge,
  actions,
}: MarketingPageHeroProps) {
  return (
    <section className="public-page-hero">
      <div className="marketing-container public-page-hero__inner">
        <div className="public-page-hero__copy">
          {badge ? <Badge tone="primary">{badge}</Badge> : null}
          <span className="marketing-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {actions ? <div className="public-page-hero__actions">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
