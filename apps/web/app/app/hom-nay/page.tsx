import {
  Badge,
  LinkButton,
  Progress,
  StatCard,
} from "@levelup/ui";
import {
  ArrowRight,
  CalendarDays,
  Flame,
  Target,
  Wallet,
  Zap,
} from "@levelup/ui/icons";

import { QuestCard } from "../../../components/client/quest-card";
import { RecentActivityCard } from "../../../components/client/recent-activity-card";
import { SkillPriorityCard } from "../../../components/client/skill-priority-card";
import { WeeklyProgressCard } from "../../../components/client/weekly-progress-card";
import {
  demoLearner,
  demoTodayQuests,
} from "../../../data/demo/client";

export default function TodayPage() {
  const [mainQuest, ...secondaryQuests] = demoTodayQuests;
  const journeyProgress = Math.round(
    (demoLearner.campaignDay / demoLearner.totalDays) * 100,
  );

  return (
    <div data-demo="true">
      <header className="client-page-header client-page-header--today">
        <div className="client-page-header__copy">
          <span>THỨ SÁU · DAY {demoLearner.campaignDay}/{demoLearner.totalDays}</span>
          <h1>Chào buổi sáng, {demoLearner.shortName}.</h1>
          <p>
            Hôm nay ưu tiên Reading. Hoàn thành Main Quest trước, sau đó mới quyết
            định có làm thêm Side và Bonus Quest hay không.
          </p>
        </div>
        <div className="client-page-header__actions">
          <LinkButton href={`/app/nhiem-vu/${mainQuest.id}`} size="lg">
            Tiếp tục học
            <ArrowRight size={18} aria-hidden="true" />
          </LinkButton>
        </div>
      </header>

      <section className="client-goal-banner" aria-labelledby="current-goal-title">
        <div className="client-goal-banner__icon" aria-hidden="true">
          <Target size={25} />
        </div>
        <div className="client-goal-banner__copy">
          <span>MỤC TIÊU HIỆN TẠI</span>
          <h2 id="current-goal-title">{demoLearner.goal} trong 180 ngày</h2>
          <p>Arc hiện tại: Xây nền có kỷ luật · còn 13 ngày tới checkpoint.</p>
        </div>
        <div className="client-goal-banner__progress">
          <Progress
            label={`${demoLearner.campaignDay}/${demoLearner.totalDays} ngày`}
            value={journeyProgress}
            showValue
            size="sm"
          />
        </div>
      </section>

      <section className="client-stat-grid" aria-label="Chỉ số hôm nay">
        <StatCard
          label="Streak"
          value={`${demoLearner.streak} ngày`}
          description="Dài nhất hiện tại"
          icon={<Flame size={20} aria-hidden="true" />}
        />
        <StatCard
          label="Tổng XP"
          value={demoLearner.xp.toLocaleString("vi-VN")}
          description={`Còn ${demoLearner.nextLevelXp - demoLearner.xp} XP lên level`}
          icon={<Zap size={20} aria-hidden="true" />}
        />
        <StatCard
          label="Gold"
          value={demoLearner.gold.toString()}
          description="Dùng cho phần thưởng lành mạnh"
          icon={<Wallet size={20} aria-hidden="true" />}
        />
        <StatCard
          label="Checkpoint"
          value="13 ngày"
          description="Tổng kết Arc xây nền"
          icon={<CalendarDays size={20} aria-hidden="true" />}
        />
      </section>

      <section className="client-today-layout" aria-labelledby="today-quests-title">
        <div className="client-today-layout__quests">
          <div className="client-section-heading-row">
            <div>
              <span>NHIỆM VỤ HÔM NAY</span>
              <h2 id="today-quests-title">Một nhiệm vụ chính. Hai lựa chọn bổ sung.</h2>
            </div>
            <Badge tone="warning">Demo data</Badge>
          </div>

          <QuestCard quest={mainQuest} featured />
          <div className="client-secondary-quest-grid">
            {secondaryQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>

        <aside className="client-today-layout__aside">
          <SkillPriorityCard />
        </aside>
      </section>

      <section className="client-insight-grid" aria-label="Tổng quan học tập">
        <WeeklyProgressCard />
        <RecentActivityCard />
      </section>
    </div>
  );
}
