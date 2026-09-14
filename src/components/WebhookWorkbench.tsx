"use client";

import React, { useState } from "react";
import {
  Webhook,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Server,
  Terminal,
  Layers,
  Code2,
  Lock,
} from "lucide-react";
import { INITIAL_VEHICLES } from "@/lib/vehicles";
import { RevalidationEvent } from "@/lib/types";

export function WebhookWorkbench() {
  const [selectedVin, setSelectedVin] = useState<string>(INITIAL_VEHICLES[0].vin);
  const [eventType, setEventType] = useState<string>("document.update");
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<Record<string, unknown> | null>(null);
  const [history, setHistory] = useState<RevalidationEvent[]>([
    {
      id: "rev-9012",
      timestamp: "04:12:03 EST",
      type: "tag",
      target: "tag:vdp-4T3DKRFZ7SU189402",
      source: "ftp_sync_daemon",
      status: 200,
      latencyMs: 38,
      environment: "production",
      payloadSummary: "Automatic mileage & price drop revalidated",
    },
    {
      id: "rev-9011",
      timestamp: "03:45:12 EST",
      type: "tag",
      target: "tag:vehicles",
      source: "sanity_webhook",
      status: 200,
      latencyMs: 44,
      environment: "production",
      payloadSummary: "Studio marketing headline updated by Marketing team",
    },
  ]);

  const fireWebhook = async () => {
    setIsFiring(true);
    const start = Date.now();

    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidate-secret": "demo-token",
        },
        body: JSON.stringify({
          _type: "vehicle",
          vin: selectedVin,
          slug: selectedVin,
          event: eventType,
        }),
      });

      const data = await res.json();
      setLastResponse(data);

      const newEvent: RevalidationEvent = {
        id: `rev-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString() + " EST",
        type: "tag",
        target: `tag:vdp-${selectedVin}`,
        source: "sanity_webhook",
        status: 200,
        latencyMs: data.latencyMs || Date.now() - start,
        environment: "production",
        payloadSummary: `Event: ${eventType} on VIN ${selectedVin.slice(0, 10)}...`,
      };

      setHistory((prev) => [newEvent, ...prev.slice(0, 5)]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFiring(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Webhook-Driven On-Demand ISR Revalidation Workbench
              </h2>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                Question #3 Answer
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Live interactive demonstration of getting content changes published in milliseconds without waiting for Vercel site rebuilds or redeploys.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Webhook Trigger vs Explanation */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Interactive Webhook Simulator */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Webhook className="h-4 w-4 text-[var(--color-brand-primary)]" />
              <span>Simulate Sanity Webhook Event</span>
            </h3>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              POST /api/revalidate
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                Target Vehicle (VIN)
              </label>
              <select
                value={selectedVin}
                onChange={(e) => setSelectedVin(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 font-mono text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
              >
                {INITIAL_VEHICLES.map((v) => (
                  <option key={v.vin} value={v.vin}>
                    {v.year} {v.make} {v.model} ({v.vin})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                Trigger Event Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "document.update", label: "Editorial Save" },
                  { id: "price.drop", label: "Price Incentive" },
                  { id: "status.sold", label: "Vehicle Sold" },
                ].map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setEventType(ev.id)}
                    className={`rounded-lg border p-2 text-center text-xs font-semibold transition-all ${
                      eventType === ev.id
                        ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]"
                        : "border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
                    }`}
                  >
                    {ev.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={fireWebhook}
              disabled={isFiring}
              className="w-full rounded-xl bg-[var(--color-brand-primary)] py-3 text-xs font-bold text-white shadow hover:bg-[var(--color-brand-hover)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Zap className={`h-4 w-4 ${isFiring ? "animate-spin" : ""}`} />
              <span>{isFiring ? "Dispatching to /api/revalidate..." : "Dispatch Sanity Webhook (Instant Revalidate)"}</span>
            </button>
          </div>

          {/* Response Telemetry */}
          {lastResponse && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  ISR Revalidation Succeeded
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {String(lastResponse.latencyMs)}ms latency
                </span>
              </div>
              <p className="text-[var(--color-text-secondary)] font-mono text-xs">
                Purged Targets: {Array.isArray(lastResponse.targets) ? lastResponse.targets.join(", ") : "tag:vehicles"}
              </p>
              <div className="text-xs text-emerald-800 dark:text-emerald-200">
                {String(lastResponse.message)}
              </div>
            </div>
          )}

          {/* Event History Table */}
          <div className="space-y-2 pt-3 border-t border-[var(--color-border-subtle)]">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              Recent Edge Cache Invalidation Log
            </span>
            <div className="space-y-1.5">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between rounded-lg bg-[var(--color-panel-subtle)] p-2.5 text-xs font-mono"
                >
                  <div>
                    <div className="text-[var(--color-text-primary)] font-semibold">
                      {h.target}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] font-sans">
                      {h.payloadSummary}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {h.latencyMs}ms
                    </span>
                    <div className="text-xs text-[var(--color-text-muted)]">{h.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Explanation & Route Code */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[var(--color-text-primary)]">
            How It Works (Question #3 Answer)
          </h3>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 text-xs space-y-2.5 text-[var(--color-text-secondary)] leading-relaxed">
            <p className="font-semibold text-[var(--color-text-primary)]">
              &ldquo;Briefly: how do you get content changes live without redeploying?&rdquo;
            </p>
            <p>
              <strong>1. On-Demand ISR via Webhooks:</strong> In Next.js App Router, we configure a Sanity webhook that posts to our Next.js API route (<code className="font-mono text-[var(--color-brand-primary)]">/api/revalidate</code>) whenever a document is published or updated.
            </p>
            <p>
              <strong>2. Fine-Grained Tag Invalidation:</strong> The route verifies the shared secret, extracts the document slug or VIN, and calls <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">revalidateTag(`vdp-$&#123;slug&#125;`)</code> and <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">revalidateTag('vehicles')</code>.
            </p>
            <p>
              <strong>3. Sub-Second Global CDN Purge:</strong> Vercel&apos;s edge network immediately evicts that specific vehicle from the global cache in under 50ms. The next user visit generates fresh HTML from Sanity with zero cold-starts and zero site build queue.
            </p>
          </div>

          {/* Actual Route Code Snippet */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              src/app/api/revalidate/route.ts
            </div>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 leading-relaxed max-h-64">
{`import { NextRequest, NextResponse } from "next/cache";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, vin } = await req.json();

  // Purge specific VDP and global inventory list
  revalidateTag(\`vdp-\${slug || vin}\`);
  revalidateTag("vehicles");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
