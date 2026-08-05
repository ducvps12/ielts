import { Badge, Card, LinkButton, Progress } from "@levelup/ui";
import { ArrowRight, BookOpen, Target } from "@levelup/ui/icons";

import { demoSkills } from "../../data/demo/client";

export function SkillPriorityCard() {
  const prioritySkill = demoSkills.find((skill) => skill.priority === "high") ?? demoSkills[0];
  const progress = Math.round((prioritySkill.band / prioritySkill.target) * 100);

  return (
    <Card className="client-priority-card">
      <header className="client-section-card__header">
        <div>
          <span>KỸ NĂNG CẦN ƯU TIÊN</span>
          <h2>{prioritySkill.name}</h2>
        </div>
        <span className="client-section-card__icon" aria-hidden="true">
          <Target size={21} />
        </span>
      </header>

      <div className="client-priority-card__bands">
        <div>
          <span>Hiện tại</span>
          <strong>{prioritySkill.band.toFixed(1)}</strong>
        </div>
        <div>
          <span>Mục tiêu</span>
          <strong>{prioritySkill.target.toFixed(1)}</strong>
        </div>
        <Badge tone="danger">Ưu tiên cao</Badge>
      </div>

      <Progress
        label="Khoảng cách tới mục tiêu"
        value={progress}
        showValue
        size="sm"
      />

      <div className="client-priority-card__reason">
        <BookOpen size={18} aria-hidden="true" />
        <p>
          Matching Headings và paraphrase đang là hai nhóm lỗi lặp lại nhiều nhất
          trong Error Log gần đây.
        </p>
      </div>

      <LinkButton href="/app/luyen-tap" variant="outline" block>
        Mở khu luyện Reading
        <ArrowRight size={17} aria-hidden="true" />
      </LinkButton>
    </Card>
  );
}
