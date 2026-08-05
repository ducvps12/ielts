import { BarChart3, Target } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function ProgressPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="PROGRESS REPORT"
      title="Tiến độ"
      description="Tổng hợp xu hướng từng kỹ năng, mức hoàn thành và checkpoint thay vì chỉ hiển thị điểm trang trí."
      icon={<BarChart3 size={24} />}
      cards={[
        {
          title: "Xu hướng band",
          description: "Listening, Reading, Writing và Speaking theo từng lần mock.",
          icon: <BarChart3 size={24} />,
        },
        {
          title: "Hành vi học tập",
          description: "Số ngày hoạt động, tỷ lệ Main Quest và nhóm lỗi lặp lại.",
          icon: <Target size={24} />,
        },
      ]}
    />
  );
}
