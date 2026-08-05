import { BookOpen, GraduationCap } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function PracticePage() {
  return (
    <ClientPlaceholderPage
      eyebrow="SKILL PRACTICE"
      title="Luyện tập"
      description="Không gian luyện Reading, Listening, Writing và Speaking theo kỹ năng thay vì theo ngày chiến dịch."
      icon={<BookOpen size={24} />}
      cards={[
        {
          title: "Bốn kỹ năng IELTS",
          description: "Mỗi kỹ năng có session, lịch sử, rubric và giải thích đáp án riêng.",
          icon: <GraduationCap size={24} />,
        },
        {
          title: "Tiếp tục phiên gần nhất",
          description: "Autosave và khôi phục session sẽ được nối với practice engine.",
          icon: <BookOpen size={24} />,
        },
      ]}
    />
  );
}
