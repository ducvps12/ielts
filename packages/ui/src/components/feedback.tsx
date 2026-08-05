import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/cn";
import { Button, type ButtonProps } from "./actions";

export type FeedbackTone = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: FeedbackTone;
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function Alert({
  tone = "info",
  title,
  description,
  icon,
  action,
  className,
  role,
  ...props
}: AlertProps) {
  return (
    <div
      className={cn("ui-alert", `ui-alert--${tone}`, className)}
      role={role ?? (tone === "danger" ? "alert" : "status")}
      {...props}
    >
      {icon ? <span className="ui-alert__icon">{icon}</span> : null}
      <div className="ui-alert__body">
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="ui-alert__action">{action}</div> : null}
    </div>
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function Skeleton({
  width,
  height,
  rounded = false,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn("ui-skeleton", rounded && "ui-skeleton--rounded", className)}
      style={{ width, height }}
      aria-hidden="true"
      {...props}
    />
  );
}

interface StateAction {
  label: string;
  onClick?: ButtonProps["onClick"];
  href?: string;
}

export interface StatePanelProps extends HTMLAttributes<HTMLElement> {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: StateAction;
  secondaryAction?: StateAction;
  compact?: boolean;
}

function StateActions({
  action,
  secondaryAction,
}: Pick<StatePanelProps, "action" | "secondaryAction">) {
  if (!action && !secondaryAction) {
    return null;
  }

  return (
    <div className="ui-state__actions">
      {action ? (
        action.href ? (
          <a className="ui-button ui-button--primary ui-button--md" href={action.href}>
            <span className="ui-button__content">{action.label}</span>
          </a>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        )
      ) : null}
      {secondaryAction ? (
        secondaryAction.href ? (
          <a
            className="ui-button ui-button--outline ui-button--md"
            href={secondaryAction.href}
          >
            <span className="ui-button__content">{secondaryAction.label}</span>
          </a>
        ) : (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )
      ) : null}
    </div>
  );
}

function StatePanel({
  tone,
  icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  className,
  role,
  ...props
}: StatePanelProps & { tone?: "error"; role?: "alert" }) {
  return (
    <section
      className={cn(
        "ui-state",
        tone === "error" && "ui-state--error",
        compact && "ui-state--compact",
        className,
      )}
      aria-label={title}
      role={role}
      {...props}
    >
      {icon ? <div className="ui-state__icon">{icon}</div> : null}
      <h2>{title}</h2>
      <p>{description}</p>
      <StateActions action={action} secondaryAction={secondaryAction} />
    </section>
  );
}

export function EmptyState(props: StatePanelProps) {
  return <StatePanel {...props} />;
}

export function ErrorState(props: StatePanelProps) {
  return <StatePanel tone="error" role="alert" {...props} />;
}

export interface PermissionDeniedProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
}

export function PermissionDenied({
  title = "Bạn không có quyền truy cập",
  description = "Tài khoản hiện tại không được phép xem hoặc thao tác với nội dung này.",
  className,
  ...props
}: PermissionDeniedProps) {
  return (
    <section
      className={cn("ui-state", "ui-state--permission", className)}
      aria-label={title}
      {...props}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  tone?: FeedbackTone;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function Toast({
  tone = "info",
  title,
  description,
  action,
  className,
  ...props
}: ToastProps) {
  return (
    <div
      className={cn("ui-toast", `ui-toast--${tone}`, className)}
      role={tone === "danger" ? "alert" : "status"}
      aria-live={tone === "danger" ? "assertive" : "polite"}
      {...props}
    >
      <div>
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="ui-toast__action">{action}</div> : null}
    </div>
  );
}
