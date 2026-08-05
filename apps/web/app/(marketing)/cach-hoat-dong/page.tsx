import type { Metadata } from "next";
import { LinkButton } from "@levelup/ui";
import { BarChart3, CalendarDays, Target, Zap } from "@levelup/ui/icons";

import { PublicContentPage } from "../../../components/marketing/public-content-page";

export const metadata: Metadata = {
  title: "Cách hoạt động",
  description: "Cách LevelUp chuyển mục tiêu IELTS thành hành trình nhiệm vụ.",
};

export default function HowItWorksPage() {
  return (
    <PublicContentPage
      eyebrow="CÁCH HỆ THỐNG HOẠT ĐỘNG"
      title="Từ mục tiêu 180 ngày đến việc cần làm trong 45 phút."
      description="Goal Engine chia mục tiêu thành giai đoạn, tuần, checkpoint và nhiệm vụ. UI chỉ trình bày quyết định; business rule sẽ nằm tại API."
      actions={
        <>
          <LinkButton href="/thu-thach/ielts-75">Xem thử thách IELTS</LinkButton>
          <LinkButton href="/dang-ky" variant="outline">
            Tạo tài khoản
          </LinkButton>
        </>
      }
      blocks={[
        {
          title: "1. Đánh giá điểm xuất phát",
          description:
            "Người học cung cấp mục tiêu, thời hạn, lịch rảnh và kết quả baseline thay vì chọn một template chung cho tất cả.",
          icon: <Target size={24} />,
        },
        {
          title: "2. Sinh lộ trình có phiên bản",
          description:
            "Campaign bám vào một template đã xuất bản để lịch sử người học không bị thay đổi âm thầm khi nội dung được cập nhật.",
          icon: <CalendarDays size={24} />,
        },
        {
          title: "3. Ưu tiên nhiệm vụ hôm nay",
          description:
            "Main Quest là việc quan trọng nhất. Side Quest tập trung chữa lỗi. Bonus Quest giữ nhịp trong những ngày còn năng lượng.",
          icon: <Zap size={24} />,
        },
        {
          title: "4. Điều chỉnh bằng dữ liệu",
          description:
            "Checkpoint, Error Log và mock score giúp xác định kỹ năng ưu tiên thay vì chỉ nhìn XP hoặc streak.",
          icon: <BarChart3 size={24} />,
        },
      ]}
    />
  );
}
