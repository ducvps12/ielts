import { Skeleton } from "@levelup/ui";

export default function ClientLoading() {
  return (
    <div aria-busy="true" aria-label="Đang tải dữ liệu học tập">
      <div className="client-page-header">
        <div>
          <Skeleton width="9rem" height="0.75rem" />
          <Skeleton width="24rem" height="3rem" />
          <Skeleton width="36rem" height="1rem" />
        </div>
      </div>
      <div className="client-stat-grid">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} height="9.5rem" />
        ))}
      </div>
      <div className="client-section-gap">
        <Skeleton height="22rem" />
      </div>
    </div>
  );
}
