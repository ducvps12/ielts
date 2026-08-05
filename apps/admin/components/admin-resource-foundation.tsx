import { Alert, Badge, Card, CardContent, EmptyState } from "@levelup/ui";
import { CircleAlert, FileText } from "@levelup/ui/icons";

export interface AdminResourceFoundationProps {
  eyebrow: string;
  title: string;
  description: string;
  capabilities: string[];
  permission: string;
}

export function AdminResourceFoundation({
  eyebrow,
  title,
  description,
  capabilities,
  permission,
}: AdminResourceFoundationProps) {
  return (
    <div className="admin-resource-page">
      <header className="admin-page-header">
        <div>
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Badge tone="warning">Foundation · chưa nối API</Badge>
      </header>

      <Alert
        tone="info"
        icon={<CircleAlert size={20} aria-hidden="true" />}
        title="Không có mutation hoặc dữ liệu production giả"
        description={`Route đã sẵn sàng cho permission ${permission}. Mọi thao tác ghi sẽ cần xác nhận, API authorization và audit log.`}
      />

      <Card className="admin-resource-foundation-card">
        <CardContent>
          <div className="admin-resource-foundation-card__heading">
            <FileText size={24} aria-hidden="true" />
            <div>
              <h2>Phạm vi giao diện tiếp theo</h2>
              <p>Các capability được khóa thành hợp đồng trước khi nối domain service.</p>
            </div>
          </div>
          <ul className="admin-resource-capabilities">
            {capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <EmptyState
        compact
        title="Chưa có dữ liệu để hiển thị"
        description="Khi API read-only và permission guard được triển khai, bảng, bộ lọc, phân trang và trạng thái lỗi sẽ xuất hiện tại đây."
      />
    </div>
  );
}
