import type { Metadata } from "next";
import "@levelup/ui/styles.css";
import "./styles.css";
import "../styles/admin.css";

export const metadata: Metadata = {
  title: {
    default: "LevelUp Admin",
    template: "%s | LevelUp Admin",
  },
  description: "Bảng điều khiển vận hành nền tảng LevelUp IELTS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-theme="dark">
      <body>
        <a className="ui-skip-link" href="#main-content">
          Bỏ qua điều hướng
        </a>
        {children}
      </body>
    </html>
  );
}
