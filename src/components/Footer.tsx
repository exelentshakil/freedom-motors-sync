"use client";

import React from "react";
import {
  ShieldCheck,
  Zap,
  Server,
  Code2,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-panel)] py-8 px-0 text-xs transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Tier: System Architecture Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-[var(--color-border-subtle)] pb-6">
          <div className="flex items-center gap-2.5">
            <Server className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
            <div>
              <div className="font-bold text-[var(--color-text-primary)]">Next.js 15.5 App Router</div>
              <div className="text-[var(--color-text-muted)]">On-Demand Edge ISR</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Layers className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <div className="font-bold text-[var(--color-text-primary)]">Sanity Studio & Content Lake</div>
              <div className="text-[var(--color-text-muted)]">Fieldset Locks & GROQ</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="h-4 w-4 text-amber-500 shrink-0" />
            <div>
              <div className="font-bold text-[var(--color-text-primary)]">04:00 AM FTPS Ingestion</div>
              <div className="text-[var(--color-text-muted)]">Atomic Excel Streamer</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-purple-500 shrink-0" />
            <div>
              <div className="font-bold text-[var(--color-text-primary)]">ADA Compliance Engine</div>
              <div className="text-[var(--color-text-muted)]">Wheelchair Fit Calculator</div>
            </div>
          </div>
        </div>

        {/* Middle Tier: Enterprise Verification & System Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--color-text-secondary)]">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-[var(--color-text-primary)]">
                Freedom Motors USA Architecture Suite
              </span>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Battle Creek, MI Inventory Integration
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              Engineered by Principal Systems Architect · 12+ Years Enterprise Systems Engineering · Former Lead Engineer at Legiit ($1M ARR Command Center)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Enterprise Partner
            </span>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Disclosures */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[var(--color-border-subtle)] pt-4 text-xs text-[var(--color-text-muted)]">
          <p>
            © {new Date().getFullYear()} Freedom Motors USA Migration Cockpit. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span>Edge TTFB: &lt;45ms</span>
            <span>•</span>
            <span>Cache Revalidation: &lt;50ms</span>
            <span>•</span>
            <span>FTPS Security: TLS 1.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
