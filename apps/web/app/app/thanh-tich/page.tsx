import { Star, Trophy } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function AchievementsPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="ACHIEVEMENTS"
      title="Thành tích"
      description="Ghi nhận những cột mốc có ý nghĩa như chuỗi học, checkpoint và tiến bộ kỹ năng."
      icon={<Trophy size={24} />}
      cards={[
        {
          title: "Cột mốc hành trình",
          description: "Arc hoàn thành, streak và các checkpoint quan trọng.",
          icon: <Trophy size={24} />,
        },
        {
          title: "Danh hiệu có điều kiện rõ",
          description: "Mỗi thành tích phải có rule phiên bản hóa và không thể được UI tự cấp.",
          icon: <Star size={24} />,
        },
      ]}
    />
  );
}
