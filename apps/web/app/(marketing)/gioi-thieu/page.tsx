import type { Metadata } from "next";
import { LinkButton } from "@levelup/ui";
import { ShieldCheck, Target, Users } from "@levelup/ui/icons";

import { PublicContentPage } from "../../../components/marketing/public-content-page";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Tầm nhìn và nguyên tắc sản phẩm LevelUp IELTS.",
};

export default function AboutPage() {
  return (
    <PublicContentPage
      eyebrow="VỀ LEVELUP"
      title="Một hệ thống giúp người học tiếp tục, không chỉ bắt đầu."
      description="LevelUp được xây dựng cho người có mục tiêu nghiêm túc nhưng dễ mất đà khi kế hoạch quá mơ hồ hoặc quá tải."
      actions={<LinkButton href="/dang-ky">Tham gia bản thử nghiệm</LinkButton>}
      blocks={[
        {
          title: "Sứ mệnh",
          description:
            "Biến mục tiêu dài hạn thành hành động nhỏ, rõ ràng và có thể kiểm chứng mỗi ngày.",
          icon: <Target size={24} />,
        },
        {
          title: "Nguyên tắc",
          description:
            "Không hứa điểm đầu ra, không dùng hình phạt gây hại và không che giấu giới hạn của sản phẩm.",
          icon: <ShieldCheck size={24} />,
        },
        {
          title: "Cách phát triển",
          description:
            "Bắt đầu sâu với IELTS, kiểm chứng retention và kết quả học tập trước khi mở thêm hành trình.",
          icon: <Users size={24} />,
        },
      ]}
    />
  );
}
