import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminUsersPage() {
  return (
    <AdminResourceFoundation
      eyebrow="IDENTITY OPERATIONS"
      title="Người dùng"
      description="Tìm kiếm tài khoản, xem trạng thái hành trình và xử lý yêu cầu hỗ trợ theo quyền hạn."
      permission="users.read"
      capabilities={[
        "Tìm kiếm và lọc theo trạng thái, locale, timezone và mục tiêu đang hoạt động",
        "Xem hồ sơ hỗ trợ mà không lộ credential hoặc token",
        "Tạm khóa tài khoản qua confirmation dialog và reason code",
        "Phân trang, export policy và audit trail cho thao tác nhạy cảm",
      ]}
    />
  );
}
