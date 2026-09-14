"use client";

import React, { useState } from "react";
import {
  Activity,
  Code2,
  Terminal,
  Send,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { DataLayerEvent } from "@/lib/types";

interface ThirdPartyHubProps {
  events?: DataLayerEvent[];
}

export function ThirdPartyHub({ events = [] }: ThirdPartyHubProps) {
  const [activePlatform, setActivePlatform] = useState<"gtm" | "meta" | "hubspot">("gtm");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Third-Party Analytics & Marketing Integrations
              </h2>
              <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-400 border border-blue-500/30 whitespace-nowrap shrink-0">
                GTM • GA4 • Meta CAPI • HubSpot
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Unified client and server-side marketing telemetry tracking vehicle views, wheelchair fit tests, and test-drive requests.
            </p>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-1">
            {[
              { id: "gtm", label: "Google Tag Manager (GTM)" },
              { id: "meta", label: "Meta Pixel & CAPI" },
              { id: "hubspot", label: "HubSpot Forms & CRM" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlatform(tab.id as any)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activePlatform === tab.id
                    ? "bg-[var(--color-panel)] text-[var(--color-brand-primary)] shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GTM DataLayer Live Stream */}
      {activePlatform === "gtm" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Live Stream */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Live window.dataLayer Event Feed
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Real events pushed from the Showroom, VDP, and Fit Calculator
                </p>
              </div>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                {events.length} Events Captured
              </span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {events.length > 0 ? (
                events.map((ev, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] p-3 text-xs space-y-1.5 font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--color-brand-primary)]">
                        event: &quot;{ev.event}&quot;
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {ev.timestamp}
                      </span>
                    </div>
                    <pre className="text-xs text-[var(--color-text-secondary)] overflow-x-auto bg-[var(--color-panel)] p-2 rounded border border-[var(--color-border-subtle)]">
                      {JSON.stringify(ev.payload, null, 2)}
                    </pre>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-[var(--color-text-muted)] rounded-xl border border-dashed border-[var(--color-border)]">
                  Click on vehicles or wheelchair widths in the Showroom tab to see live dataLayer events stream in here.
                </div>
              )}
            </div>
          </div>

          {/* GTM Integration Architecture */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              Next.js 15 App Router GTM Snippet
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Implemented using <code className="font-mono text-[var(--color-brand-primary)]">@next/third-parties/google</code> to guarantee zero LCP penalty and lazy loading behind Core Web Vitals critical path.
            </p>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 leading-relaxed">
{`// src/app/layout.tsx
import { GoogleTagManager } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleTagManager gtmId="GTM-FRDM982" />
      </body>
    </html>
  );
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Meta CAPI Tab */}
      {activePlatform === "meta" && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            Meta Conversions API (CAPI) Server-Side Bridge
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Bypasses iOS ad blockers by mirroring client-side Meta Pixel events via Edge Serverless Function to <code className="font-mono text-[var(--color-brand-primary)]">graph.facebook.com/v20.0/&#123;pixel_id&#125;/events</code>.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 leading-relaxed">
{`// Server-Side Meta CAPI Dispatch
await fetch(\`https://graph.facebook.com/v20.0/\${process.env.META_PIXEL_ID}/events\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        em: [sha256(contact.email)],
        ph: [sha256(contact.phone)],
      },
      custom_data: {
        currency: 'USD',
        value: vehicle.salePrice,
        content_name: \`\${vehicle.year} \${vehicle.make} \${vehicle.model}\`,
        content_category: 'Wheelchair Accessible Van'
      }
    }]
  })
});`}
          </pre>
        </div>
      )}

      {/* HubSpot Tab */}
      {activePlatform === "hubspot" && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            HubSpot Forms & Contact Lifecycle Pipeline
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Direct integration mapping website inquiries into HubSpot Deals & Contacts with mobility vehicle properties.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1">
              <strong className="text-[var(--color-text-primary)] block">Target VIN Mapping</strong>
              <p className="text-[var(--color-text-muted)] font-mono text-xs">
                hs_target_vehicle_vin
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1">
              <strong className="text-[var(--color-text-primary)] block">Mobility Requirement</strong>
              <p className="text-[var(--color-text-muted)] font-mono text-xs">
                hs_wheelchair_ramp_need
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1">
              <strong className="text-[var(--color-text-primary)] block">Assigned Specialist</strong>
              <p className="text-[var(--color-text-muted)] font-mono text-xs">
                hubspot_owner_id
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
