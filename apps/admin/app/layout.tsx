import type { Metadata } from "next";
import "@levelup/ui/styles.css";
import "./styles.css";

export const metadata: Metadata = {
  title: "LevelUp Admin",
  description: "Bảng điều khiển vận hành nền tảng LevelUp IELTS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
