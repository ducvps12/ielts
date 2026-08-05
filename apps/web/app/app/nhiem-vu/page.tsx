import { BookOpen, Target } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function QuestsPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="QUEST CENTER"
      title="Nhiệm vụ"
      description="Danh sách nhiệm vụ được phân loại theo trạng thái, kỹ năng, thời lượng và mức ưu tiên."
      icon={<Target size={24} />}
      cards={[
        {
          title: "Đang làm",
          description: "Nhiệm vụ đã bắt đầu và có thể tiếp tục từ tiến độ gần nhất.",
          icon: <Target size={24} />,
        },
        {
          title: "Thư viện nhiệm vụ",
          description: "Bộ lọc theo Reading, Listening, Writing và Speaking.",
          icon: <BookOpen size={24} />,
        },
      ]}
    />
  );
}
