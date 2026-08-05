import { EmptyState } from "@levelup/ui";
import { Search } from "@levelup/ui/icons";

export default function ClientNotFound() {
  return (
    <EmptyState
      icon={<Search size={24} aria-hidden="true" />}
      title="Không tìm thấy nội dung"
      description="Nhiệm vụ hoặc route có thể chưa được mở, đã hết hạn hoặc không thuộc campaign hiện tại."
      action={{ label: "Về Hôm nay", href: "/app/hom-nay" }}
      secondaryAction={{ label: "Xem nhiệm vụ", href: "/app/nhiem-vu" }}
    />
  );
}
