import { Badge } from "@levelup/ui";
import { ShieldCheck } from "@levelup/ui/icons";

import { demoAdminOperator } from "../../data/demo/admin";
import {
  adminNavigation,
  isAdminRouteActive,
} from "./admin-navigation";

interface AdminSidebarProps {
  pathname: string;
  onNavigate?: () => void;
}

const groups = ["Vận hành", "Nội dung", "Hệ thống"] as const;

export function AdminSidebar({ pathname, onNavigate }: AdminSidebarProps) {
  const allowedItems = adminNavigation.filter((item) =>
    demoAdminOperator.permissions.includes(item.permission),
  );

  return (
    <aside className="admin-sidebar" aria-label="Điều hướng quản trị">
      <a className="admin-brand" href="/admin" aria-label="LevelUp Admin — Tổng quan">
        <span className="admin-brand__mark" aria-hidden="true">L</span>
        <span>
          <strong>LEVELUP</strong>
          <small>ADMIN CONTROL</small>
        </span>
      </a>

      <nav className="admin-sidebar__nav">
        {groups.map((group) => {
          const groupItems = allowedItems.filter((item) => item.group === group);
          if (groupItems.length === 0) {
            return null;
          }

          return (
            <div className="admin-sidebar__group" key={group}>
              <span className="admin-sidebar__group-label">{group}</span>
              {groupItems.map((item) => {
                const Icon = item.icon;
                const active = isAdminRouteActive(pathname, item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="admin-sidebar__environment">
        <div className="admin-sidebar__environment-heading">
          <ShieldCheck size={18} aria-hidden="true" />
          <div>
            <strong>Development</strong>
            <span>Không dùng dữ liệu production</span>
          </div>
        </div>
        <Badge tone="warning">ADMIN DEMO</Badge>
      </div>
    </aside>
  );
}
