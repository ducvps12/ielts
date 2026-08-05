import type {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
} from "react";

import { cn } from "../utils/cn";
import { EmptyState } from "./feedback";

export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="ui-table-scroll" tabIndex={0} role="region" aria-label="Bảng dữ liệu">
      <table className={cn("ui-table", className)} {...props} />
    </div>
  );
}

export interface DataTableColumn<Row extends object> {
  id: string;
  header: string;
  cell: (row: Row) => ReactNode;
  align?: "start" | "center" | "end";
  width?: string;
  hideOnMobile?: boolean;
}

export interface DataTableProps<Row extends object>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowId: (row: Row) => string;
  caption?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<Row extends object>({
  columns,
  rows,
  getRowId,
  caption,
  emptyTitle = "Chưa có dữ liệu",
  emptyDescription = "Dữ liệu sẽ xuất hiện tại đây khi hệ thống có bản ghi phù hợp.",
  className,
  ...props
}: DataTableProps<Row>) {
  if (rows.length === 0) {
    return (
      <div className={cn("ui-data-table ui-data-table--empty", className)} {...props}>
        <EmptyState
          compact
          title={emptyTitle}
          description={emptyDescription}
        />
      </div>
    );
  }

  return (
    <div className={cn("ui-data-table", className)} {...props}>
      <div
        className="ui-table-scroll"
        tabIndex={0}
        role="region"
        aria-label={caption ?? "Bảng dữ liệu"}
      >
        <table className="ui-table">
          {caption ? <caption>{caption}</caption> : null}
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={cn(
                    `ui-table__cell--${column.align ?? "start"}`,
                    column.hideOnMobile && "ui-table__cell--mobile-hidden",
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={getRowId(row)}>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      `ui-table__cell--${column.align ?? "start"}`,
                      column.hideOnMobile && "ui-table__cell--mobile-hidden",
                    )}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
