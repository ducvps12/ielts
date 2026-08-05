import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminAuditLogsPage() {
  return (
    <AdminResourceFoundation
      eyebrow="AUDIT & COMPLIANCE"
      title="Nhật ký kiểm toán"
      description="Tra cứu sự kiện bảo mật và mutation đặc quyền dưới dạng immutable facts."
      permission="audit.read"
      capabilities={[
        "Lọc theo actor, action, resource, request ID và thời gian",
        "Hiển thị before/after đã loại bỏ secret và dữ liệu dư thừa",
        "Financial, permission và moderation actions có trace rõ ràng",
        "Audit record không được chỉnh sửa hoặc xóa từ giao diện",
      ]}
    />
  );
}
