/**
 * DataTable — generic sortable/filterable table component
 *
 * Usage:
 *   import { DataTable } from "./DataTable";
 *
 *   const columns = [
 *     { key: "name", header: "Name", sortable: true },
 *     { key: "email", header: "Email" },
 *     { key: "role", header: "Role", sortable: true },
 *   ];
 *
 *   <DataTable columns={columns} data={users} searchable />
 *
 * Props:
 *   - columns: column config array (key, header, sortable, render)
 *   - data: row data array
 *   - onSort: optional external sort callback (overrides built-in sort)
 *   - searchable: show search/filter input
 *   - emptyState: custom empty state node
 *   - className: wrapper className
 *
 * Generic over row type <T> for type-safe column keys and render functions.
 * Tailwind-styled with striped/hover rows and horizontal scroll on mobile.
 */

import { useState, useMemo, type ReactNode } from "react";

/* ── Types ────────────────────────────────────────────────── */
interface Column<T> {
  /** Property key on the data object */
  key: keyof T & string;
  /** Display header text */
  header: string;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Custom cell renderer */
  render?: (value: T[keyof T], row: T) => ReactNode;
}

type SortDirection = "ascending" | "descending";

interface SortState<T> {
  key: keyof T & string;
  direction: SortDirection;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSort?: (key: keyof T & string, direction: SortDirection) => void;
  searchable?: boolean;
  emptyState?: ReactNode;
  className?: string;
}

/* ── Component ────────────────────────────────────────────── */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onSort,
  searchable = false,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T> | null>(null);
  const [search, setSearch] = useState("");

  /* ── Filter ──────────────────────────────────────────── */
  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, search, columns]);

  /* ── Sort ────────────────────────────────────────────── */
  const sorted = useMemo(() => {
    if (!sort || onSort) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];
      const aNum = typeof aVal === "number" ? aVal : parseFloat(String(aVal));
      const bNum = typeof bVal === "number" ? bVal : parseFloat(String(bVal));
      const numeric = !isNaN(aNum) && !isNaN(bNum);
      const cmp = numeric
        ? aNum - bNum
        : String(aVal ?? "").localeCompare(String(bVal ?? ""));
      return sort.direction === "ascending" ? cmp : -cmp;
    });
  }, [filtered, sort, onSort]);

  function handleSort(key: keyof T & string) {
    const direction: SortDirection =
      sort?.key === key && sort.direction === "ascending"
        ? "descending"
        : "ascending";
    setSort({ key, direction });
    onSort?.(key, direction);
  }

  const rows = sorted;
  const isEmpty = rows.length === 0;

  return (
    <div className={className}>
      {/* Search */}
      {searchable && (
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search table"
            className="w-full rounded-xl border border-white/[.08] bg-black/20 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/25 sm:max-w-xs"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/[.08] bg-white/[.03]">
        <table className="w-full border-collapse text-sm" aria-label="Data table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    col.sortable
                      ? sort?.key === col.key
                        ? sort.direction
                        : "none"
                      : undefined
                  }
                  className={[
                    "whitespace-nowrap border-b border-white/[.08] bg-white/[.02] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1 select-none text-left text-inherit hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
                    >
                      <span>{col.header}</span>
                      {sort?.key === col.key && (
                        <span className="text-[0.65em]">
                          {sort.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-white/[.04] transition-colors hover:bg-white/[.03] even:bg-white/[.01]"
              >
                {columns.map((col) => (
                  <td key={col.key} className="whitespace-nowrap px-4 py-3">
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {isEmpty && (
          <div className="px-4 py-12 text-center text-sm text-slate-500">
            {emptyState ?? "No data to display."}
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
