import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminCommunityPage() {
  return (
    <AdminResourceFoundation
      eyebrow="TRUST & SAFETY"
      title="Cộng đồng"
      description="Nền móng moderation cho nhóm học, báo cáo và nội dung do người dùng tạo."
      permission="community.read"
      capabilities={[
        "Queue báo cáo theo mức độ và SLA",
        "Quyết định moderation có lý do, evidence và audit",
        "Ẩn nội dung không đồng nghĩa xóa security facts",
        "Community feature tiếp tục bị khóa cho tới khi core loop ổn định",
      ]}
    />
  );
}
