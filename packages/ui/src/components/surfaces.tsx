import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../utils/cn";

export type CardTone = "default" | "muted" | "elevated" | "primary";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    tone = "default",
    interactive = false,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "ui-card",
        `ui-card--${tone}`,
        interactive && "ui-card--interactive",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ui-card__header", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ui-card__content", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ui-card__footer", className)} {...props} />;
}

export type BadgeTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({
  tone = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn("ui-badge", `ui-badge--${tone}`, className)}
      {...props}
    />
  );
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toLocaleUpperCase("vi"))
    .join("");
}

export function Avatar({
  name,
  src,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <span
      className={cn("ui-avatar", `ui-avatar--${size}`, className)}
      aria-label={name}
      {...props}
    >
      {src ? <img src={src} alt="" /> : <span aria-hidden="true">{getInitials(name)}</span>}
    </span>
  );
}

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
  size?: "sm" | "md";
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  className,
  ...props
}: ProgressProps) {
  const safeMax = Math.max(max, 1);
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percentage = Math.round((safeValue / safeMax) * 100);

  return (
    <div className={cn("ui-progress", className)} {...props}>
      <div className="ui-progress__label-row">
        <span>{label}</span>
        {showValue ? <span>{percentage}%</span> : null}
      </div>
      <progress
        className={cn("ui-progress__bar", `ui-progress__bar--${size}`)}
        max={safeMax}
        value={safeValue}
        aria-label={label}
      />
    </div>
  );
}

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  trend?: ReactNode;
}

export function StatCard({
  label,
  value,
  description,
  icon,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("ui-stat-card", className)} {...props}>
      <div className="ui-stat-card__topline">
        <span className="ui-stat-card__label">{label}</span>
        {icon ? <span className="ui-stat-card__icon">{icon}</span> : null}
      </div>
      <strong className="ui-stat-card__value">{value}</strong>
      {description || trend ? (
        <div className="ui-stat-card__meta">
          {description ? <span>{description}</span> : null}
          {trend ? <span>{trend}</span> : null}
        </div>
      ) : null}
    </Card>
  );
}
