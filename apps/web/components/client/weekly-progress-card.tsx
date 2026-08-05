import { Card, Progress } from "@levelup/ui";
import { BarChart3, CalendarDays } from "@levelup/ui/icons";

import { demoWeeklyProgress } from "../../data/demo/client";

export function WeeklyProgressCard() {
  const completed = demoWeeklyProgress.reduce(
    (sum, day) => sum + day.completed,
    0,
  );
  const total = demoWeeklyProgress.reduce((sum, day) => sum + day.total, 0);
  const percentage = Math.round((completed / total) * 100);

  return (
    <Card className="client-week-card">
      <header className="client-section-card__header">
        <div>
          <span>TIẾN ĐỘ TUẦN</span>
          <h2>Giữ nhịp, không cần hoàn hảo.</h2>
        </div>
        <span className="client-section-card__icon" aria-hidden="true">
          <CalendarDays size={21} />
        </span>
      </header>

      <Progress
        label={`${completed}/${total} nhiệm vụ hoàn thành`}
        value={percentage}
        showValue
      />

      <div className="client-week-grid" aria-label="Mức hoàn thành từng ngày">
        {demoWeeklyProgress.map((day) => (
          <div
            key={day.day}
            className={day.current ? "client-week-day is-current" : "client-week-day"}
          >
            <span>{day.day}</span>
            <div className="client-week-day__dots" aria-hidden="true">
              {Array.from({ length: day.total }, (_, index) => (
                <i
                  key={`${day.day}-${index}`}
                  className={index < day.completed ? "is-completed" : undefined}
                />
              ))}
            </div>
            <small>
              {day.completed}/{day.total}
            </small>
          </div>
        ))}
      </div>

      <div className="client-week-card__summary">
        <BarChart3 size={18} aria-hidden="true" />
        <span>Tỷ lệ Main Quest tuần này đang cao hơn tuần trước 8%.</span>
      </div>
    </Card>
  );
}
