import { Badge, LinkButton } from "@levelup/ui";
import { ArrowRight, ShieldCheck, Sparkles } from "@levelup/ui/icons";

export function HeroSection() {
  return (
    <section className="marketing-hero" aria-labelledby="hero-title">
      <div className="marketing-container marketing-hero__inner">
        <div className="marketing-hero__copy">
          <Badge tone="primary">
            <Sparkles size={14} aria-hidden="true" />
            Hệ thống học IELTS có cấu trúc
          </Badge>
          <h1 id="hero-title">
            Đừng chỉ đặt mục tiêu.
            <span>Hãy biết chính xác hôm nay cần làm gì.</span>
          </h1>
          <p>
            LevelUp biến mục tiêu IELTS 7.5 thành hành trình 180 ngày với nhiệm vụ,
            checkpoint, Error Log và báo cáo tiến độ rõ ràng.
          </p>

          <div className="marketing-hero__actions">
            <LinkButton href="/dang-ky" size="lg">
              Khởi tạo hành trình
              <ArrowRight size={18} aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/cach-hoat-dong" variant="outline" size="lg">
              Xem cách hoạt động
            </LinkButton>
          </div>

          <ul className="marketing-hero__trust" aria-label="Cam kết sản phẩm">
            <li>
              <ShieldCheck size={17} aria-hidden="true" />
              Không hứa band ảo
            </li>
            <li>
              <ShieldCheck size={17} aria-hidden="true" />
              Thưởng phạt lành mạnh
            </li>
            <li>
              <ShieldCheck size={17} aria-hidden="true" />
              Tối ưu cho điện thoại
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
