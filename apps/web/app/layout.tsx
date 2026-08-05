import type { Metadata } from "next";
import "@levelup/ui/styles.css";
import "./styles.css";
import "../styles/marketing.css";

export const metadata: Metadata = {
  title: {
    default: "LevelUp IELTS",
    template: "%s | LevelUp IELTS",
  },
  description:
    "Biến mục tiêu IELTS thành hành trình nhiệm vụ hằng ngày có cấu trúc.",
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
