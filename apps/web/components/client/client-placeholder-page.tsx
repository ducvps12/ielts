import type { ReactNode } from "react";
import { Alert, Card, LinkButton } from "@levelup/ui";
import { CircleAlert } from "@levelup/ui/icons";

interface ClientPlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  primaryAction?: {
    label: string;
    href: string;
  };
  cards?: Array<{
    title: string;
    description: string;
    icon?: ReactNode;
  }>;
}

export function ClientPlaceholderPage({
  eyebrow,
  title,
  description,
  icon,
  primaryAction,
  cards = [],
}: ClientPlaceholderPageProps) {
  return (
    <>
      <header className="client-page-header">
        <div className="client-page-header__copy">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {primaryAction ? (
          <div className="client-page-header__actions">
            <LinkButton href={primaryAction.href}>{primaryAction.label}</LinkButton>
          </div>
        ) : null}
      </header>

      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="UI foundation — chưa nối API"
        description="Nội dung trên trang này là cấu trúc giao diện có chủ đích. Không có dữ liệu production hoặc thao tác nghiệp vụ giả."
      />

      <div className="client-placeholder-grid client-section-gap">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card key={card.title} className="client-placeholder-card">
              <div className="public-content-card__icon" aria-hidden="true">
                {card.icon ?? icon}
              </div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </Card>
          ))
        ) : (
          <Card className="client-placeholder-card">
            <div className="public-content-card__icon" aria-hidden="true">
              {icon}
            </div>
            <h2>Nền móng đã sẵn sàng</h2>
            <p>
              Route, shell, responsive navigation và trạng thái cơ bản đã được đặt
              để nối domain service ở phase tiếp theo.
            </p>
          </Card>
        )}
      </div>
    </>
  );
}
