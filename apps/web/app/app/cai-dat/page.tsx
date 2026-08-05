import { Bell, Settings, ShieldCheck } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function SettingsPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="PREFERENCES"
      title="Cài đặt"
      description="Quản lý tài khoản, timezone, khả năng truy cập, thông báo và kết nối bên ngoài."
      icon={<Settings size={24} />}
      cards={[
        {
          title: "Thông báo và quiet hours",
          description: "Chọn kênh, thời gian nhắc và loại sự kiện muốn nhận.",
          icon: <Bell size={24} />,
        },
        {
          title: "Bảo mật và dữ liệu",
          description: "Phiên đăng nhập, yêu cầu xuất dữ liệu và quy trình xóa tài khoản.",
          icon: <ShieldCheck size={24} />,
        },
      ]}
    />
  );
}
