import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "LevelUp IELTS",
  description: "Biến mục tiêu IELTS thành nhiệm vụ mỗi ngày.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
