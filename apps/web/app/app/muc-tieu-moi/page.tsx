import type { Metadata } from "next";
import { Alert, Badge } from "@levelup/ui";
import { CircleAlert } from "@levelup/ui/icons";

import { GoalCreationForm } from "../../../components/client/goal-creation-form";

export const metadata: Metadata = {
  title: "Tạo mục tiêu mới",
  description:
    "Tạo mục tiêu ngôn ngữ, học tập, sự nghiệp hoặc phát triển cá nhân trong LevelUp.",
};

export default function CreateGoalPage() {
  return (
    <div>
      <header className="client-page-header">
        <div className="client-page-header__copy">
          <span>GOAL OPERATING SYSTEM</span>
          <h1>Tạo một mục tiêu thực sự thuộc về bạn.</h1>
          <p>
            IELTS chỉ là một template. LevelUp Core lưu kết quả bạn muốn đạt trước,
            sau đó mới ghép template hoặc xây journey riêng.
          </p>
        </div>
        <Badge tone="primary">Private by default</Badge>
      </header>

      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Đây là dữ liệu tài khoản thật"
        description="Bạn cần đăng nhập và có CSRF session hợp lệ. Goal được lưu vào PostgreSQL; campaign tự động chưa được tạo ở phase này."
      />

      <section className="goal-create-layout" aria-label="Tạo mục tiêu mới">
        <GoalCreationForm />
        <aside className="goal-create-guidance">
          <span>KHUNG MỤC TIÊU TỐT</span>
          <h2>Một goal rõ ràng trả lời bốn câu hỏi.</h2>
          <ol>
            <li><strong>Kết quả:</strong> Sau cùng bạn làm được việc gì?</li>
            <li><strong>Bằng chứng:</strong> Điều gì chứng minh bạn tiến bộ?</li>
            <li><strong>Giới hạn:</strong> Mỗi tuần bạn thật sự có bao nhiêu thời gian?</li>
            <li><strong>Thời hạn:</strong> Khi nào cần checkpoint hoặc hoàn thành?</li>
          </ol>
          <p>
            Không cam kết kết quả bên ngoài như band IELTS, doanh thu hay cân nặng.
            Hệ thống chỉ quản lý hành động, bằng chứng và tiến độ.
          </p>
        </aside>
      </section>
    </div>
  );
}
