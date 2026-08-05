import type { Metadata } from "next";
import { Alert, Button, Input, Select, Textarea } from "@levelup/ui";
import { CircleAlert, MessageCircle } from "@levelup/ui/icons";

import { MarketingPageHero } from "../../../components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ và góp ý cho LevelUp IELTS.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <MarketingPageHero
        eyebrow="LIÊN HỆ"
        title="Góp ý để sản phẩm giải quyết đúng vấn đề."
        description="Biểu mẫu hiện chỉ là UI foundation. Dữ liệu chưa được gửi vì support API và chính sách xử lý dữ liệu chưa hoàn thiện."
      />

      <section className="public-content-section">
        <div className="marketing-container contact-layout">
          <div className="contact-layout__intro">
            <div className="public-content-card__icon" aria-hidden="true">
              <MessageCircle size={24} />
            </div>
            <h2>Kênh hỗ trợ đang được chuẩn bị</h2>
            <p>
              Trước khi mở cohort beta, LevelUp sẽ công bố email hỗ trợ, thời gian
              phản hồi dự kiến và quy trình xử lý khiếu nại.
            </p>
            <Alert
              tone="warning"
              icon={<CircleAlert size={20} aria-hidden="true" />}
              title="Không gửi dữ liệu nhạy cảm"
              description="Biểu mẫu bên cạnh đang bị vô hiệu hóa và không lưu nội dung."
            />
          </div>

          <form className="contact-form" aria-label="Biểu mẫu liên hệ chưa kích hoạt">
            <Input label="Họ và tên" name="name" disabled />
            <Input label="Email" name="email" type="email" disabled />
            <Select
              label="Chủ đề"
              name="topic"
              disabled
              placeholder="Chọn chủ đề"
              options={[
                { value: "feedback", label: "Góp ý sản phẩm" },
                { value: "bug", label: "Báo lỗi" },
                { value: "content", label: "Nội dung IELTS" },
              ]}
            />
            <Textarea label="Nội dung" name="message" disabled />
            <Button type="button" block disabled>
              Chưa mở gửi liên hệ
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
