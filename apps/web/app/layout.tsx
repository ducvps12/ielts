import type { Metadata } from "next";
import "@levelup/ui/styles.css";
import "./styles.css";
import "../styles/marketing.css";
import "../styles/public-pages.css";
import "../styles/auth.css";
import "../styles/client.css";
import "../styles/client-pages.css";
import "../styles/video-lab.css";

export const metadata: Metadata = {
  title: {
    default: "LevelUp",
    template: "%s | LevelUp",
  },
  description:
    "Biến mục tiêu học tập và phát triển cá nhân thành hành trình nhiệm vụ mỗi ngày.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-theme="light">
      <body>
        <a className="ui-skip-link" href="#main-content">
          Bỏ qua điều hướng
        </a>
        {children}
      </body>
    </html>
  );
}
