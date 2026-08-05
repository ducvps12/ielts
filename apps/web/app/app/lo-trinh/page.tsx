import { CalendarDays, Target } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function JourneyPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="BẢN ĐỒ 180 NGÀY"
      title="Lộ trình"
      description="Theo dõi Arc hiện tại, checkpoint và giai đoạn sắp tới mà không bị ngợp bởi toàn bộ 180 ngày."
      icon={<CalendarDays size={24} />}
      cards={[
        {
          title: "Arc hiện tại",
          description: "Xây nền có kỷ luật — ngày 4 đến ngày 30.",
          icon: <Target size={24} />,
        },
        {
          title: "Checkpoint tiếp theo",
          description: "Tổng kết tuần và điều chỉnh kỹ năng ưu tiên.",
          icon: <CalendarDays size={24} />,
        },
      ]}
    />
  );
}
