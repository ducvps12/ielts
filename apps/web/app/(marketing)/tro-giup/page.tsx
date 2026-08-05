import type { Metadata } from "next";
import { Alert } from "@levelup/ui";
import { BookOpen, CircleAlert, MessageCircle, Settings } from "@levelup/ui/icons";

import { PublicContentPage } from "../../../components/marketing/public-content-page";

export const metadata: Metadata = {
  title: "Trợ giúp",
  description: "Trung tâm trợ giúp nền tảng LevelUp IELTS.",
};

export default function HelpPage() {
  return (
    <PublicContentPage
      eyebrow="TRUNG TÂM TRỢ GIÚP"
      title="Tìm câu trả lời trước khi bị kẹt."
      description="Help centre hiện là nền móng giao diện. Bài viết hỗ trợ chi tiết và quy trình ticket sẽ được nối với CMS và support module sau."
      note={
        <Alert
          tone="info"
          icon={<CircleAlert size={20} aria-hidden="true" />}
          title="Chưa có hệ thống ticket thật"
          description="Các mục dưới đây là cấu trúc điều hướng, không đại diện cho SLA hoặc kênh hỗ trợ đã vận hành."
        />
      }
      blocks={[
        {
          title: "Bắt đầu hành trình",
          description:
            "Hướng dẫn onboarding, baseline, lịch học và cách đọc nhiệm vụ hằng ngày.",
          icon: <BookOpen size={24} />,
          items: ["Tạo mục tiêu", "Chọn thời gian học", "Hiểu Main Quest"],
        },
        {
          title: "Tài khoản và cài đặt",
          description:
            "Phiên đăng nhập, thông báo, timezone, quyền riêng tư và khả năng truy cập.",
          icon: <Settings size={24} />,
          items: ["Đổi mật khẩu", "Tắt thông báo", "Yêu cầu xóa tài khoản"],
        },
        {
          title: "Liên hệ hỗ trợ",
          description:
            "Kênh hỗ trợ chính thức sẽ được công bố trước khi cohort beta bắt đầu.",
          icon: <MessageCircle size={24} />,
          items: ["Báo lỗi", "Góp ý sản phẩm", "Khiếu nại nội dung"],
        },
      ]}
    />
  );
}
