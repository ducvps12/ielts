import type { Metadata } from "next";

import { LanguageSettingsPanel } from "../../../components/client/language-settings-panel";
import { SessionSettingsPanel } from "../../../components/client/session-settings-panel";

export const metadata: Metadata = {
  title: "Cài đặt",
  description:
    "Quản lý ngôn ngữ giao diện, ngôn ngữ đang học và bảo mật tài khoản.",
};

export default function SettingsPage() {
  return (
    <div className="client-settings-page">
      <header className="client-settings-page__header">
        <span>PREFERENCES</span>
        <h1>Cài đặt cá nhân</h1>
        <p>
          Quản lý hồ sơ ngôn ngữ và các phiên đăng nhập đang có quyền truy cập vào
          tài khoản của bạn.
        </p>
      </header>

      <LanguageSettingsPanel />
      <SessionSettingsPanel />
    </div>
  );
}
