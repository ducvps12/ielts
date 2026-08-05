import { Alert, Badge, Card } from "@levelup/ui";
import { ChevronDown, MessageCircle, ShieldCheck } from "@levelup/ui/icons";

import {
  faqs,
  socialProofPlaceholder,
} from "../../data/demo/marketing";

export function SocialProofSection() {
  return (
    <section
      className="marketing-section marketing-section--dark"
      aria-labelledby="social-proof-title"
    >
      <div className="marketing-container marketing-proof-layout">
        <div className="marketing-section-heading">
          <Badge tone="warning">{socialProofPlaceholder.label}</Badge>
          <h2 id="social-proof-title">Niềm tin phải đến từ dữ liệu thật.</h2>
          <p>
            LevelUp sẽ không dựng lời khen, số người dùng hoặc band score giả để làm
            đẹp landing page.
          </p>
        </div>

        <Card className="marketing-proof-card">
          <MessageCircle size={28} aria-hidden="true" />
          <blockquote>{socialProofPlaceholder.quote}</blockquote>
          <cite>{socialProofPlaceholder.attribution}</cite>
        </Card>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="marketing-section" aria-labelledby="faq-title">
      <div className="marketing-container marketing-faq-layout">
        <div className="marketing-section-heading">
          <span className="marketing-eyebrow">CÂU HỎI THƯỜNG GẶP</span>
          <h2 id="faq-title">Nói rõ trước khi người học bắt đầu.</h2>
          <p>
            Những giới hạn quan trọng phải được trình bày minh bạch, đặc biệt với
            điểm IELTS, nội dung chuyên môn và cơ chế thưởng phạt.
          </p>
          <Alert
            tone="info"
            icon={<ShieldCheck size={20} aria-hidden="true" />}
            title="Sản phẩm đang trong giai đoạn xây dựng"
            description="Nội dung học và kết quả đánh giá cần được chuyên gia IELTS kiểm duyệt trước khi mở rộng cho người dùng thật."
          />
        </div>

        <div className="marketing-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="marketing-faq-item">
              <summary>
                <span>{faq.question}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
