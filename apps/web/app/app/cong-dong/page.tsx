import { MessageCircle, Users } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function CommunityPage() {
  return (
    <ClientPlaceholderPage
      eyebrow="ACCOUNTABILITY"
      title="Cộng đồng"
      description="Không gian nhóm nhỏ để check-in, động viên và cùng hoàn thành Boss tuần mà không biến thành mạng xã hội vô tận."
      icon={<Users size={24} />}
      cards={[
        {
          title: "Đội học riêng tư",
          description: "Chia sẻ mức tiến độ theo quyền lựa chọn của từng thành viên.",
          icon: <Users size={24} />,
        },
        {
          title: "Check-in có mục đích",
          description: "Ưu tiên hành động và hỗ trợ, không tối ưu cho lượt tương tác.",
          icon: <MessageCircle size={24} />,
        },
      ]}
    />
  );
}
