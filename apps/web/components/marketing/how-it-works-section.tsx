import { howItWorksSteps } from "../../data/demo/marketing";

export function HowItWorksSection() {
  return (
    <section
      className="marketing-section marketing-section--muted"
      aria-labelledby="how-it-works-title"
    >
      <div className="marketing-container">
        <div className="marketing-section-heading">
          <span className="marketing-eyebrow">TỪ MỤC TIÊU ĐẾN HÀNH ĐỘNG</span>
          <h2 id="how-it-works-title">Một quy trình đủ rõ để bắt đầu ngay.</h2>
          <p>
            Không cần tự thiết kế lịch học từ đầu. Hệ thống chuyển dữ liệu đầu vào
            thành hành trình có thứ tự và checkpoint.
          </p>
        </div>

        <ol className="marketing-steps">
          {howItWorksSteps.map((step) => (
            <li key={step.number}>
              <span className="marketing-steps__number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
