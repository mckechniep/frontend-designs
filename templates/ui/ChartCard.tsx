/**
 * ChartCard — Recharts chart wrapper component
 *
 * Usage:
 *   import { ChartCard } from "./ChartCard";
 *   import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
 *
 *   <ChartCard title="Revenue" description="Monthly revenue over time">
 *     <AreaChart data={data}>
 *       <XAxis dataKey="month" />
 *       <YAxis />
 *       <Tooltip />
 *       <Area type="monotone" dataKey="revenue" fill="#8b5cf6" fillOpacity={0.1} stroke="#8b5cf6" />
 *     </AreaChart>
 *   </ChartCard>
 *
 * Also works with BarChart, LineChart, PieChart, etc.
 * The component wraps children in a ResponsiveContainer (per recharts-rules.md).
 *
 * Props:
 *   - title: card heading
 *   - description: optional subtitle
 *   - children: a Recharts chart element (without ResponsiveContainer — it's added here)
 *   - height: chart height in px (default 300)
 *   - loading: show skeleton state
 *   - empty: show empty state
 *   - error: show error message
 */

import { type ReactNode } from "react";
import { ResponsiveContainer } from "recharts";

/* ── Props ────────────────────────────────────────────────── */
interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  height?: number;
  loading?: boolean;
  empty?: boolean;
  error?: string;
  className?: string;
}

/* ── Component ────────────────────────────────────────────── */
export function ChartCard({
  title,
  description,
  children,
  height = 300,
  loading = false,
  empty = false,
  error,
  className,
}: ChartCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/[.08] bg-white/[.03] p-6 shadow-md backdrop-blur-xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>

      {/* Chart area */}
      <div style={{ height }} aria-label={`${title} chart`} role="img">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-4 w-48 animate-pulse rounded bg-white/5" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-sm text-red-400">
            {error}
          </div>
        ) : empty ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {children as React.ReactElement}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ChartCard;
