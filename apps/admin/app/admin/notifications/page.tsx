import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminNotificationsPage() {
  return (
    <AdminResourceFoundation
      eyebrow="DELIVERY OPERATIONS"
      title="Thông báo"
      description="Theo dõi notification intent, channel delivery, retry và provider receipt."
      permission="notifications.read"
      capabilities={[
        "Email, in-app và Telegram theo user preference",
        "Quiet hours và timezone-aware scheduling",
        "Outbox, retry, dead-letter và safe replay",
        "Không gửi trùng khi worker hoặc provider retry",
      ]}
    />
  );
}
