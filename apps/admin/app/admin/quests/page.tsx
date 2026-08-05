import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminQuestsPage() {
  return (
    <AdminResourceFoundation
      eyebrow="QUEST OPERATIONS"
      title="Nhiệm vụ"
      description="Kiểm soát template, assignment, deadline, evidence và trạng thái hoàn thành."
      permission="quests.read"
      capabilities={[
        "Lọc theo loại nhiệm vụ, skill, trạng thái và campaign",
        "Xem prerequisite, recurrence và reward rule version",
        "Moderation evidence theo queue và reason code",
        "Không cấp XP hoặc Gold trực tiếp từ giao diện",
      ]}
    />
  );
}
