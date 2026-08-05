import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminCampaignsPage() {
  return (
    <AdminResourceFoundation
      eyebrow="JOURNEY OPERATIONS"
      title="Hành trình"
      description="Theo dõi các journey được tạo từ template version cho từng người học."
      permission="campaigns.read"
      capabilities={[
        "Tìm journey theo goal, learner, template version và trạng thái",
        "Xem campaign day theo timezone của người học",
        "Tạm dừng, tiếp tục hoặc kết thúc bằng command có idempotency",
        "Hiển thị lỗi tạo quest và lịch reconciliation",
      ]}
    />
  );
}
