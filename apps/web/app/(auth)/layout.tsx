import { BrandLogo } from "../../components/marketing/brand-logo";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main id="main-content" className="auth-shell">
      <div className="auth-shell__brand">
        <BrandLogo />
      </div>
      <section className="auth-shell__content" aria-label="Tài khoản LevelUp">
        {children}
      </section>
      <p className="auth-shell__note">
        Hệ thống xác thực đang ở giai đoạn xây dựng. Không nhập mật khẩu đang sử dụng
        cho dịch vụ khác.
      </p>
    </main>
  );
}
