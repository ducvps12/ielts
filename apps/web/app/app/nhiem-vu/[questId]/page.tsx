import { notFound } from "next/navigation";
import {
  Alert,
  Badge,
  Button,
  Card,
  LinkButton,
  Progress,
  Textarea,
} from "@levelup/ui";
import {
  ArrowRight,
  CircleAlert,
  Clock,
  Target,
  Wallet,
  Zap,
} from "@levelup/ui/icons";

import { demoQuestList } from "../../../../data/demo/client";

interface QuestDetailPageProps {
  params: Promise<{ questId: string }>;
}

export default async function QuestDetailPage({ params }: QuestDetailPageProps) {
  const { questId } = await params;
  const quest = demoQuestList.find((item) => item.id === questId);

  if (!quest) {
    notFound();
  }

  const inProgress = quest.state === "in_progress";

  return (
    <div data-demo="true">
      <header className="client-page-header">
        <div className="client-page-header__copy">
          <span>{quest.kind.toUpperCase()} QUEST · {quest.skill.toUpperCase()}</span>
          <h1>{quest.title}</h1>
          <p>{quest.description}</p>
        </div>
        <div className="client-page-header__actions">
          <LinkButton href="/app/nhiem-vu" variant="outline">
            Quay lại danh sách
          </LinkButton>
        </div>
      </header>

      <Alert
        tone="warning"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Không thể hoàn thành quest trong bản UI"
        description="API phải xác nhận quyền, trạng thái, idempotency và phần thưởng. Nút hoàn thành đang bị vô hiệu hóa để tránh tạo hành vi giả."
      />

      <div className="client-quest-detail-layout client-section-gap">
        <section className="client-quest-detail-layout__main">
          <Card className="client-quest-instructions">
            <div className="client-quest-instructions__topline">
              <div className="client-quest-card__badges">
                <Badge tone="primary">{quest.skill}</Badge>
                <Badge>{quest.durationMinutes} phút</Badge>
              </div>
              <div className="client-quest-card__rewards">
                <span><Zap size={16} aria-hidden="true" />+{quest.xp} XP</span>
                <span><Wallet size={16} aria-hidden="true" />+{quest.gold} Gold</span>
              </div>
            </div>

            <h2>Hướng dẫn thực hiện</h2>
            <ol>
              <li>Chuẩn bị tài liệu và tắt các nguồn gây xao nhãng.</li>
              <li>Làm phần bài chính trong thời gian quy định, không tra đáp án.</li>
              <li>Chữa từng câu sai và ghi nguyên nhân vào Error Log.</li>
              <li>Chỉ đánh dấu hoàn thành khi đã có bằng chứng học tập phù hợp.</li>
            </ol>

            {inProgress && typeof quest.progress === "number" ? (
              <Progress
                label="Tiến độ đã lưu trong demo"
                value={quest.progress}
                showValue
              />
            ) : null}
          </Card>

          <Card className="client-evidence-card">
            <div className="client-section-card__header">
              <div>
                <span>BẰNG CHỨNG HỌC TẬP</span>
                <h2>Error Log hoặc ghi chú</h2>
              </div>
              <span className="client-section-card__icon" aria-hidden="true">
                <Target size={21} />
              </span>
            </div>
            <Textarea
              label="Ghi chú sau nhiệm vụ"
              placeholder="Ví dụ: Sai 3 câu Matching Headings vì chọn theo từ giống hệt thay vì ý chính."
              disabled
              hint="Chưa nối API và storage nên trường này đang bị vô hiệu hóa."
            />
            <Button block disabled>
              Hoàn thành và nhận thưởng
            </Button>
          </Card>
        </section>

        <aside className="client-quest-detail-layout__aside">
          <Card className="client-quest-session-card">
            <Clock size={24} aria-hidden="true" />
            <span>PHIÊN HỌC</span>
            <strong>{quest.durationMinutes}:00</strong>
            <p>Timer sẽ có autosave và cảnh báo trước khi rời trang ở phase practice engine.</p>
            <Button variant="outline" block disabled>
              Bắt đầu hẹn giờ
            </Button>
          </Card>

          <Card className="client-next-step-card">
            <span>SAU KHI XONG</span>
            <h2>Quay lại trang Hôm nay</h2>
            <p>Hệ thống sẽ cập nhật Daily Chest và đề xuất bước tiếp theo từ API.</p>
            <LinkButton href="/app/hom-nay" variant="ghost">
              Xem Hôm nay
              <ArrowRight size={17} aria-hidden="true" />
            </LinkButton>
          </Card>
        </aside>
      </div>
    </div>
  );
}
