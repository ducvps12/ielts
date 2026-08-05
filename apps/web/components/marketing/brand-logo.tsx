import { Target } from "@levelup/ui/icons";

interface BrandLogoProps {
  href?: string;
  compact?: boolean;
}

export function BrandLogo({ href = "/", compact = false }: BrandLogoProps) {
  return (
    <a className="brand-logo" href={href} aria-label="LevelUp — Trang chủ">
      <span className="brand-logo__mark" aria-hidden="true">
        <Target size={20} strokeWidth={2.4} />
      </span>
      {compact ? null : (
        <span className="brand-logo__copy">
          <strong>LEVELUP</strong>
          <small>IELTS SYSTEM</small>
        </span>
      )}
    </a>
  );
}
