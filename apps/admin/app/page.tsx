const navigation = [
  ["Tổng quan", "01"],
  ["Người dùng", "02"],
  ["Hành trình", "03"],
  ["Nhiệm vụ", "04"],
  ["Bằng chứng", "05"],
  ["Cộng đồng", "06"],
  ["Thương mại", "07"],
  ["Nội dung", "08"],
  ["Hệ thống", "09"],
];

const metrics = [
  { label: "Người dùng hoạt động", value: "—", note: "Chờ kết nối API" },
  { label: "Chiến dịch đang chạy", value: "—", note: "Chờ kết nối API" },
  { label: "Main Quest hôm nay", value: "—", note: "Chờ kết nối API" },
  { label: "Cảnh báo vận hành", value: "0", note: "Không có cảnh báo cục bộ" },
];

const modules = [
  {
    name: "Goal Engine",
    status: "Foundation",
    description: "Template, phiên bản, arc, quest và campaign.",
  },
  {
    name: "Identity & RBAC",
    status: "Planned",
    description: "Tài khoản, phiên đăng nhập, vai trò và quyền hạn.",
  },
  {
    name: "Notification Worker",
    status: "Foundation",
    description: "Queue, lịch nhắc và trạng thái giao thông báo.",
  },
  {
    name: "Commerce",
    status: "Disabled",
    description: "Subscription và payment chỉ bật sau legal review.",
  },
];

export default function AdminDashboard() {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">L</span>
          <div>
            <strong>LevelUp</strong>
            <small>ADMIN CONTROL</small>
          </div>
        </div>

        <nav aria-label="Điều hướng quản trị">
          {navigation.map(([label, number], index) => (
            <a className={index === 0 ? "nav-item active" : "nav-item"} href="#" key={label}>
              <span>{number}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className="environment-card">
          <span className="status-dot" />
          <div>
            <strong>Development</strong>
            <small>Dữ liệu cục bộ</small>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">OPERATIONS CENTER</p>
            <h1>Tổng quan hệ thống</h1>
          </div>
          <div className="topbar-actions">
            <button className="search-button" type="button">⌘ Tìm nhanh</button>
            <button className="avatar" type="button" aria-label="Mở tài khoản quản trị">AD</button>
          </div>
        </header>

        <section className="notice" aria-label="Trạng thái triển khai">
          <div>
            <strong>Panel nền đã sẵn sàng.</strong>
            <p>Dashboard hiện không dùng dữ liệu giả. Các chỉ số sẽ xuất hiện sau khi API và event tracking được nối.</p>
          </div>
          <span>PHASE 1</span>
        </section>

        <section className="metric-grid" aria-label="Chỉ số chính">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel large-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">MODULE MAP</p>
                <h2>Nền tảng vận hành</h2>
              </div>
              <button type="button">Xem kiến trúc</button>
            </div>

            <div className="module-list">
              {modules.map((module) => (
                <div className="module-row" key={module.name}>
                  <div>
                    <strong>{module.name}</strong>
                    <p>{module.description}</p>
                  </div>
                  <span className={`pill ${module.status.toLowerCase()}`}>{module.status}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="panel activity-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">SYSTEM HEALTH</p>
                <h2>Dịch vụ cục bộ</h2>
              </div>
            </div>
            <ul className="health-list">
              <li><span className="status-dot" />Web <small>:3000</small></li>
              <li><span className="status-dot" />Admin <small>:3001</small></li>
              <li><span className="status-dot muted" />API <small>:4000</small></li>
              <li><span className="status-dot muted" />Worker <small>BullMQ</small></li>
              <li><span className="status-dot muted" />PostgreSQL <small>:5432</small></li>
              <li><span className="status-dot muted" />Redis <small>:6379</small></li>
            </ul>
            <a className="text-link" href="http://localhost:4000/api/v1/health">Mở API health →</a>
          </aside>
        </section>
      </main>
    </div>
  );
}
