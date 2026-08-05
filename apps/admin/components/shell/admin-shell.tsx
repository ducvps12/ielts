"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Drawer, IconButton } from "@levelup/ui";
import { Menu } from "@levelup/ui/icons";

import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import {
  adminNavigation,
  isAdminRouteActive,
} from "./admin-navigation";

interface AdminShellProps {
  children: ReactNode;
}

const mobileHrefs = [
  "/admin",
  "/admin/users",
  "/admin/campaigns",
  "/admin/reports",
  "/admin/settings",
] as const;

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeItem = adminNavigation.find((item) =>
    isAdminRouteActive(pathname, item.href),
  );
  const mobileItems = adminNavigation.filter((item) =>
    mobileHrefs.includes(item.href as (typeof mobileHrefs)[number]),
  );

  return (
    <div className="admin-shell-v2">
      <div className="admin-shell-v2__sidebar">
        <AdminSidebar pathname={pathname} />
      </div>

      <div className="admin-shell-v2__workspace">
        <div className="admin-mobile-header">
          <a href="/admin" className="admin-mobile-brand" aria-label="LevelUp Admin">
            <span aria-hidden="true">L</span>
            <strong>ADMIN</strong>
          </a>
          <span>{activeItem?.label ?? "Quản trị"}</span>
          <IconButton
            label="Mở menu admin"
            variant="outline"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </IconButton>
        </div>

        <AdminTopbar pathname={pathname} />
        <main id="main-content" className="admin-main-v2">
          {children}
        </main>
      </div>

      <nav className="admin-bottom-nav" aria-label="Điều hướng admin nhanh">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = isAdminRouteActive(pathname, item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              className={active ? "is-active" : undefined}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <Drawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        title="Admin navigation"
        description="Các mục được hiển thị theo permission demo."
        side="left"
      >
        <div className="admin-mobile-drawer">
          <AdminSidebar
            pathname={pathname}
            onNavigate={() => setMenuOpen(false)}
          />
        </div>
      </Drawer>
    </div>
  );
}
