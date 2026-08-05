import { Card, LinkButton } from "@levelup/ui";
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  Flame,
} from "@levelup/ui/icons";

import { demoActivities } from "../../data/demo/client";

function ActivityIcon({ type }: { type: (typeof demoActivities)[number]["type"] }) {
  if (type === "quest") {
    return <CircleCheck size={18} aria-hidden="true" />;
  }
  if (type === "streak") {
    return <Flame size={18} aria-hidden="true" />;
  }
  return <CalendarDays size={18} aria-hidden="true" />;
}

export function RecentActivityCard() {
  return (
    <Card className="client-activity-card">
      <header className="client-section-card__header">
        <div>
          <span>HOẠT ĐỘNG GẦN ĐÂY</span>
          <h2>Những bước đã đi.</h2>
        </div>
      </header>

      <div className="client-activity-list">
        {demoActivities.map((activity) => (
          <article key={activity.id}>
            <span className={`client-activity-list__icon client-activity-list__icon--${activity.type}`}>
              <ActivityIcon type={activity.type} />
            </span>
            <div>
              <h3>{activity.title}</h3>
              <p>{activity.detail}</p>
            </div>
            <time>{activity.time}</time>
          </article>
        ))}
      </div>

      <LinkButton href="/app/tien-do" variant="ghost">
        Xem toàn bộ tiến độ
        <ArrowRight size={17} aria-hidden="true" />
      </LinkButton>
    </Card>
  );
}
