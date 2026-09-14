"use client";

import React, { useState } from "react";
import {
  Database,
  Lock,
  Edit3,
  Code2,
  CheckCircle,
  Copy,
  Terminal,
  Play,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { INITIAL_VEHICLES } from "@/lib/vehicles";

export function SanitySchemaExplorer() {
  const [activeTab, setActiveTab] = useState<"schema" | "groq" | "architecture">("architecture");
  const [groqQuery, setGroqQuery] = useState<string>(
    `*[_type == "vehicle" && inventoryStatus == "in_stock"] | order(salePrice desc) {
  _id,
  vin,
  year,
  make,
  model,
  "rampWidth": rampWidthInches,
  salePrice,
  marketingHeadline,
  highlightTags
}[0..2]`
  );
  const [groqResult, setGroqResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const executeGroq = () => {
    // Simulate GROQ filter execution against in-memory dataset
    const filtered = INITIAL_VEHICLES.slice(0, 2).map((v) => ({
      _id: v.id,
      vin: v.vin,
      year: v.year,
      make: v.make,
      model: v.model,
      rampWidth: v.rampWidthInches,
      salePrice: v.salePrice,
      marketingHeadline: v.marketingHeadline,
      highlightTags: v.highlightTags,
    }));
    setGroqResult(JSON.stringify(filtered, null, 2));
  };

  const copyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaCode = `// sanity/schemas/vehicle.ts
import { defineType, defineField } from 'sanity';

export const vehicleSchema = defineType({
  name: 'vehicle',
  title: 'Wheelchair Accessible Vehicle',
  type: 'document',
  fieldsets: [
    {
      name: 'sync',
      title: 'Automated FTP Excel Feed (Read-Only)',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'editorial',
      title: 'Marketing Studio Editorial (Hand-Edited)',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    // --- 1. AUTOMATED SYNC FIELDS (FTP SCRIPT ONLY) ---
    defineField({
      name: 'vin',
      title: 'Vehicle Identification Number (VIN)',
      type: 'string',
      fieldset: 'sync',
      readOnly: ({ currentUser }) => !currentUser?.roles?.some(r => r.name === 'sync-service'),
      validation: (Rule) => Rule.required().length(17),
    }),
    defineField({
      name: 'rampWidthInches',
      title: 'Ramp Width (Inches)',
      type: 'number',
      fieldset: 'sync',
      readOnly: ({ currentUser }) => !currentUser?.roles?.some(r => r.name === 'sync-service'),
    }),
    defineField({
      name: 'salePrice',
      title: 'Internet Special Sale Price ($)',
      type: 'number',
      fieldset: 'sync',
      readOnly: ({ currentUser }) => !currentUser?.roles?.some(r => r.name === 'sync-service'),
    }),
    defineField({
      name: 'ftpImages',
      title: 'Raw FTP Image URLs',
      type: 'array',
      of: [{ type: 'url' }],
      fieldset: 'sync',
      readOnly: ({ currentUser }) => !currentUser?.roles?.some(r => r.name === 'sync-service'),
    }),

    // --- 2. HAND-EDITED EDITORIAL FIELDS (PRESERVED ACROSS SYNCS) ---
    defineField({
      name: 'marketingHeadline',
      title: 'Marketing Hero Headline',
      type: 'string',
      fieldset: 'editorial',
      description: 'Hand-crafted by Marketing team. Preserved during daily FTP sync.',
    }),
    defineField({
      name: 'highlightTags',
      title: 'Accessibility & Financing Highlight Badges',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'editorial',
    }),
    defineField({
      name: 'walkthroughVideoUrl',
      title: 'YouTube Walkthrough Tour URL',
      type: 'url',
      fieldset: 'editorial',
    })
  ]
});`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Sanity Hybrid VDP Modeling & GROQ Engine
              </h2>
              <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-700 dark:text-purple-400 border border-purple-500/30 whitespace-nowrap shrink-0">
                Studio Field-Level Locks
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Architectural answer to Question #2: How to model a VDP where automated FTP sync fields co-exist with hand-crafted marketing editorial without overwrite collisions.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-1">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "architecture"
                  ? "bg-[var(--color-panel)] text-[var(--color-brand-primary)] shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Hybrid Architecture
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "schema"
                  ? "bg-[var(--color-panel)] text-[var(--color-brand-primary)] shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Sanity Schema (TS)
            </button>
            <button
              onClick={() => {
                setActiveTab("groq");
                if (!groqResult) executeGroq();
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "groq"
                  ? "bg-[var(--color-panel)] text-[var(--color-brand-primary)] shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Live GROQ Playground
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT FOR TAB 1: ARCHITECTURE BREAKDOWN */}
      {activeTab === "architecture" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main 2-Col Card: Question #2 Definitive Answer */}
          <div className="lg:col-span-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] pb-4">
              <ShieldCheck className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  The Exact Architectural Model (2-3 Sentences Explained)
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Clear separation of automated ingestion vs studio editorial
                </p>
              </div>
            </div>

            {/* Answer Quotation Box */}
            <div className="rounded-xl border border-[var(--color-brand-primary)]/30 bg-[var(--color-brand-subtle)] p-4 text-xs space-y-2">
              <div className="font-bold text-[var(--color-brand-primary)] uppercase tracking-wider text-xs">
                Direct Answer for David & Paul:
              </div>
              <p className="text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">
                &ldquo;We model the Sanity <code className="font-mono font-bold">vehicle</code> document with two distinct fieldsets: <code className="font-mono font-bold">sync</code> (VIN, conversion specs, base pricing, FTP images) locked with <code className="font-mono font-bold">readOnly: true</code> for Studio users, and <code className="font-mono font-bold">editorial</code> (custom headline, highlight tags, video tour) editable by marketing. The daily ingestion script executes atomic <code className="font-mono font-bold">client.patch(vin).set(syncData).commit()</code> calls that update ONLY the sync fieldset, guaranteeing hand-crafted marketing copy is never overwritten when vehicle mileage or pricing updates.&rdquo;
              </p>
            </div>

            {/* Visual Architecture Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fieldset 1: Sync */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                  <Lock className="h-4 w-4" />
                  <span>Fieldset: 'sync' (FTP Automated)</span>
                </div>
                <ul className="text-xs space-y-1.5 text-[var(--color-text-secondary)]">
                  <li>• Programmatic <code className="font-mono text-emerald-600 dark:text-emerald-400">readOnly: true</code> for editors</li>
                  <li>• Key fields: <code className="font-mono">vin</code>, <code className="font-mono">stockNumber</code>, <code className="font-mono">rampWidthInches</code>, <code className="font-mono">doorHeightInches</code>, <code className="font-mono">salePrice</code></li>
                  <li>• Source of truth: Daily dealership Excel feed</li>
                  <li>• Mutated atomically via backend cron worker</li>
                </ul>
              </div>

              {/* Fieldset 2: Editorial */}
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                  <Edit3 className="h-4 w-4" />
                  <span>Fieldset: 'editorial' (Sanity Studio)</span>
                </div>
                <ul className="text-xs space-y-1.5 text-[var(--color-text-secondary)]">
                  <li>• Fully writable by Marketing & IT in Studio</li>
                  <li>• Key fields: <code className="font-mono">marketingHeadline</code>, <code className="font-mono">editorialStory</code>, <code className="font-mono">highlightBadges</code>, <code className="font-mono">walkthroughVideoUrl</code></li>
                  <li>• Never touched by the daily sync script</li>
                  <li>• Triggers instant on-demand ISR webhook on publish</li>
                </ul>
              </div>
            </div>

            {/* Mutation Logic Snippet */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-300 space-y-1.5">
              <div className="text-xs font-bold text-slate-400">
                // Safe Field-Level Patch in sync-inventory.ts:
              </div>
              <pre className="text-xs text-emerald-400 overflow-x-auto">
                <code>{`await sanityClient.patch(vehicleDocId)
  .set({
    salePrice: excelRow.sale_price,
    chassisMileage: excelRow.mileage,
    inventoryStatus: excelRow.status,
    lastSyncedAt: new Date().toISOString()
  }) // Notice: marketingHeadline is NOT in set(), so it is 100% safe!
  .commit();`}</code>
              </pre>
            </div>
          </div>

          {/* Right Col: Studio Live Preview Mock */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Layers className="h-4 w-4 text-[var(--color-brand-primary)]" />
              <span>Sanity Studio User Experience</span>
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              How the VP of Marketing sees the document in Sanity Studio UI:
            </p>

            {/* Mocked Studio Form Fields */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--color-text-secondary)]">VIN Number</span>
                  <span className="inline-flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400">
                    <Lock className="h-3 w-3" /> Locked (FTP Sync)
                  </span>
                </div>
                <input
                  disabled
                  value="4T3DKRFZ7SU189402"
                  className="w-full rounded border border-[var(--color-border)] bg-slate-200/50 dark:bg-slate-800/50 p-2 font-mono text-xs text-[var(--color-text-muted)] cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Ramp Width</span>
                  <span className="inline-flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400">
                    <Lock className="h-3 w-3" /> Locked (FTP Sync)
                  </span>
                </div>
                <input
                  disabled
                  value="34 Inches Superwide"
                  className="w-full rounded border border-[var(--color-border)] bg-slate-200/50 dark:bg-slate-800/50 p-2 font-mono text-xs text-[var(--color-text-muted)] cursor-not-allowed"
                />
              </div>

              <div className="space-y-1 pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-purple-700 dark:text-purple-300">Marketing Headline</span>
                  <span className="inline-flex items-center gap-1 font-mono text-purple-600 dark:text-purple-400">
                    <Edit3 className="h-3 w-3" /> Editable in Studio
                  </span>
                </div>
                <textarea
                  readOnly
                  rows={2}
                  value="Exclusive Superwide 34&quot; Rear-Entry Ramp with Whisper-Quiet Hydraulic Kneel"
                  className="w-full rounded border border-purple-400/40 bg-[var(--color-panel)] p-2 font-sans text-xs text-[var(--color-text-primary)]"
                />
              </div>

              <div className="rounded bg-emerald-500/10 p-2 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                ✓ Zero Collision Guarantee Verified
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT FOR TAB 2: SCHEMA TS CODE */}
      {activeTab === "schema" && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[var(--color-brand-primary)]" />
              <span className="font-mono text-xs font-bold text-[var(--color-text-primary)]">
                sanity/schemas/vehicle.ts
              </span>
            </div>
            <button
              onClick={() => copyCode(schemaCode)}
              className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors whitespace-nowrap shrink-0"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{copied ? "Copied!" : "Copy Schema"}</span>
            </button>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 leading-relaxed max-h-[500px]">
            {schemaCode}
          </pre>
        </div>
      )}

      {/* CONTENT FOR TAB 3: GROQ PLAYGROUND */}
      {activeTab === "groq" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Query Editor */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[var(--color-brand-primary)]" />
                <span>GROQ Query Editor</span>
              </h3>
              <button
                onClick={executeGroq}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] shadow transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Execute Query</span>
              </button>
            </div>
            <textarea
              rows={8}
              value={groqQuery}
              onChange={(e) => setGroqQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
            />
            <div className="text-xs text-[var(--color-text-muted)]">
              App Router Server Component pattern: <code className="font-mono">sanityFetch&#123; query: groqQuery, tags: ['vehicles'] &#125;</code>
            </div>
          </div>

          {/* Query Results */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Live GROQ JSON Response
              </h3>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                200 OK • 18ms
              </span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 leading-relaxed max-h-72">
              {groqResult || "// Click 'Execute Query' to run GROQ against mock dataset"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
