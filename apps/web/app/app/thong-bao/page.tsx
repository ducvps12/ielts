import { Bell, Settings } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function NotificationsPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="INBOX"
      title="Thông báo"
      description="Thông báo trong ứng dụng, email và Telegram sẽ cùng dùng một notification intent có trạng thái giao rõ ràng."
      icon={<Bell size={24} />}
      cards={[
        {
          title: "Nhắc nhiệm vụ",
          description: "Nhắc đúng giờ, tôn trọng quiet hours và không gửi trùng khi worker retry.",
          icon: <Bell size={24} />,
        },
        {
          title: "Tùy chọn kênh",
          description: "Người học kiểm soát kênh, thời gian và loại thông báo muốn nhận.",
          icon: <Settings size={24} />,
        },
      ]}
    />
  );
}
