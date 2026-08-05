import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";

import { cn } from "../utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}

export function buttonClassName({
  variant = "primary",
  size = "md",
  block = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    block && "ui-button--block",
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      block = false,
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName({ variant, size, block, className })}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <span className="ui-button__spinner" aria-hidden="true" /> : null}
        <span className="ui-button__content">{children}</span>
      </button>
    );
  },
);

export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    {
      variant = "primary",
      size = "md",
      block = false,
      disabled = false,
      className,
      children,
      href,
      tabIndex,
      ...props
    },
    ref,
  ) {
    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={buttonClassName({ variant, size, block, className })}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        {...props}
      >
        <span className="ui-button__content">{children}</span>
      </a>
    );
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      size = "md",
      variant = "ghost",
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "ui-icon-button",
          `ui-icon-button--${variant}`,
          `ui-icon-button--${size}`,
          className,
        )}
        aria-label={label}
        title={label}
        {...props}
      >
        {children}
      </button>
    );
  },
);
