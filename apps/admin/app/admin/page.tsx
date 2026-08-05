import { Alert, Card } from "@levelup/ui";
import { CircleAlert, LayoutDashboard } from "@levelup/ui/icons";

export default function AdminDashboardFoundationPage() {
  return (
    <div>
      <header className="admin-page-header">
        <div>
          <span>OPERATIONS CENTER</span>
          <h1>Tổng quan hệ thống</h1>
          <p>
            Dashboard shell đã được tách khỏi route. Metric thật sẽ chỉ xuất hiện
            khi có API aggregate, định nghĩa thời gian và permission phù hợp.
          </p>
        </div>
      </header>

      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Admin foundation — chưa nối business logic"
        description="Không có metric production giả hoặc mutation admin trong giao diện này."
      />

      <Card className="admin-foundation-card">
        <LayoutDashboard size={26} aria-hidden="true" />
        <h2>Shell quản trị đã sẵn sàng</h2>
        <p>
          Sidebar responsive, breadcrumb, command foundation, user menu và permission-aware
          navigation đã được đặt để triển khai dashboard và bảng dữ liệu ở commit kế tiếp.
        </p>
      </Card>
    </div>
  );
}
