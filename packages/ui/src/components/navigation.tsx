"use client";

import {
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { ChevronLeft, ChevronRight } from "../icons";
import { cn } from "../utils/cn";
import { IconButton } from "./actions";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel: string;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  ariaLabel,
}: TabsProps) {
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? "";
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const activeValue = value ?? internalValue;
  const baseId = useId();
  const activeItem = items.find((item) => item.id === activeValue) ?? items[0];

  function select(nextValue: string): void {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const enabledItems = items.filter((item) => !item.disabled);
    if (enabledItems.length === 0) {
      return;
    }

    const currentId = items[index]?.id;
    const enabledIndex = enabledItems.findIndex((item) => item.id === currentId);
    let nextIndex = enabledIndex;

    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledItems.length - 1;
    } else if (event.key === "ArrowRight") {
      nextIndex = (enabledIndex + 1 + enabledItems.length) % enabledItems.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (enabledIndex - 1 + enabledItems.length) % enabledItems.length;
    }

    const nextItem = enabledItems[nextIndex];
    if (!nextItem) {
      return;
    }

    select(nextItem.id);
    document.getElementById(`${baseId}-tab-${nextItem.id}`)?.focus();
  }

  return (
    <div className="ui-tabs">
      <div className="ui-tabs__list" role="tablist" aria-label={ariaLabel}>
        {items.map((item, index) => {
          const selected = item.id === activeItem?.id;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              className="ui-tabs__tab"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem ? (
        <div
          id={`${baseId}-panel-${activeItem.id}`}
          className="ui-tabs__panel"
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  ariaLabel?: string;
}

export function Breadcrumb({
  items,
  ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  return (
    <nav className="ui-breadcrumb" aria-label={ariaLabel}>
      <ol>
        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? "current"}`}>
            {item.href && !item.current ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current={item.current ? "page" : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  ariaLabel?: string;
}

function visiblePages(page: number, totalPages: number): number[] {
  const candidates = new Set([1, totalPages, page - 1, page, page + 1]);
  return [...candidates]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  getPageHref,
  ariaLabel = "Phân trang",
}: PaginationProps) {
  const safeTotal = Math.max(totalPages, 1);
  const safePage = Math.min(Math.max(page, 1), safeTotal);
  const pages = visiblePages(safePage, safeTotal);

  function renderPageButton(pageNumber: number, label?: ReactNode) {
    const current = pageNumber === safePage;
    const commonProps = {
      className: cn("ui-pagination__item", current && "ui-pagination__item--active"),
      "aria-current": current ? ("page" as const) : undefined,
      "aria-label": typeof label === "string" ? label : `Trang ${pageNumber}`,
    };

    if (getPageHref) {
      return (
        <a key={pageNumber} href={getPageHref(pageNumber)} {...commonProps}>
          {label ?? pageNumber}
        </a>
      );
    }

    return (
      <button
        key={pageNumber}
        type="button"
        {...commonProps}
        disabled={current}
        onClick={() => onPageChange?.(pageNumber)}
      >
        {label ?? pageNumber}
      </button>
    );
  }

  return (
    <nav className="ui-pagination" aria-label={ariaLabel}>
      <IconButton
        label="Trang trước"
        size="sm"
        disabled={safePage <= 1}
        onClick={() => onPageChange?.(safePage - 1)}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </IconButton>
      <div className="ui-pagination__pages">
        {pages.map((pageNumber, index) => {
          const previous = pages[index - 1];
          return (
            <span className="ui-pagination__group" key={pageNumber}>
              {previous && pageNumber - previous > 1 ? (
                <span className="ui-pagination__ellipsis" aria-hidden="true">…</span>
              ) : null}
              {renderPageButton(pageNumber)}
            </span>
          );
        })}
      </div>
      <IconButton
        label="Trang sau"
        size="sm"
        disabled={safePage >= safeTotal}
        onClick={() => onPageChange?.(safePage + 1)}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </IconButton>
    </nav>
  );
}
