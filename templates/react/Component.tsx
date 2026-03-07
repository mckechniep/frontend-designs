/**
 * Component Template — reusable React component with TypeScript + Tailwind
 *
 * Usage:
 *   1. Rename this file to match your component (e.g., Card.tsx)
 *   2. Update the Props interface and default className
 *   3. Replace the placeholder markup with your component's content
 *   4. Import: import { Component } from "./Component"
 *
 * Patterns:
 *   - forwardRef for DOM access and composition
 *   - className merging via cn() utility (install: npm i clsx tailwind-merge)
 *   - Variants through conditional classes, not separate components
 *   - Tailwind utility classes only — no inline styles
 */

import { forwardRef, type ComponentPropsWithoutRef } from "react";

/* ── Utility: className merger ────────────────────────────── */
/* Replace with your project's cn() import if you have one:
   import { cn } from "@/lib/utils"                           */
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ── Props ────────────────────────────────────────────────── */
type Variant = "default" | "outline" | "ghost";

interface ComponentProps extends ComponentPropsWithoutRef<"div"> {
  /** Visual variant */
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  default:
    "bg-white/[.03] border border-white/[.08] shadow-md backdrop-blur-xl",
  outline:
    "border border-white/[.12] bg-transparent",
  ghost:
    "bg-transparent border-transparent",
};

/* ── Component ────────────────────────────────────────────── */
export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = "default", className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "rounded-2xl p-6 transition-shadow duration-200",
        // Variant
        variantStyles[variant],
        // Hover
        "hover:shadow-lg",
        // Consumer overrides
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

Component.displayName = "Component";

export default Component;
