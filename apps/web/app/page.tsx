const journeys = [
  { title: "IELTS 7.5", detail: "180 ngày · 4 kỹ năng · checkpoint hằng tuần" },
  { title: "Học lập trình", detail: "Sắp ra mắt" },
  { title: "Xây thói quen", detail: "Sắp ra mắt" },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#">LEVELUP</a>
        <nav aria-label="Điều hướng chính">
          <a href="#journeys">Hành trình</a>
          <a href="#how">Cách hoạt động</a>
          <a href="#pricing">Bảng giá</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="/dang-nhap">Đăng nhập</a>
          <a className="button small" href="/dang-ky">Bắt đầu</a>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">HỆ ĐIỀU HÀNH CHO MỤC TIÊU ĐỜI THẬT</div>
        <h1>Đừng chỉ đặt mục tiêu.<br />Hãy nhận nhiệm vụ mỗi ngày.</h1>
        <p>LevelUp biến mục tiêu IELTS 7.5 thành một hành trình rõ ràng: hôm nay học gì, mất bao lâu, vì sao cần làm và tiến bộ đến đâu.</p>
        <div className="hero-actions">
          <a className="button" href="/dang-ky">Khởi tạo hành trình</a>
          <a className="button secondary" href="#how">Xem hệ thống hoạt động</a>
        </div>
        <div className="trust-row"><span>Không hứa band ảo</span><span>Thưởng phạt lành mạnh</span><span>Tối ưu cho điện thoại</span></div>
      </section>

      <section className="dashboard-preview" aria-label="Bản xem trước nhiệm vụ">
        <div className="preview-sidebar">
          <strong>LEVELUP</strong>
          <span className="active">Hôm nay</span><span>Hành trình</span><span>Lịch</span><span>Error Log</span><span>Tiến độ</span>
        </div>
        <div className="preview-main">
          <div className="preview-heading"><div><small>DAY 17 / 180</small><h2>Chào buổi sáng, Hunter.</h2></div><div className="streak">🔥 12 ngày</div></div>
          <article className="quest main-quest"><div><small>MAIN QUEST · 45 PHÚT</small><h3>Săn manh mối Reading</h3><p>Làm một passage Matching Headings trong 20 phút, sau đó chữa lỗi bằng Error Log.</p></div><button>Bắt đầu nhiệm vụ</button></article>
          <div className="quest-grid"><article className="quest"><small>SIDE QUEST</small><h3>Ghi 5 lỗi quan trọng</h3><p>+25 XP · +7 Gold</p></article><article className="quest"><small>BONUS QUEST</small><h3>10 collocations</h3><p>+15 XP · +5 Gold</p></article></div>
        </div>
      </section>

      <section id="how" className="section"><div className="section-heading"><span>HỆ THỐNG HÓA</span><h2>Từ “tao muốn thay đổi” đến việc cần làm ngay hôm nay.</h2></div><div className="steps"><article><b>01</b><h3>Chọn đích đến</h3><p>Đánh giá trình độ, thời gian rảnh và mốc muốn đạt.</p></article><article><b>02</b><h3>Nhận bản đồ hành trình</h3><p>Mục tiêu được chia thành Arc, checkpoint và nhiệm vụ nhỏ.</p></article><article><b>03</b><h3>Tiến bộ có bằng chứng</h3><p>Check-in, Error Log và mock test cho thấy tiến bộ thật.</p></article></div></section>

      <section id="journeys" className="section"><div className="section-heading"><span>JOURNEY LIBRARY</span><h2>Một nền tảng, nhiều hành trình thay đổi.</h2></div><div className="journey-grid">{journeys.map((journey) => <article key={journey.title} className="journey-card"><div className="journey-icon">↗</div><h3>{journey.title}</h3><p>{journey.detail}</p></article>)}</div></section>

      <section id="pricing" className="cta"><h2>Bắt đầu bằng một Main Quest.</h2><p>Không cần đợi có động lực. Hệ thống sẽ giúp mày biết bước tiếp theo.</p><a className="button light" href="/dang-ky">Tạo tài khoản miễn phí</a></section>

      <footer><div><strong>LEVELUP</strong><p>Biến mục tiêu đời thật thành nhiệm vụ mỗi ngày.</p></div><div><a href="/dieu-khoan-su-dung">Điều khoản</a><a href="/chinh-sach-rieng-tu">Quyền riêng tư</a><a href="/tro-giup">Trợ giúp</a></div><small>© 2026 LevelUp. Nội dung pháp lý đang chờ chuyên gia Việt Nam duyệt.</small></footer>
    </main>
  );
}
