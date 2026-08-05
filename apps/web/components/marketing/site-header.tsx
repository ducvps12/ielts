"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Drawer,
  IconButton,
  LinkButton,
} from "@levelup/ui";
import { Menu } from "@levelup/ui/icons";

import { BrandLogo } from "./brand-logo";

const navigation = [
  { label: "Cách hoạt động", href: "/cach-hoat-dong" },
  { label: "Thử thách", href: "/thu-thach" },
  { label: "Bảng giá", href: "/bang-gia" },
  { label: "Trợ giúp", href: "/tro-giup" },
] as const;

function isCurrentPath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="marketing-header">
      <div className="marketing-container marketing-header__inner">
        <BrandLogo />

        <nav className="marketing-header__nav" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="marketing-header__actions">
          <a className="marketing-header__login" href="/dang-nhap">
            Đăng nhập
          </a>
          <LinkButton href="/dang-ky" size="sm">
            Bắt đầu miễn phí
          </LinkButton>
        </div>

        <div className="marketing-header__mobile-action">
          <IconButton
            label="Mở menu"
            variant="outline"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </IconButton>
        </div>
      </div>

      <Drawer
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        title="Điều hướng"
        description="Khám phá hệ thống học IELTS LevelUp."
        side="right"
        footer={
          <div className="marketing-mobile-menu__footer">
            <LinkButton
              href="/dang-nhap"
              variant="outline"
              block
              onClick={() => setMobileOpen(false)}
            >
              Đăng nhập
            </LinkButton>
            <LinkButton
              href="/dang-ky"
              block
              onClick={() => setMobileOpen(false)}
            >
              Tạo tài khoản
            </LinkButton>
          </div>
        }
      >
        <nav className="marketing-mobile-menu" aria-label="Điều hướng di động">
          <a href="/" onClick={() => setMobileOpen(false)}>
            Trang chủ
          </a>
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/gioi-thieu" onClick={() => setMobileOpen(false)}>
            Giới thiệu
          </a>
          <a href="/lien-he" onClick={() => setMobileOpen(false)}>
            Liên hệ
          </a>
        </nav>
      </Drawer>
    </header>
  );
}
