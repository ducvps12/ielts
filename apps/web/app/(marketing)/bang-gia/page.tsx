import type { Metadata } from "next";
import { Alert, Badge, Card, LinkButton } from "@levelup/ui";
import { Check, CircleAlert, LockKeyhole } from "@levelup/ui/icons";

import { MarketingPageHero } from "../../../components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Bảng giá",
  description: "Trạng thái gói sản phẩm LevelUp IELTS.",
};

const freeFeatures = [
  "Một hành trình IELTS đang hoạt động",
  "Main, Side và Bonus Quest",
  "Streak và tiến độ tuần",
  "Error Log nền tảng",
] as const;

const futureFeatures = [
  "Nhiều hành trình cùng lúc",
  "Báo cáo chuyên sâu",
  "Nhóm accountability nâng cao",
  "Tùy chỉnh lịch và quy tắc sâu hơn",
] as const;

export default function PricingPage() {
  return (
    <main id="main-content">
      <MarketingPageHero
        eyebrow="BẢNG GIÁ"
        title="Chưa bán khi giá trị cốt lõi chưa được kiểm chứng."
        description="Giai đoạn đầu ưu tiên cohort thử nghiệm và dữ liệu sử dụng thật. Mức giá, kỳ hạn và chính sách hoàn tiền chưa được công bố."
      />

      <section className="public-content-section">
        <div className="marketing-container pricing-layout">
          <Alert
            tone="warning"
            icon={<CircleAlert size={20} aria-hidden="true" />}
            title="Commerce đang tắt"
            description="Không có checkout, subscription hoặc thanh toán thật ở giai đoạn UI foundation."
          />

          <div className="pricing-grid">
            <Card className="pricing-card pricing-card--featured">
              <Badge tone="success">Bản thử nghiệm</Badge>
              <h2>Free Beta</h2>
              <p className="pricing-card__price">0đ</p>
              <p>Dành cho nhóm người dùng đầu tiên cùng kiểm chứng vòng lặp học tập.</p>
              <ul>
                {freeFeatures.map((feature) => (
                  <li key={feature}>
                    <Check size={17} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <LinkButton href="/dang-ky" block>
                Đăng ký bản thử nghiệm
              </LinkButton>
            </Card>

            <Card tone="muted" className="pricing-card">
              <Badge>Chưa mở bán</Badge>
              <h2>Premium tương lai</h2>
              <p className="pricing-card__price">Chưa định giá</p>
              <p>Chỉ mở khi tính năng, pháp lý, thanh toán và hỗ trợ đã sẵn sàng.</p>
              <ul>
                {futureFeatures.map((feature) => (
                  <li key={feature}>
                    <LockKeyhole size={17} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="ui-button ui-button--outline ui-button--md ui-button--block" disabled>
                Chưa khả dụng
              </button>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
