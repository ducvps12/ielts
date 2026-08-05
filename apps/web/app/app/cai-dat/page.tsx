import type { Metadata } from "next";

import { LanguageSettingsPanel } from "../../../components/client/language-settings-panel";

export const metadata: Metadata = {
  title: "Cài đặt",
  description:
    "Quản lý ngôn ngữ giao diện, ngôn ngữ đang học và các tùy chọn khu vực.",
};

export default function SettingsPage() {
  return (
    <div className="client-settings-page">
      <header className="client-settings-page__header">
        <span>PREFERENCES</span>
        <h1>Cài đặt cá nhân</h1>
        <p>
          Một người có thể dùng giao diện tiếng Việt, học tiếng Trung và nhận giải
          thích bằng tiếng Anh. Những lựa chọn này không được gộp thành một trường.
        </p>
      </header>

      <LanguageSettingsPanel />
    </div>
  );
}
