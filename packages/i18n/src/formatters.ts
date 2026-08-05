import type { UiLocale } from "./locales.js";

export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  timeZone?: string;
}

export function formatDate(
  value: Date | string | number,
  locale: UiLocale,
  options: FormatDateOptions = {},
): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError("Cannot format an invalid date");
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    ...options,
  }).format(date);
}

export function formatNumber(
  value: number,
  locale: UiLocale,
  options: Intl.NumberFormatOptions = {},
): string {
  if (!Number.isFinite(value)) {
    throw new TypeError("Cannot format a non-finite number");
  }

  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(
  amountMinor: number,
  currency: string,
  locale: UiLocale,
): string {
  if (!Number.isSafeInteger(amountMinor)) {
    throw new TypeError("Money must use integer minor units");
  }

  const normalizedCurrency = currency.toLocaleUpperCase();
  if (!/^[A-Z]{3}$/.test(normalizedCurrency)) {
    throw new TypeError("Currency must be a three-letter ISO code");
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: normalizedCurrency,
  });
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2;

  return formatter.format(amountMinor / 10 ** fractionDigits);
}

export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: UiLocale,
): string {
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
    value,
    unit,
  );
}
