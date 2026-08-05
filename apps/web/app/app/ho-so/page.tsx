import { ShieldCheck, User } from "@levelup/ui/icons";

import { ClientPlaceholderPage } from "../../../components/client/client-placeholder-page";

export default function ProfilePage() {
  return (
    <ClientPlaceholderPage
      eyebrow="LEARNER PROFILE"
      title="Hồ sơ"
      description="Thông tin cá nhân, mục tiêu hiện tại và mức chia sẻ dữ liệu được quản lý tại một nơi."
      icon={<User size={24} />}
      cards={[
        {
          title: "Thông tin học tập",
          description: "Mục tiêu, timezone, lịch học và trạng thái onboarding.",
          icon: <User size={24} />,
        },
        {
          title: "Quyền riêng tư",
          description: "Kiểm soát dữ liệu nào được chia sẻ với đội accountability.",
          icon: <ShieldCheck size={24} />,
        },
      ]}
    />
  );
}
