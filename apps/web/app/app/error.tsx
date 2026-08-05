"use client";

import { ErrorState } from "@levelup/ui";
import { CircleAlert } from "@levelup/ui/icons";

interface ClientErrorProps {
  reset: () => void;
}

export default function ClientError({ reset }: ClientErrorProps) {
  return (
    <ErrorState
      icon={<CircleAlert size={24} aria-hidden="true" />}
      title="Không thể tải dữ liệu học tập"
      description="Thử lại. Nếu lỗi tiếp tục xảy ra, hệ thống cần giữ request ID để support có thể kiểm tra thay vì che lỗi."
      action={{ label: "Thử lại", onClick: reset }}
      secondaryAction={{ label: "Về Hôm nay", href: "/app/hom-nay" }}
    />
  );
}
