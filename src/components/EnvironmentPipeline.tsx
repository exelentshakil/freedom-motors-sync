"use client";

import React, { useState } from "react";
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  Database,
  Server,
  ShieldCheck,
  Terminal,
  RefreshCw,
  GitBranch,
} from "lucide-react";

export function EnvironmentPipeline() {
  const [promotedStep, setPromotedStep] = useState<string>("idle");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[PIPELINE READY] Development, Staging, and Production datasets verified isolated.",
    "[SANITY PROMOTION] Schema version 2.4-hybrid locked across all environments.",
  ]);

  const simulatePromotion = (stage: string) => {
    setPromotedStep(stage);
    setConsoleLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] INITIATE: Promoting ${stage} -> Next Tier...`,
      `[${new Date().toLocaleTimeString()}] VALIDATE: Schema diff verified (0 breaking field changes).`,
      `[${new Date().toLocaleTimeString()}] DATASET: sanity dataset export -> import verified.`,
      `[${new Date().toLocaleTimeString()}] SUCCESS: Edge CDN cache primed for promoted dataset.`,
      ...prev,
    ]);

    setTimeout(() => setPromotedStep("idle"), 2400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Three-Tier Isolated Environment Architecture
              </h2>
              <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-400 border border-blue-500/30 whitespace-nowrap shrink-0">
                Dev • Staging • Production
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Complete isolation across databases, Sanity datasets, and environment variables with safe promotion workflows.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Columns: Dev -> Staging -> Live */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Tier 1: Development */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              1. Development
            </span>
            <GitBranch className="h-4 w-4 text-[var(--color-text-muted)]" />
          </div>

          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Local Dev & Feature Branches
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Rapid sandbox development with synthetic FTP feeds
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Sanity Dataset</span>
              <strong className="text-[var(--color-text-primary)]">freedom-dev</strong>
            </div>
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Database Layer</span>
              <strong className="text-[var(--color-text-primary)]">Supabase Dev Branch</strong>
            </div>
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Domain Scope</span>
              <strong className="text-[var(--color-text-primary)]">localhost:3000</strong>
            </div>
          </div>

          <button
            onClick={() => simulatePromotion("Dev to Staging")}
            disabled={promotedStep !== "idle"}
            className="w-full rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Promote to Staging</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Tier 2: Staging */}
        <div className="rounded-2xl border border-amber-500/30 bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              2. Staging / QA
            </span>
            <Layers className="h-4 w-4 text-amber-500" />
          </div>

          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Marketing & IT Approval Hub
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Exact replica of live data for VP review & campaign staging
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Sanity Dataset</span>
              <strong className="text-[var(--color-text-primary)]">freedom-staging</strong>
            </div>
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Database Layer</span>
              <strong className="text-[var(--color-text-primary)]">Supabase Staging Pool</strong>
            </div>
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Domain Scope</span>
              <strong className="text-[var(--color-text-primary)]">freedom-stage.vercel.app</strong>
            </div>
          </div>

          <button
            onClick={() => simulatePromotion("Staging to Production")}
            disabled={promotedStep !== "idle"}
            className="w-full rounded-lg bg-amber-500/10 border border-amber-500/30 py-2 text-xs font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Promote to Live Production</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Tier 3: Live Production */}
        <div className="rounded-2xl border border-emerald-500/30 bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              3. Live Production
            </span>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>

          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              freedommotors.com
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Live customer traffic • Daily 04:00 AM Cron • Global Edge CDN
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Sanity Dataset</span>
              <strong className="text-[var(--color-text-primary)]">freedom-production</strong>
            </div>
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Database Layer</span>
              <strong className="text-[var(--color-text-primary)]">HA Postgres Primary</strong>
            </div>
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block text-xs uppercase">Domain Scope</span>
              <strong className="text-[var(--color-text-primary)]">freedommotors.com</strong>
            </div>
          </div>

          <div className="rounded-lg bg-emerald-500/10 p-2 text-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
            ✓ 99.99% Uptime & Sentry Watchdog Guarded
          </div>
        </div>
      </div>

      {/* Promotion Command Reference */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[var(--color-brand-primary)]" />
          <span>Sanity CLI Promotion & Dataset Sync Commands</span>
        </h3>
        <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 leading-relaxed">
{`# 1. Clone production dataset into staging for pre-launch testing
npx sanity dataset copy freedom-production freedom-staging --replace

# 2. Deploy updated schema definition to staging
npx sanity graphql deploy --dataset freedom-staging

# 3. Promote approved schema to live production with zero downtime
npx sanity graphql deploy --dataset freedom-production`}
        </pre>
      </div>
    </div>
  );
}
