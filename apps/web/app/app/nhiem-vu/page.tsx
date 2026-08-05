import { Alert, LinkButton, StatCard } from "@levelup/ui";
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Clock,
  Target,
} from "@levelup/ui/icons";

import { QuestBoard } from "../../../components/client/quest-board";
import { demoQuestList } from "../../../data/demo/client";

export default function QuestsPage() {
  const inProgress = demoQuestList.filter((quest) => quest.state === "in_progress").length;
  const available = demoQuestList.filter((quest) => quest.state === "available").length;
  const completed = demoQuestList.filter((quest) => quest.state === "completed").length;

  return (
    <div data-demo="true">
      <header className="client-page-header">
        <div className="client-page-header__copy">
          <span>QUEST CENTER</span>
          <h1>Nhiệm vụ</h1>
          <p>
            Tìm việc đang làm, nhiệm vụ có thể bắt đầu và lịch sử hoàn thành. Bộ lọc
            hiện hoạt động hoàn toàn trên demo data đã tách khỏi view.
          </p>
        </div>
        <div className="client-page-header__actions">
          <LinkButton href="/app/hom-nay">
            Mở nhiệm vụ hôm nay
            <ArrowRight size={17} aria-hidden="true" />
          </LinkButton>
        </div>
      </header>

      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Trạng thái do demo data quyết định"
        description="Khi API được nối, UI không tự quyết định quest có thể làm, hoàn thành hay được nhận thưởng."
      />

      <section className="client-stat-grid client-section-gap" aria-label="Tóm tắt nhiệm vụ">
        <StatCard
          label="Đang làm"
          value={inProgress.toString()}
          description="Có thể tiếp tục"
          icon={<Clock size={20} aria-hidden="true" />}
        />
        <StatCard
          label="Có thể làm"
          value={available.toString()}
          description="Không bị khóa"
          icon={<Target size={20} aria-hidden="true" />}
        />
        <StatCard
          label="Đã hoàn thành"
          value={completed.toString()}
          description="Trong demo hiện tại"
          icon={<CircleCheck size={20} aria-hidden="true" />}
        />
      </section>

      <QuestBoard quests={demoQuestList} />
    </div>
  );
}
