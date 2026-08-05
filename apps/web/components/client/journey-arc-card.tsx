import { Badge, Card, Progress } from "@levelup/ui";
import { Check, LockKeyhole, Target } from "@levelup/ui/icons";

import type { DemoJourneyArc } from "../../data/demo/client";

interface JourneyArcCardProps {
  arc: DemoJourneyArc;
}

export function JourneyArcCard({ arc }: JourneyArcCardProps) {
  const completed = arc.state === "completed";
  const current = arc.state === "current";

  return (
    <Card
      className={
        current
          ? "client-arc-card client-arc-card--current"
          : completed
            ? "client-arc-card client-arc-card--completed"
            : "client-arc-card client-arc-card--upcoming"
      }
    >
      <div className="client-arc-card__marker" aria-hidden="true">
        {completed ? (
          <Check size={20} />
        ) : current ? (
          <Target size={20} />
        ) : (
          <LockKeyhole size={18} />
        )}
      </div>

      <div className="client-arc-card__content">
        <div className="client-arc-card__topline">
          <div>
            <span>ARC {arc.order} · {arc.dayRange}</span>
            <h2>{arc.title}</h2>
          </div>
          <Badge tone={completed ? "success" : current ? "primary" : "neutral"}>
            {completed ? "Hoàn thành" : current ? "Đang diễn ra" : "Sắp tới"}
          </Badge>
        </div>
        <p>{arc.description}</p>
        <Progress
          label={current ? "Tiến độ Arc" : completed ? "Đã hoàn tất" : "Chưa mở"}
          value={arc.progress}
          showValue
          size="sm"
        />
      </div>
    </Card>
  );
}
