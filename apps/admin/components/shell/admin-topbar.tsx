import { Avatar, Breadcrumb, Dropdown } from "@levelup/ui";
import {
  Bell,
  ChevronDown,
  Command,
  LogOut,
  Search,
  Settings,
  User,
} from "@levelup/ui/icons";

import { demoAdminOperator } from "../../data/demo/admin";
import { adminNavigation } from "./admin-navigation";

interface AdminTopbarProps {
  pathname: string;
}

export function AdminTopbar({ pathname }: AdminTopbarProps) {
  const activeItem = adminNavigation.find((item) =>
    pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const currentLabel = activeItem?.label ?? "Quản trị";

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__context">
        <Breadcrumb
          ariaLabel="Vị trí trong admin"
          items={[
            { label: "Admin", href: "/admin" },
            { label: currentLabel, current: true },
          ]}
        />
      </div>

      <div className="admin-topbar__actions">
        <button
          className="admin-command-button"
          type="button"
          disabled
          aria-label="Tìm nhanh trong admin — chưa khả dụng"
          title="Command palette sẽ được nối ở phase sau"
        >
          <Search size={18} aria-hidden="true" />
          <span>Tìm người dùng, campaign, quest...</span>
          <kbd>
            <Command size={12} aria-hidden="true" />K
          </kbd>
        </button>

        <a className="admin-topbar__notification" href="/admin/notifications" aria-label="Cảnh báo vận hành">
          <Bell size={20} aria-hidden="true" />
        </a>

        <Dropdown
          label="Mở menu quản trị viên"
          trigger={
            <span className="admin-user-trigger">
              <Avatar name={demoAdminOperator.name} size="sm" />
              <span>
                <strong>{demoAdminOperator.name}</strong>
                <small>{demoAdminOperator.roleLabel}</small>
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          }
          items={[
            {
              id: "profile",
              label: "Hồ sơ operator",
              disabled: true,
              icon: <User size={17} aria-hidden="true" />,
            },
            {
              id: "settings",
              label: "Cài đặt hệ thống",
              href: "/admin/settings",
              icon: <Settings size={17} aria-hidden="true" />,
            },
            {
              id: "logout",
              label: "Đăng xuất",
              disabled: true,
              destructive: true,
              icon: <LogOut size={17} aria-hidden="true" />,
            },
          ]}
        />
      </div>
    </header>
  );
}
