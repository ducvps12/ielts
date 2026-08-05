import type { ComponentType } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  MessageCircle,
  Settings,
  ShieldCheck,
  Target,
  Users,
} from "@levelup/ui/icons";

import type { AdminPermission } from "../../data/demo/admin";

type AdminIcon = ComponentType<{
  size?: number;
  "aria-hidden"?: boolean;
}>;

export interface AdminNavigationItem {
  label: string;
  href: string;
  icon: AdminIcon;
  permission: AdminPermission;
  group: "Vận hành" | "Nội dung" | "Hệ thống";
}

export const adminNavigation: AdminNavigationItem[] = [
  {
    label: "Tổng quan",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "dashboard.read",
    group: "Vận hành",
  },
  {
    label: "Người dùng",
    href: "/admin/users",
    icon: Users,
    permission: "users.read",
    group: "Vận hành",
  },
  {
    label: "Mục tiêu",
    href: "/admin/goals",
    icon: Target,
    permission: "goals.read",
    group: "Vận hành",
  },
  {
    label: "Campaign",
    href: "/admin/campaigns",
    icon: CalendarDays,
    permission: "campaigns.read",
    group: "Vận hành",
  },
  {
    label: "Nhiệm vụ",
    href: "/admin/quests",
    icon: Target,
    permission: "quests.read",
    group: "Nội dung",
  },
  {
    label: "Nội dung",
    href: "/admin/content",
    icon: BookOpen,
    permission: "content.read",
    group: "Nội dung",
  },
  {
    label: "Cộng đồng",
    href: "/admin/community",
    icon: MessageCircle,
    permission: "community.moderate",
    group: "Nội dung",
  },
  {
    label: "Báo cáo",
    href: "/admin/reports",
    icon: BarChart3,
    permission: "reports.read",
    group: "Vận hành",
  },
  {
    label: "Thông báo",
    href: "/admin/notifications",
    icon: Bell,
    permission: "notifications.read",
    group: "Hệ thống",
  },
  {
    label: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
    permission: "settings.read",
    group: "Hệ thống",
  },
  {
    label: "Audit log",
    href: "/admin/audit-logs",
    icon: ShieldCheck,
    permission: "audit.read",
    group: "Hệ thống",
  },
];

export function isAdminRouteActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
