import type { Metadata } from "next";
import { Alert, LinkButton } from "@levelup/ui";
import { CircleAlert, Mail } from "@levelup/ui/icons";

export const metadata: Metadata = {
  title: "Xác minh email",
};

export default function VerifyEmailPage() {
  return (
    <div className="auth-card auth-card--status">
      <div className="auth-card__icon" aria-hidden="true">
        <Mail size={24} />
      </div>
      <div className="auth-card__heading">
        <h1>Kiểm tra email của bạn</h1>
        <p>
          Khi API xác thực được nối, LevelUp sẽ gửi liên kết có thời hạn để xác minh
          địa chỉ email.
        </p>
      </div>
      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Chưa gửi email thật"
        description="Trang này đang minh họa trạng thái UX. Không có email hoặc token xác minh nào được tạo."
      />
      <div className="auth-card__actions">
        <LinkButton href="/dang-nhap" block>
          Quay lại đăng nhập
        </LinkButton>
        <LinkButton href="/tro-giup" variant="outline" block>
          Xem trợ giúp
        </LinkButton>
      </div>
    </div>
  );
}
