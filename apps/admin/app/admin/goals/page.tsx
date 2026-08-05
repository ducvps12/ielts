import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminGoalsPage() {
  return (
    <AdminResourceFoundation
      eyebrow="GOAL OPERATIONS"
      title="Mục tiêu"
      description="Quản lý mục tiêu tổng quát thay vì giới hạn hệ thống vào riêng IELTS."
      permission="goals.read"
      capabilities={[
        "Lọc theo category, template, trạng thái và thị trường",
        "Xem baseline, constraints, target date và timezone",
        "Theo dõi goal lifecycle mà không sửa lịch sử campaign",
        "Phân biệt mục tiêu riêng tư và template công khai",
      ]}
    />
  );
}
