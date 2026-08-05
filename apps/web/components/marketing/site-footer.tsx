import { BrandLogo } from "./brand-logo";

const footerGroups = [
  {
    title: "Sản phẩm",
    links: [
      ["Cách hoạt động", "/cach-hoat-dong"],
      ["Thử thách IELTS", "/thu-thach/ielts-75"],
      ["Bảng giá", "/bang-gia"],
      ["Trợ giúp", "/tro-giup"],
    ],
  },
  {
    title: "LevelUp",
    links: [
      ["Giới thiệu", "/gioi-thieu"],
      ["Liên hệ", "/lien-he"],
      ["Đăng nhập", "/dang-nhap"],
      ["Đăng ký", "/dang-ky"],
    ],
  },
  {
    title: "Pháp lý",
    links: [
      ["Điều khoản sử dụng", "/dieu-khoan"],
      ["Quyền riêng tư", "/quyen-rieng-tu"],
      ["Chính sách cookie", "/chinh-sach-cookie"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-container marketing-footer__grid">
        <div className="marketing-footer__brand">
          <BrandLogo />
          <p>
            Biến mục tiêu IELTS thành một hành trình rõ ràng, có nhiệm vụ hằng ngày
            và tiến độ có bằng chứng.
          </p>
          <span className="marketing-footer__legal-note">
            Nội dung pháp lý hiện là bản dự thảo và cần chuyên gia pháp lý Việt Nam
            kiểm tra trước khi phát hành chính thức.
          </span>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <strong>{group.title}</strong>
            {group.links.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="marketing-container marketing-footer__bottom">
        <small>© 2026 LevelUp. Bản thử nghiệm sản phẩm.</small>
        <small>Không cam kết điểm IELTS đầu ra.</small>
      </div>
    </footer>
  );
}
