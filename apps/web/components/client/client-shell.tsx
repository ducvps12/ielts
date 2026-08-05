"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Drawer, IconButton } from "@levelup/ui";
import { Menu } from "@levelup/ui/icons";

import { BrandLogo } from "../marketing/brand-logo";
import { ClientSidebar } from "./client-sidebar";
import { ClientTopbar } from "./client-topbar";
import {
  clientNavigation,
  isClientRouteActive,
} from "./client-navigation";

interface ClientShellProps {
  children: ReactNode;
}

export function ClientShell({ children }: ClientShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeItem = clientNavigation.find((item) =>
    isClientRouteActive(pathname, item.href),
  );
  const mobileItems = clientNavigation.filter((item) => item.mobilePrimary);

  return (
    <div className="client-shell">
      <div className="client-shell__desktop-sidebar">
        <ClientSidebar pathname={pathname} />
      </div>

      <div className="client-shell__workspace">
        <div className="client-mobile-header">
          <BrandLogo compact />
          <span>{activeItem?.label ?? "LevelUp"}</span>
          <IconButton
            label="Mở menu tài khoản"
            variant="outline"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </IconButton>
        </div>

        <ClientTopbar pageTitle={activeItem?.label} />

        <main id="main-content" className="client-main">
          {children}
        </main>
      </div>

      <nav className="client-bottom-nav" aria-label="Điều hướng nhanh">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = isClientRouteActive(pathname, item.href);
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
        title="Tất cả chức năng"
        description="Điều hướng hành trình và tài khoản LevelUp."
        side="left"
      >
        <div className="client-mobile-drawer">
          <ClientSidebar
            pathname={pathname}
            onNavigate={() => setMenuOpen(false)}
          />
        </div>
      </Drawer>
    </div>
  );
}
