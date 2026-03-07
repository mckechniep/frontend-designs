/**
 * Layout Template — Next.js App Router root layout
 *
 * Usage:
 *   1. Place at app/layout.tsx (root) or app/<segment>/layout.tsx (nested)
 *   2. Update metadata (title, description) for your project
 *   3. Keep deterministic font setup:
 *      - Default to local/system stacks (no build-time network dependency).
 *      - Only use `next/font/google` when user explicitly asks and environment supports network access.
 *      - Prefer `next/font/local` for custom brand fonts committed in-repo.
 *   4. Add global providers (theme, auth, etc.) inside the body wrapper
 *
 * This is a Server Component by default.
 * Wrap interactive children (nav, theme toggle) in their own "use client" files.
 *
 * Tailwind: base styles applied via className on <body>.
 */

import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";

/* ── Fonts (deterministic, no network fetch) ───────────────── */
const rootFontVars: CSSProperties = {
  "--font-sans":
    '"Inter","Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Apple Color Emoji","Segoe UI Emoji",sans-serif',
  "--font-mono":
    '"IBM Plex Mono","SFMono-Regular",Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
};

/* ── Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "YourBrand",
    template: "%s | YourBrand",
  },
  description: "A short description of your application for SEO and social sharing.",
};

/* ── Layout ───────────────────────────────────────────────── */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={rootFontVars}>
      <body className="min-h-screen bg-[#06090f] font-[var(--font-sans)] text-slate-100 antialiased">
        {/* ── Header / Nav ────────────────────────────────── */}
        <header className="sticky top-0 z-20 border-b border-white/[.08] bg-[#06090f]/80 backdrop-blur-xl backdrop-saturate-[180%]">
          <div className="mx-auto flex min-h-[60px] max-w-5xl items-center justify-between px-5">
            <span className="text-lg font-bold">YourBrand</span>
            <nav className="flex items-center gap-5" aria-label="Primary">
              {/* Add navigation links here */}
              <a href="/" className="text-sm text-slate-400 hover:text-white">
                Home
              </a>
            </nav>
          </div>
        </header>

        {/* ── Page Content ────────────────────────────────── */}
        {children}

        {/* ── Footer ──────────────────────────────────────── */}
        <footer className="border-t border-white/5 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-400 sm:flex-row">
            <span>&copy; {new Date().getFullYear()} YourBrand</span>
            <nav aria-label="Footer" className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
