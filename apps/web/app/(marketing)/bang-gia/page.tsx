import type { Metadata } from "next";

import { formatCurrency } from "@levelup/i18n";
import { Alert, Badge, Card, LinkButton } from "@levelup/ui";
import {
  Check,
  CircleAlert,
  LockKeyhole,
  ShieldCheck,
  Wallet,
} from "@levelup/ui/icons";

import { MarketingPageHero } from "../../../components/marketing/page-hero";
import {
  demoPlans,
  paymentMethodPreviews,
} from "../../../data/demo/pricing";

export const metadata: Metadata = {
  title: "Bảng giá",
  description:
    "Gói sản phẩm dự kiến của LevelUp và trạng thái sẵn sàng của các phương thức thanh toán.",
};

export default function PricingPage() {
  return (
    <main id="main-content">
      <MarketingPageHero
        eyebrow="BẢNG GIÁ QUỐC TẾ"
        title="Bắt đầu miễn phí. Chỉ mở thanh toán khi hệ thống đủ an toàn."
        description="LevelUp đang kiểm chứng vòng lặp mục tiêu và Video Lab. Giá Pro dưới đây là dữ liệu thiết kế, không phải lời mời mua hàng hay cam kết mở bán."
      />

      <section className="public-content-section">
        <div className="marketing-container pricing-layout">
          <Alert
            tone="warning"
            icon={<CircleAlert size={20} aria-hidden="true" />}
            title="Commerce production đang tắt"
            description="Không có checkout thật, không thu tiền và không tự cấp quyền Pro. PayPal, VietQR và các provider khác chỉ được bật sau webhook verification, idempotency, reconciliation, support và legal review."
          />

          <div className="pricing-grid">
            {demoPlans.map((plan) => (
              <Card
                key={plan.key}
                tone={plan.status === "draft" ? "muted" : "default"}
                className={
                  plan.status === "available"
                    ? "pricing-card pricing-card--featured"
                    : "pricing-card"
                }
              >
                <Badge tone={plan.status === "available" ? "success" : "warning"}>
                  {plan.eyebrow}
                </Badge>
                <h2>{plan.name}</h2>
                <p className="pricing-card__price">
                  {formatCurrency(plan.amountMinor, plan.currency, "vi")}
                </p>
                <span className="pricing-card__interval">{plan.intervalLabel}</span>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      {plan.status === "available" ? (
                        <Check size={17} aria-hidden="true" />
                      ) : (
                        <LockKeyhole size={17} aria-hidden="true" />
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.status === "available" ? (
                  <LinkButton href="/dang-ky" block>
                    Đăng ký bản thử nghiệm
                  </LinkButton>
                ) : (
                  <button
                    className="ui-button ui-button--outline ui-button--md ui-button--block"
                    disabled
                  >
                    Chưa mở checkout
                  </button>
                )}
              </Card>
            ))}
          </div>

          <section className="payment-readiness" aria-labelledby="payment-readiness-title">
            <div className="payment-readiness__heading">
              <div>
                <span>PAYMENT READINESS</span>
                <h2 id="payment-readiness-title">Một domain commerce, nhiều provider.</h2>
                <p>
                  Product, plan, price, subscription và entitlement thuộc LevelUp.
                  Provider chỉ xử lý thanh toán và gửi sự kiện đã xác thực.
                </p>
              </div>
              <ShieldCheck size={30} aria-hidden="true" />
            </div>

            <div className="payment-method-grid">
              {paymentMethodPreviews.map((method) => (
                <Card key={method.id} className="payment-method-card">
                  <Wallet size={22} aria-hidden="true" />
                  <div>
                    <div className="payment-method-card__title">
                      <h3>{method.name}</h3>
                      <Badge tone={method.status === "planned" ? "info" : "warning"}>
                        {method.status === "planned" ? "Planned" : "Review required"}
                      </Badge>
                    </div>
                    <span>{method.markets}</span>
                    <p>{method.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
