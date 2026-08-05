import { Home, Target, Zap } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function TodayPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="DAY 17 / 180"
      title="Hôm nay"
      description="Trung tâm điều khiển hằng ngày sẽ tập trung Main Quest, Side Quest, Bonus Quest và tiến độ tuần."
      icon={<Home size={24} />}
      primaryAction={{ label: "Mở Main Quest", href: "/app/nhiem-vu" }}
      cards={[
        {
          title: "Main Quest",
          description: "Nhiệm vụ quan trọng nhất và CTA tiếp tục học.",
          icon: <Target size={24} />,
        },
        {
          title: "Tiến độ và ưu tiên",
          description: "Streak, XP, tiến độ tuần và kỹ năng cần tập trung.",
          icon: <Zap size={24} />,
        },
      ]}
    />
  );
}
