"use client";

import React, { useState } from "react";
import { SyncAuditRecord } from "@/lib/types";
import {
  RefreshCw,
  FileSpreadsheet,
  Server,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  Layers,
  Database,
  Lock,
  Flame,
  Bell,
  Code,
} from "lucide-react";

interface SyncWatchdogCockpitProps {
  onTriggerSync?: (scenario: string) => Promise<SyncAuditRecord | null>;
  isSyncing?: boolean;
  latestAudit?: SyncAuditRecord | null;
}

export function SyncWatchdogCockpit({
  onTriggerSync,
  isSyncing = false,
  latestAudit = null,
}: SyncWatchdogCockpitProps = {}) {
  const [activeScenario, setActiveScenario] = useState<string>("daily_routine");
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [logConsole, setLogConsole] = useState<string[]>([
    `[04:00:01.012 EST] CRON_DAEMON: Scheduled trigger fired for freedom_inventory_daily.`,
    `[04:00:01.240 EST] FTP_HANDSHAKE: Connected to secure FTPS host (ftp.freedommotors.internal:21).`,
    `[04:00:02.180 EST] FILE_STREAM: Downloaded freedom_inventory_20260915_0400.xlsx (1.84 MB).`,
    `[04:00:02.410 EST] EXCEL_PARSE: 64 vehicle rows loaded into memory. VIN checksum: 100% valid.`,
    `[04:00:02.890 EST] SANITY_MUTATE: Executed atomic transaction with fieldset preservation.`,
    `[04:00:03.110 EST] WATCHDOG_PROBE: Sentry heartbeat received OK (Latency: 48ms).`,
    `[04:00:03.220 EST] ISR_DISPATCH: Revalidation webhook dispatched to /api/revalidate. Edge cache purged.`,
  ]);

  const runSync = async (scenario: string) => {
    setActiveScenario(scenario);
    setPipelineStep(1);

    setLogConsole((prev) => [
      `[${new Date().toLocaleTimeString()} EST] INGEST_START: Initiating scenario '${scenario}'...`,
      ...prev.slice(0, 15),
    ]);

    setTimeout(() => setPipelineStep(2), 300);
    setTimeout(() => setPipelineStep(3), 600);

    let audit: SyncAuditRecord | null = null;
    if (onTriggerSync) {
      audit = await onTriggerSync(scenario);
    } else {
      try {
        const res = await fetch("/api/sync/simulate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scenario }),
        });
        const data = await res.json();
        if (data.audit) audit = data.audit;
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(() => {
      setPipelineStep(4);
      if (audit) {
        setLogConsole((prev) => [
          `[${new Date().toLocaleTimeString()} EST] COMPLETE: Ingested ${audit.recordsRead} rows in ${audit.durationMs}ms. Added: ${audit.addedCount}, Updated: ${audit.updatedCount}, Sold: ${audit.soldCount}.`,
          `[${new Date().toLocaleTimeString()} EST] ISR_STATUS: Next.js edge tags purged in ${audit.revalidationLatencyMs}ms without redeploying.`,
          ...prev.slice(0, 15),
        ]);
      }
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Daily FTP Excel Inventory Ingestion & Watchdog
              </h2>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                Daemon Armed (04:00 AM EST)
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Autonomous background pipeline parsing raw dealership Excel files, generating atomic Sanity mutations, and purging edge cache without human intervention.
            </p>
          </div>

          {/* Quick Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => runSync("daily_routine")}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-primary)] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-brand-hover)] disabled:opacity-50 transition-all whitespace-nowrap shrink-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>Simulate 04:00 AM Cron</span>
            </button>
            <button
              onClick={() => runSync("new_arrival")}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors whitespace-nowrap shrink-0"
            >
              <span>+2 New Arrivals</span>
            </button>
            <button
              onClick={() => runSync("price_drop")}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors whitespace-nowrap shrink-0"
            >
              <span>-$2k Price Drops</span>
            </button>
          </div>
        </div>

        {/* 5-Step Visual Pipeline Canvas */}
        <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)]">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            End-to-End Autonomous Data Flow
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
            {[
              {
                step: 1,
                title: "1. Secure FTPS Fetch",
                detail: "Port 21 TLS • 04:00 AM Cron",
                icon: Server,
                active: isSyncing && pipelineStep >= 1,
              },
              {
                step: 2,
                title: "2. Streaming Excel Parser",
                detail: "exceljs • VIN Checksum",
                icon: FileSpreadsheet,
                active: isSyncing && pipelineStep >= 2,
              },
              {
                step: 3,
                title: "3. Sanity Diff & Lock",
                detail: "Preserves Hand-Edits",
                icon: Database,
                active: isSyncing && pipelineStep >= 3,
              },
              {
                step: 4,
                title: "4. Watchdog & Sentry",
                detail: "Dead-Man's Switch OK",
                icon: ShieldCheck,
                active: isSyncing && pipelineStep >= 3,
              },
              {
                step: 5,
                title: "5. Edge ISR Webhook",
                detail: "revalidateTag in <50ms",
                icon: Zap,
                active: isSyncing && pipelineStep >= 4,
              },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.step}
                  className={`relative rounded-xl border p-3.5 transition-all ${
                    node.active
                      ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-subtle)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-panel)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        node.active
                          ? "bg-[var(--color-brand-primary)] text-white animate-pulse"
                          : "bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-xs font-bold text-[var(--color-text-primary)]">
                      {node.title}
                    </div>
                  </div>
                  <div className="mt-2 font-mono text-xs text-[var(--color-text-muted)]">
                    {node.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* KPI Bento Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              Last Sync Batch
            </span>
            <Clock className="h-4 w-4 text-[var(--color-brand-primary)]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            {latestAudit ? latestAudit.batchId : "SYNC-FTP-420912"}
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-secondary)] font-mono">
            {latestAudit ? `${latestAudit.durationMs}ms runtime` : "162ms runtime"} • Status: 200 OK
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              Vehicles In Feed
            </span>
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            64 Total
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-secondary)] font-mono">
            Added: +{latestAudit?.addedCount ?? 1} | Updated: {latestAudit?.updatedCount ?? 2} | Sold: {latestAudit?.soldCount ?? 0}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              ISR Edge Invalidation
            </span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            {latestAudit ? `${latestAudit.revalidationLatencyMs}ms` : "42ms"}
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
            Zero Redeploy • Vercel CDN Purge
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              Editorial Preservation
            </span>
            <Lock className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
            100.0%
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-secondary)] font-mono">
            0 Studio Hand-Edits Overwritten
          </div>
        </div>
      </div>

      {/* Two-Column Cockpit: Ingestion Audit Diffs vs Watchdog Telemetry */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Audit Diff Table */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Active Batch Diff Log
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Field-level differences detected during Excel spreadsheet ingestion
              </p>
            </div>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              Deterministic Math Check
            </span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {latestAudit?.diffSummary && latestAudit.diffSummary.length > 0 ? (
              latestAudit.diffSummary.map((diff, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] p-3 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--color-text-primary)]">
                      {diff.model}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-xs font-bold uppercase ${
                        diff.changeType === "NEW_INSERT"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : diff.changeType === "PRICE_CHANGE"
                          ? "bg-blue-500/10 text-blue-700 dark:text-blue-300"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {diff.changeType}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[var(--color-text-muted)]">
                    VIN: {diff.vin}
                  </div>
                  <p className="text-[var(--color-text-secondary)]">{diff.detail}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] p-4 text-xs text-[var(--color-text-secondary)] space-y-1">
                <div className="font-bold text-[var(--color-text-primary)]">
                  2026 Toyota Sienna Hybrid XLE Superwide
                </div>
                <div className="font-mono text-xs text-[var(--color-text-muted)]">
                  VIN: 4T3DKRFZ7SU189402 • SPEC_UPDATE
                </div>
                <p>
                  Mileage updated from 60 to 85 mi. Sale price verified. All 4 marketing highlight tags and headline preserved in Sanity dataset without collision.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Real-Time Sentry Watchdog & Live Terminal */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Sync Watchdog & Sentry Telemetry Console
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Dead-man switch monitor alerting VP of Marketing & IT if daily FTP feed stalls
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Sentry Active
              </span>
            </div>
          </div>

          {/* Watchdog Specs */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block">FTP Feed SLA:</span>
              <strong className="text-[var(--color-text-primary)] font-mono">04:30 AM EST Deadline</strong>
            </div>
            <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)]">
              <span className="text-[var(--color-text-muted)] block">Alert Routing:</span>
              <strong className="text-[var(--color-text-primary)] font-mono">Sentry + Slack #it-ops</strong>
            </div>
          </div>

          {/* Terminal Console */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300 space-y-1 max-h-56 overflow-y-auto">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800 pb-1 mb-1">
              <span>daemon://sync-worker-prod-01</span>
              <span>LIVE TAIL</span>
            </div>
            {logConsole.map((line, i) => (
              <div key={i} className="leading-relaxed">
                <span className="text-slate-500">&gt; </span>
                {line.includes("COMPLETE") || line.includes("OK") ? (
                  <span className="text-emerald-400">{line}</span>
                ) : line.includes("CRON") ? (
                  <span className="text-blue-400">{line}</span>
                ) : (
                  <span>{line}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
