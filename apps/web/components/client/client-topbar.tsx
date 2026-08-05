"use client";

import type { AuthenticatedUser } from "@levelup/contracts";
import { Avatar, Dropdown } from "@levelup/ui";
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  User,
} from "@levelup/ui/icons";
import { useState } from "react";

import { apiRequest } from "../../lib/api-client";

interface ClientTopbarProps {
  pageTitle?: string;
  user: AuthenticatedUser;
}

export function ClientTopbar({ pageTitle, user }: ClientTopbarProps) {
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout(): Promise<void> {
    setLoggingOut(true);

    try {
      await apiRequest<{ loggedOut: true }>("/auth/logout", {
        method: "POST",
      });
      window.location.assign("/dang-nhap");
    } catch {
      window.alert(
        "Không thể đăng xuất lúc này. Hãy kiểm tra kết nối và thử lại.",
      );
      setLoggingOut(false);
    }
  }

  return (
    <header className="client-topbar">
      <div className="client-topbar__title">
        <span>{pageTitle ?? "LevelUp IELTS"}</span>
      </div>

      <div className="client-topbar__actions">
        <button
          className="client-command-button"
          type="button"
          disabled
          aria-label="Tìm kiếm toàn hệ thống — chưa khả dụng"
          title="Tìm kiếm sẽ được nối ở phase sau"
        >
          <Search size={18} aria-hidden="true" />
          <span>Tìm kiếm</span>
          <kbd>⌘K</kbd>
        </button>

        <a
          className="client-notification-button"
          href="/app/thong-bao"
          aria-label="Thông báo, có 2 mục chưa đọc"
        >
          <Bell size={20} aria-hidden="true" />
          <span aria-hidden="true">2</span>
        </a>

        <Dropdown
          label="Mở menu tài khoản"
          trigger={
            <span className="client-user-trigger">
              <Avatar name={user.displayName} size="sm" />
              <span className="client-user-trigger__copy">
                <strong>{user.displayName}</strong>
                <small>{user.email}</small>
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          }
          items={[
            {
              id: "profile",
              label: "Hồ sơ",
              href: "/app/ho-so",
              icon: <User size={17} aria-hidden="true" />,
            },
            {
              id: "settings",
              label: "Cài đặt",
              href: "/app/cai-dat",
              icon: <Settings size={17} aria-hidden="true" />,
            },
            {
              id: "logout",
              label: loggingOut ? "Đang đăng xuất..." : "Đăng xuất",
              disabled: loggingOut,
              destructive: true,
              onSelect: logout,
              icon: <LogOut size={17} aria-hidden="true" />,
            },
          ]}
        />
      </div>
    </header>
  );
}
