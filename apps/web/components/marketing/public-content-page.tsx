import type { ReactNode } from "react";
import { Card } from "@levelup/ui";

import { MarketingPageHero } from "./page-hero";

export interface PublicContentBlock {
  title: string;
  description: string;
  items?: string[];
  icon?: ReactNode;
}

interface PublicContentPageProps {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
  blocks: PublicContentBlock[];
  note?: ReactNode;
}

export function PublicContentPage({
  eyebrow,
  title,
  description,
  badge,
  actions,
  blocks,
  note,
}: PublicContentPageProps) {
  return (
    <main id="main-content">
      <MarketingPageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        badge={badge}
        actions={actions}
      />
      <section className="public-content-section">
        <div className="marketing-container">
          {note ? <div className="public-content-section__note">{note}</div> : null}
          <div className="public-content-grid">
            {blocks.map((block) => (
              <Card key={block.title} className="public-content-card">
                {block.icon ? (
                  <div className="public-content-card__icon" aria-hidden="true">
                    {block.icon}
                  </div>
                ) : null}
                <h2>{block.title}</h2>
                <p>{block.description}</p>
                {block.items ? (
                  <ul>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
