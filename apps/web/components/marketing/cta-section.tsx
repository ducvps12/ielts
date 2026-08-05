import { LinkButton } from "@levelup/ui";
import { ArrowRight, Target } from "@levelup/ui/icons";

export function CtaSection() {
  return (
    <section className="marketing-cta" aria-labelledby="cta-title">
      <div className="marketing-container marketing-cta__inner">
        <div className="marketing-cta__icon" aria-hidden="true">
          <Target size={30} />
        </div>
        <div>
          <span className="marketing-eyebrow">BẮT ĐẦU NHỎ, ĐI ĐỦ XA</span>
          <h2 id="cta-title">Hôm nay chỉ cần mở Main Quest đầu tiên.</h2>
          <p>
            Không cần đợi cảm thấy hoàn hảo. Hệ thống sẽ giúp biến mục tiêu thành
            việc có thể bắt đầu trong một buổi học.
          </p>
        </div>
        <LinkButton href="/dang-ky" variant="secondary" size="lg">
          Tạo tài khoản miễn phí
          <ArrowRight size={18} aria-hidden="true" />
        </LinkButton>
      </div>
    </section>
  );
}
