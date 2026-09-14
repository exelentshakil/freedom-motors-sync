"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sliders,
  Send,
  X,
} from "lucide-react";
import { Vehicle } from "@/lib/types";
import { AiEnrichmentResult } from "@/lib/ai";

interface AiEnrichmentDrawerProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyEnrichment: (vehicleId: string, result: AiEnrichmentResult) => void;
}

export function AiEnrichmentDrawer({
  vehicle,
  isOpen,
  onClose,
  onApplyEnrichment,
}: AiEnrichmentDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [enrichment, setEnrichment] = useState<AiEnrichmentResult | null>(null);

  if (!isOpen || !vehicle) return null;

  const runAiEnrichment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/spec-enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle }),
      });
      const data = await res.json();
      if (data.success && data.enrichment) {
        setEnrichment(data.enrichment);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (enrichment && vehicle) {
      onApplyEnrichment(vehicle.id, enrichment);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                AI Spec Enricher & Marketing Copy Generator
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Dual-Provider Fallback (OpenAI gpt-4o-mini + Gemini 2.0 Flash)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Vehicle Specs Badge */}
        <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] p-3 text-xs space-y-1">
          <div className="font-bold text-[var(--color-text-primary)]">
            Target: {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
          </div>
          <div className="font-mono text-xs text-[var(--color-text-muted)]">
            VIN: {vehicle.vin} • Ramp: {vehicle.rampWidthInches}&quot; {vehicle.conversionType} • Floor Drop: {vehicle.floorDropInches}&quot;
          </div>
        </div>

        {/* Action Button if not yet run */}
        {!enrichment && !loading && (
          <div className="text-center py-6 space-y-3">
            <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto">
              Click below to pass raw FTP conversion measurements to real AI. Generates empathetic marketing headlines, ADA compliance ratings, and recommended wheelchair classes.
            </p>
            <button
              onClick={runAiEnrichment}
              className="rounded-xl bg-[var(--color-brand-primary)] px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-[var(--color-brand-hover)] transition-all inline-flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              <span>Generate AI Marketing & ADA Copy</span>
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="py-12 text-center space-y-3">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-brand-primary)] border-t-transparent" />
            <p className="text-xs font-semibold text-[var(--color-text-secondary)]">
              Executing dual-provider LLM inference (OpenAI ➔ Gemini fallback)...
            </p>
          </div>
        )}

        {/* Enrichment Results */}
        {enrichment && !loading && (
          <div className="space-y-4 text-xs">
            {/* Telemetry Badge */}
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-panel-subtle)] px-3 py-2 border border-[var(--color-border-subtle)] font-mono text-xs">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                PROVIDER: {enrichment.provider.toUpperCase()} ({enrichment.model})
              </span>
              <span className="text-[var(--color-text-muted)]">
                Latency: {enrichment.latencyMs}ms • Tokens: {enrichment.tokensUsed ?? "N/A"}
              </span>
            </div>

            {/* AI Marketing Headline */}
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 space-y-1">
              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">
                Sanity Studio marketingHeadline (Generated):
              </span>
              <p className="text-sm font-bold text-[var(--color-text-primary)] italic">
                &ldquo;{enrichment.headline}&rdquo;
              </p>
            </div>

            {/* AI Description */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-1">
              <span className="font-mono text-xs font-bold text-[var(--color-text-muted)] uppercase">
                Sanity Studio editorialDescription (Generated):
              </span>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {enrichment.description}
              </p>
            </div>

            {/* Highlight Badges */}
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-[var(--color-text-muted)] uppercase">
                Suggested Marketing Highlight Badges:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {enrichment.highlightTags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[var(--color-brand-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Wheelchairs */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-1">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                ADA Wheelchair Compatibility Classification:
              </span>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium">
                {enrichment.adaAssessment}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {enrichment.recommendedWheelchairTypes.map((c, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-900 dark:text-emerald-200"
                  >
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
              <button
                onClick={runAiEnrichment}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]"
              >
                Re-generate
              </button>
              <button
                onClick={handleApply}
                className="rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white hover:bg-[var(--color-brand-hover)] shadow"
              >
                Apply to Sanity Studio Draft
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
