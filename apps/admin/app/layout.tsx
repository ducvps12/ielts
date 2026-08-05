import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "LevelUp Admin",
  description: "Bảng điều khiển vận hành nền tảng LevelUp IELTS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
