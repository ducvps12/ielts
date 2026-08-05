import { AdminResourceFoundation } from "../../../components/admin-resource-foundation";

export default function AdminSettingsPage() {
  return (
    <AdminResourceFoundation
      eyebrow="PRODUCT CONFIGURATION"
      title="Cài đặt hệ thống"
      description="Quản lý typed settings và feature flags mà không sửa database thủ công."
      permission="settings.read"
      capabilities={[
        "Schema, default, scope và editor permission cho từng setting",
        "Preview diff, revision history và rollback",
        "Provider secret không được lưu như product setting",
        "Payment, marketplace và experimental features mặc định tắt",
      ]}
    />
  );
}
