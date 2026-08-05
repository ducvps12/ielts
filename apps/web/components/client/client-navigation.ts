import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Home,
  Languages,
  Settings,
  Target,
  Trophy,
  User,
  Users,
} from "@levelup/ui/icons";

type NavigationIcon = typeof Home;

export interface ClientNavigationItem {
  label: string;
  href: string;
  icon: NavigationIcon;
  mobilePrimary?: boolean;
}

export const clientNavigation: ClientNavigationItem[] = [
  { label: "Hôm nay", href: "/app/hom-nay", icon: Home, mobilePrimary: true },
  { label: "Lộ trình", href: "/app/lo-trinh", icon: CalendarDays, mobilePrimary: true },
  { label: "Nhiệm vụ", href: "/app/nhiem-vu", icon: Target, mobilePrimary: true },
  { label: "Luyện tập", href: "/app/luyen-tap", icon: BookOpen },
  { label: "Video Lab", href: "/app/video-lab", icon: Languages },
  { label: "Tiến độ", href: "/app/tien-do", icon: BarChart3, mobilePrimary: true },
  { label: "Thành tích", href: "/app/thanh-tich", icon: Trophy },
  { label: "Cộng đồng", href: "/app/cong-dong", icon: Users },
  { label: "Thông báo", href: "/app/thong-bao", icon: Bell },
  { label: "Hồ sơ", href: "/app/ho-so", icon: User, mobilePrimary: true },
  { label: "Cài đặt", href: "/app/cai-dat", icon: Settings },
];

export function isClientRouteActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
