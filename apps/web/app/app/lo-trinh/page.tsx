import { Alert, Badge, Card, LinkButton, Progress } from "@levelup/ui";
import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  Target,
} from "@levelup/ui/icons";

import { JourneyArcCard } from "../../../components/client/journey-arc-card";
import {
  demoJourneyArcs,
  demoLearner,
} from "../../../data/demo/client";

export default function JourneyPage() {
  const currentArc = demoJourneyArcs.find((arc) => arc.state === "current");
  const totalProgress = Math.round(
    (demoLearner.campaignDay / demoLearner.totalDays) * 100,
  );

  return (
    <div data-demo="true">
      <header className="client-page-header">
        <div className="client-page-header__copy">
          <span>BẢN ĐỒ 180 NGÀY</span>
          <h1>Lộ trình IELTS 7.5</h1>
          <p>
            Xem giai đoạn hiện tại, checkpoint tiếp theo và lý do từng Arc tồn tại.
            Các Arc chưa mở vẫn được hiển thị để định hướng, không gây áp lực học trước.
          </p>
        </div>
        <div className="client-page-header__actions">
          <LinkButton href="/app/hom-nay">
            Quay lại hôm nay
            <ArrowRight size={17} aria-hidden="true" />
          </LinkButton>
        </div>
      </header>

      <section className="client-journey-summary">
        <Card className="client-journey-summary__main">
          <div className="client-journey-summary__icon" aria-hidden="true">
            <Target size={25} />
          </div>
          <div>
            <span>TIẾN ĐỘ TỔNG THỂ</span>
            <h2>Day {demoLearner.campaignDay}/{demoLearner.totalDays}</h2>
            <p>{currentArc?.title ?? "Đang cập nhật"}</p>
          </div>
          <Progress
            label="Toàn bộ hành trình"
            value={totalProgress}
            showValue
          />
        </Card>

        <Card className="client-journey-summary__checkpoint">
          <CalendarDays size={24} aria-hidden="true" />
          <div>
            <span>CHECKPOINT TIẾP THEO</span>
            <strong>13 ngày nữa</strong>
            <p>Tổng kết Arc xây nền và điều chỉnh ưu tiên kỹ năng.</p>
          </div>
        </Card>
      </section>

      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Lộ trình đang dùng demo data có cấu trúc"
        description="Khi Goal Engine được nối, campaign sẽ bám đúng template version và timezone của người học."
      />

      <section className="client-journey-map" aria-labelledby="journey-map-title">
        <div className="client-section-heading-row">
          <div>
            <span>CÁC GIAI ĐOẠN</span>
            <h2 id="journey-map-title">Sáu Arc, một hướng đi rõ ràng.</h2>
          </div>
          <Badge tone="primary">Arc 2 đang diễn ra</Badge>
        </div>

        <div className="client-arc-list">
          {demoJourneyArcs.map((arc) => (
            <JourneyArcCard key={arc.id} arc={arc} />
          ))}
        </div>
      </section>
    </div>
  );
}
