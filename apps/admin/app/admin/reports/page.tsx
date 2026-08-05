import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminReportsPage() {
  return (
    <AdminResourceFoundation
      eyebrow="PRODUCT ANALYTICS"
      title="Báo cáo"
      description="Định nghĩa metric có cửa sổ thời gian, timezone và nguồn dữ liệu rõ ràng."
      permission="reports.read"
      capabilities={[
        "Activation, retention và quest completion theo cohort",
        "Progress breakdown theo goal category và learning language",
        "Usage Video Lab không trộn với payment success",
        "Export bất đồng bộ, giới hạn kích thước và được audit",
      ]}
    />
  );
}
