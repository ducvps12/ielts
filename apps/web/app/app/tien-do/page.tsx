import { Alert, Badge, Card, LinkButton, StatCard } from "@levelup/ui";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CircleAlert,
  CircleCheck,
  Target,
} from "@levelup/ui/icons";

import { SkillProgressCard } from "../../../components/client/skill-progress-card";
import {
  demoLearner,
  demoSkills,
  demoWeeklyProgress,
} from "../../../data/demo/client";

const weeklyCompletion = [58, 66, 63, 72, 78, 81] as const;

export default function ProgressPage() {
  const activeDays = demoWeeklyProgress.filter((day) => day.completed > 0).length;
  const completedQuests = demoWeeklyProgress.reduce(
    (sum, day) => sum + day.completed,
    0,
  );

  return (
    <div data-demo="true">
      <header className="client-page-header">
        <div className="client-page-header__copy">
          <span>PROGRESS REPORT</span>
          <h1>Tiến độ</h1>
          <p>
            Theo dõi xu hướng năng lực và hành vi học tập. XP và streak chỉ là tín
            hiệu bổ sung, không thay thế mock score hoặc chất lượng chữa lỗi.
          </p>
        </div>
        <div className="client-page-header__actions">
          <LinkButton href="/app/luyen-tap" variant="outline">
            Mở khu luyện tập
          </LinkButton>
          <LinkButton href="/app/nhiem-vu">
            Xem nhiệm vụ
            <ArrowRight size={17} aria-hidden="true" />
          </LinkButton>
        </div>
      </header>

      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Số liệu minh họa, không phải kết quả thi thật"
        description="Các band score và tỷ lệ dưới đây là demo data để kiểm tra cấu trúc UI. Khi nối API, mọi nguồn dữ liệu phải có thời điểm, phương pháp chấm và phiên bản rõ ràng."
      />

      <section className="client-stat-grid client-section-gap" aria-label="Tóm tắt tiến độ">
        <StatCard
          label="Ngày hoạt động"
          value={`${activeDays}/7`}
          description="Trong tuần hiện tại"
          icon={<CalendarDays size={20} aria-hidden="true" />}
        />
        <StatCard
          label="Quest hoàn thành"
          value={completedQuests.toString()}
          description="Tất cả loại nhiệm vụ"
          icon={<CircleCheck size={20} aria-hidden="true" />}
        />
        <StatCard
          label="Streak"
          value={`${demoLearner.streak} ngày`}
          description="Không dùng để ép học khi quá tải"
          icon={<Target size={20} aria-hidden="true" />}
        />
      </section>

      <section className="client-progress-overview client-section-gap" aria-labelledby="completion-trend-title">
        <Card className="client-completion-chart">
          <header className="client-section-card__header">
            <div>
              <span>6 TUẦN GẦN NHẤT</span>
              <h2 id="completion-trend-title">Tỷ lệ hoàn thành Main Quest</h2>
            </div>
            <Badge tone="success">+23 điểm %</Badge>
          </header>

          <div className="client-bar-chart" role="img" aria-label="Tỷ lệ hoàn thành Main Quest qua sáu tuần: 58, 66, 63, 72, 78 và 81 phần trăm">
            {weeklyCompletion.map((value, index) => (
              <div key={`${value}-${index}`} className="client-bar-chart__column">
                <span>{value}%</span>
                <div className="client-bar-chart__track">
                  <i style={{ height: `${value}%` }} />
                </div>
                <small>W{index + 1}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card className="client-progress-insight">
          <BarChart3 size={25} aria-hidden="true" />
          <span>NHẬN ĐỊNH</span>
          <h2>Tiến bộ đến từ chữa lỗi đều hơn.</h2>
          <p>
            Tuần có tỷ lệ Error Log cao cũng là tuần Reading ổn định hơn. Đây chỉ là
            ví dụ cách insight sẽ được trình bày; kết luận thật cần dữ liệu đủ dài.
          </p>
        </Card>
      </section>

      <section className="client-skill-section" aria-labelledby="skill-progress-title">
        <div className="client-section-heading-row">
          <div>
            <span>4 KỸ NĂNG</span>
            <h2 id="skill-progress-title">Khoảng cách tới mục tiêu.</h2>
          </div>
          <Badge>Demo score</Badge>
        </div>
        <div className="client-skill-grid">
          {demoSkills.map((skill) => (
            <SkillProgressCard key={skill.name} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
}
