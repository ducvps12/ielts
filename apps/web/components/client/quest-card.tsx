import { Badge, Card, LinkButton, Progress } from "@levelup/ui";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  LockKeyhole,
  Wallet,
  Zap,
} from "@levelup/ui/icons";

import type { DemoQuest } from "../../data/demo/client";

interface QuestCardProps {
  quest: DemoQuest;
  featured?: boolean;
}

const kindLabels: Record<DemoQuest["kind"], string> = {
  main: "Main Quest",
  side: "Side Quest",
  bonus: "Bonus Quest",
};

const kindTones: Record<DemoQuest["kind"], "primary" | "info" | "success"> = {
  main: "primary",
  side: "info",
  bonus: "success",
};

export function QuestCard({ quest, featured = false }: QuestCardProps) {
  const completed = quest.state === "completed";
  const locked = quest.state === "locked";
  const inProgress = quest.state === "in_progress";

  return (
    <Card
      className={featured ? "client-quest-card client-quest-card--featured" : "client-quest-card"}
      tone={featured ? "primary" : completed ? "muted" : "default"}
    >
      <div className="client-quest-card__topline">
        <div className="client-quest-card__badges">
          <Badge tone={kindTones[quest.kind]}>{kindLabels[quest.kind]}</Badge>
          <Badge>{quest.skill}</Badge>
        </div>
        <span className="client-quest-card__duration">
          <Clock size={15} aria-hidden="true" />
          {quest.durationMinutes} phút
        </span>
      </div>

      <div className="client-quest-card__body">
        <h2>{quest.title}</h2>
        <p>{quest.description}</p>
      </div>

      {inProgress && typeof quest.progress === "number" ? (
        <Progress
          label="Tiến độ hiện tại"
          value={quest.progress}
          showValue
          size="sm"
        />
      ) : null}

      <div className="client-quest-card__footer">
        <div className="client-quest-card__rewards" aria-label="Phần thưởng">
          <span>
            <Zap size={16} aria-hidden="true" />+{quest.xp} XP
          </span>
          <span>
            <Wallet size={16} aria-hidden="true" />+{quest.gold} Gold
          </span>
        </div>

        {locked ? (
          <button className="ui-button ui-button--outline ui-button--md" disabled>
            <LockKeyhole size={17} aria-hidden="true" />
            Chưa mở
          </button>
        ) : completed ? (
          <span className="client-quest-card__completed">
            <CircleCheck size={18} aria-hidden="true" />
            Đã hoàn thành
          </span>
        ) : (
          <LinkButton href={`/app/nhiem-vu/${quest.id}`} variant={featured ? "secondary" : "outline"}>
            {inProgress ? "Tiếp tục" : "Mở nhiệm vụ"}
            <ArrowRight size={17} aria-hidden="true" />
          </LinkButton>
        )}
      </div>
    </Card>
  );
}
