import type { Metadata } from "next";
import { Alert, LinkButton } from "@levelup/ui";
import {
  BarChart3,
  CalendarDays,
  CircleAlert,
  ShieldCheck,
  Target,
} from "@levelup/ui/icons";

import { PublicContentPage } from "../../../../components/marketing/public-content-page";

export const metadata: Metadata = {
  title: "IELTS 7.5 — 180 ngày",
  description: "Cấu trúc thử thách IELTS 7.5 trong 180 ngày của LevelUp.",
};

export default function IeltsChallengePage() {
  return (
    <PublicContentPage
      eyebrow="THỬ THÁCH ĐẦU TIÊN"
      badge="IELTS 7.5 · 180 NGÀY"
      title="Hành trình dài được chia thành nhiệm vụ đủ nhỏ để làm hôm nay."
      description="Cấu trúc ban đầu gồm baseline, xây nền, rèn kỹ năng, luyện thời gian, mô phỏng phòng thi và giai đoạn ổn định phong độ."
      actions={
        <>
          <LinkButton href="/dang-ky" size="lg">
            Tham gia bản thử nghiệm
          </LinkButton>
          <LinkButton href="/cach-hoat-dong" variant="outline" size="lg">
            Xem cách vận hành
          </LinkButton>
        </>
      }
      note={
        <Alert
          tone="warning"
          icon={<CircleAlert size={20} aria-hidden="true" />}
          title="Không phải cam kết band điểm"
          description="Mục tiêu 7.5 là định hướng hành trình. Band thật phụ thuộc đầu vào, thời lượng học, chất lượng nội dung và kết quả bài thi chuẩn hóa."
        />
      }
      blocks={[
        {
          title: "Ngày 1–3: Baseline",
          description:
            "Khảo sát Reading, Listening, Writing và Speaking để ghi nhận điểm xuất phát thay vì phán xét người học.",
          icon: <Target size={24} />,
        },
        {
          title: "Ngày 4–75: Xây nền và rèn kỹ năng",
          description:
            "Tập trung Error Log, từ vựng theo cụm, chiến thuật từng dạng câu hỏi và chất lượng chữa lỗi.",
          icon: <CalendarDays size={24} />,
        },
        {
          title: "Ngày 76–160: Áp lực thời gian và mock",
          description:
            "Tăng dần điều kiện bấm giờ, full section và checkpoint để tìm lỗi lặp lại dưới áp lực.",
          icon: <BarChart3 size={24} />,
        },
        {
          title: "Ngày 161–180: Final Raid lành mạnh",
          description:
            "Ổn định phong độ, ngủ nghỉ hợp lý và chỉ sửa những nhóm lỗi có ảnh hưởng lớn nhất.",
          icon: <ShieldCheck size={24} />,
        },
      ]}
    />
  );
}
