import { Badge, Card, LinkButton, Progress } from "@levelup/ui";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Flame,
  Target,
} from "@levelup/ui/icons";

import { marketingPreview } from "../../data/demo/marketing";

const previewNavigation = [
  { label: "Hôm nay", icon: Target, active: true },
  { label: "Lộ trình", icon: CalendarDays, active: false },
  { label: "Luyện tập", icon: BookOpen, active: false },
  { label: "Tiến độ", icon: BarChart3, active: false },
] as const;

export function ProductPreview() {
  const [mainQuest, ...secondaryQuests] = marketingPreview.quests;

  return (
    <section className="marketing-preview-section" aria-labelledby="preview-title">
      <div className="marketing-container">
        <div className="marketing-section-heading marketing-section-heading--center">
          <span className="marketing-eyebrow">BẢN XEM TRƯỚC — DEMO DATA</span>
          <h2 id="preview-title">Một màn hình. Một ưu tiên rõ ràng.</h2>
          <p>
            Người học nhìn trong vài giây là biết nhiệm vụ chính, thời lượng, phần
            thưởng và bước tiếp theo.
          </p>
        </div>

        <div className="product-preview" data-demo="true">
          <aside className="product-preview__sidebar" aria-label="Điều hướng bản xem trước">
            <div className="product-preview__brand">LEVELUP</div>
            <nav>
              {previewNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className={item.active ? "is-active" : undefined}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {item.label}
                  </span>
                );
              })}
            </nav>
            <div className="product-preview__sidebar-progress">
              <span>Tuần này</span>
              <Progress
                label="Tiến độ tuần"
                value={marketingPreview.weeklyProgress}
                showValue
                size="sm"
              />
            </div>
          </aside>

          <div className="product-preview__main">
            <header className="product-preview__topbar">
              <div>
                <span className="marketing-eyebrow">
                  DAY {marketingPreview.day} / {marketingPreview.totalDays}
                </span>
                <h3>Chào buổi sáng, {marketingPreview.learnerName}.</h3>
                <p>Hôm nay chỉ cần hoàn thành Main Quest trước.</p>
              </div>
              <Badge tone="warning">
                <Flame size={15} aria-hidden="true" />
                {marketingPreview.streak} ngày liên tục
              </Badge>
            </header>

            <Card tone="primary" className="product-preview__main-quest">
              <div>
                <div className="product-preview__quest-meta">
                  <Badge>{mainQuest.label}</Badge>
                  <span>{mainQuest.duration}</span>
                </div>
                <h4>{mainQuest.title}</h4>
                <p>{mainQuest.description}</p>
                <div className="product-preview__reward-row">
                  <span>+{mainQuest.xp} XP</span>
                  <span>+{mainQuest.gold} Gold</span>
                </div>
              </div>
              <LinkButton href="/dang-ky" variant="secondary">
                Bắt đầu nhiệm vụ
                <ArrowRight size={17} aria-hidden="true" />
              </LinkButton>
            </Card>

            <div className="product-preview__quest-grid">
              {secondaryQuests.map((quest) => (
                <Card key={quest.type} className="product-preview__quest-card">
                  <div className="product-preview__quest-meta">
                    <Badge tone={quest.type === "side" ? "info" : "success"}>
                      {quest.label}
                    </Badge>
                    <span>{quest.duration}</span>
                  </div>
                  <h4>{quest.title}</h4>
                  <p>{quest.description}</p>
                  <div className="product-preview__reward-row">
                    <span>+{quest.xp} XP</span>
                    <span>+{quest.gold} Gold</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
