"use client";

import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { X } from "../icons";
import { cn } from "../utils/cn";
import { IconButton } from "./actions";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
}

export function Tooltip({
  content,
  children,
  placement = "top",
  className,
  ...props
}: TooltipProps) {
  const tooltipId = useId();

  return (
    <span className={cn("ui-tooltip", className)} {...props}>
      <span className="ui-tooltip__trigger" aria-describedby={tooltipId} tabIndex={0}>
        {children}
      </span>
      <span
        id={tooltipId}
        className={cn("ui-tooltip__content", `ui-tooltip__content--${placement}`)}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownProps {
  label: string;
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
}

export function Dropdown({
  label,
  trigger,
  items,
  align = "end",
}: DropdownProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function close(): void {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }

  return (
    <details ref={detailsRef} className="ui-dropdown">
      <summary aria-label={label}>{trigger}</summary>
      <div className={cn("ui-dropdown__menu", `ui-dropdown__menu--${align}`)} role="menu">
        {items.map((item) => {
          const itemClassName = cn(
            "ui-dropdown__item",
            item.destructive && "ui-dropdown__item--destructive",
          );

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.disabled ? undefined : item.href}
                className={itemClassName}
                role="menuitem"
                aria-disabled={item.disabled || undefined}
                tabIndex={item.disabled ? -1 : 0}
                onClick={close}
              >
                {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
                <span>{item.label}</span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              className={itemClassName}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onSelect?.();
                close();
              }}
            >
              {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </details>
  );
}

interface OverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
}

function useDialogState(
  open: boolean,
  onOpenChange: (open: boolean) => void,
) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }

    const handleClose = () => onOpenChange(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onOpenChange]);

  return ref;
}

export interface DialogProps extends OverlayProps {
  size?: "sm" | "md" | "lg";
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  closeLabel = "Đóng hộp thoại",
  size = "md",
}: DialogProps) {
  const dialogRef = useDialogState(open, onOpenChange);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <dialog
      ref={dialogRef}
      className={cn("ui-dialog", `ui-dialog--${size}`)}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          onOpenChange(false);
        }
      }}
    >
      <div className="ui-dialog__surface">
        <header className="ui-dialog__header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          <IconButton label={closeLabel} onClick={() => onOpenChange(false)}>
            <X size={20} aria-hidden="true" />
          </IconButton>
        </header>
        <div className="ui-dialog__content">{children}</div>
        {footer ? <footer className="ui-dialog__footer">{footer}</footer> : null}
      </div>
    </dialog>
  );
}

export type DrawerSide = "left" | "right" | "bottom";

export interface DrawerProps extends OverlayProps {
  side?: DrawerSide;
}

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  closeLabel = "Đóng ngăn điều hướng",
  side = "right",
}: DrawerProps) {
  const dialogRef = useDialogState(open, onOpenChange);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <dialog
      ref={dialogRef}
      className={cn("ui-drawer", `ui-drawer--${side}`)}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          onOpenChange(false);
        }
      }}
    >
      <div className="ui-drawer__surface">
        <header className="ui-drawer__header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          <IconButton label={closeLabel} onClick={() => onOpenChange(false)}>
            <X size={20} aria-hidden="true" />
          </IconButton>
        </header>
        <div className="ui-drawer__content">{children}</div>
        {footer ? <footer className="ui-drawer__footer">{footer}</footer> : null}
      </div>
    </dialog>
  );
}
