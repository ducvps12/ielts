import { Badge, Card, Progress } from "@levelup/ui";
import { ArrowRight, BarChart3 } from "@levelup/ui/icons";

import type { DemoSkill } from "../../data/demo/client";

interface SkillProgressCardProps {
  skill: DemoSkill;
}

const priorityTone: Record<DemoSkill["priority"], "danger" | "warning" | "success"> = {
  high: "danger",
  medium: "warning",
  stable: "success",
};

const priorityLabel: Record<DemoSkill["priority"], string> = {
  high: "Cần ưu tiên",
  medium: "Theo dõi",
  stable: "Ổn định",
};

export function SkillProgressCard({ skill }: SkillProgressCardProps) {
  const percentage = Math.round((skill.band / skill.target) * 100);

  return (
    <Card className="client-skill-card">
      <div className="client-skill-card__topline">
        <div>
          <span>KỸ NĂNG</span>
          <h2>{skill.name}</h2>
        </div>
        <Badge tone={priorityTone[skill.priority]}>
          {priorityLabel[skill.priority]}
        </Badge>
      </div>

      <div className="client-skill-card__band-row">
        <strong>{skill.band.toFixed(1)}</strong>
        <span aria-hidden="true">
          <ArrowRight size={18} />
        </span>
        <strong className="is-target">{skill.target.toFixed(1)}</strong>
      </div>

      <Progress
        label="Tiến độ tới band mục tiêu"
        value={percentage}
        showValue
        size="sm"
      />

      <div className="client-skill-card__change">
        <BarChart3 size={17} aria-hidden="true" />
        <span>
          {skill.change > 0
            ? `Tăng ${skill.change.toFixed(1)} band so với baseline`
            : "Chưa thay đổi so với baseline"}
        </span>
      </div>
    </Card>
  );
}
