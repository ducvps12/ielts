import type { Metadata } from "next";
import "@levelup/ui/styles.css";
import "./styles.css";

export const metadata: Metadata = {
  title: "LevelUp IELTS",
  description: "Biến mục tiêu IELTS thành nhiệm vụ mỗi ngày.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
