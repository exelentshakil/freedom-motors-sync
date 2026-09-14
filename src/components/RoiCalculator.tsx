"use client";

import React, { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldCheck,
  Zap,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export function RoiCalculator() {
  const [fleetSize, setFleetSize] = useState(125);
  const [monthlyArrivals, setMonthlyArrivals] = useState(40);
  const [minutesSpentPerVehicle, setMinutesSpentPerVehicle] = useState(30);
  const [staffHourlyRate, setStaffHourlyRate] = useState(32);

  // Calculations
  const monthlyVehiclesHandled = monthlyArrivals + fleetSize * 0.4; // updates + new arrivals
  const monthlyHoursLegacy = (monthlyVehiclesHandled * minutesSpentPerVehicle) / 60;
  const monthlyHoursAutomated = (monthlyVehiclesHandled * 3) / 60; // only review AI draft headline/description
  const monthlyHoursSaved = monthlyHoursLegacy - monthlyHoursAutomated;
  const annualHoursSaved = monthlyHoursSaved * 12;
  const annualDollarSavings = annualHoursSaved * staffHourlyRate;

  // Stale inventory avoidance estimate
  const estimatedStaleInquiriesPrevented = Math.round(monthlyArrivals * 1.8 * 12);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[var(--color-border-subtle)] pb-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-[var(--color-brand-primary)]" />
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Migration ROI & Labor Efficiency Model
          </h2>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
          Quantifying the operational impact of migrating Freedom Motors USA from legacy WordPress manual entry to automated FTP synchronization and Sanity CMS.
        </p>
      </div>

      {/* Grid: Inputs on Left, Real-time Impact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters */}
        <div className="lg:col-span-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Dealership Variables
            </span>
            <span className="text-xs font-semibold text-[var(--color-brand-primary)]">
              Battle Creek, MI Fleet
            </span>
          </div>

          {/* Slider 1: Total Fleet Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Active Vehicle Inventory
              </span>
              <span className="font-mono font-bold text-[var(--color-brand-primary)]">
                {fleetSize} vehicles
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={300}
              step={5}
              value={fleetSize}
              onChange={(e) => setFleetSize(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
              <span>20</span>
              <span>150</span>
              <span>300</span>
            </div>
          </div>

          {/* Slider 2: Monthly New Arrivals */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Monthly Converted Arrivals
              </span>
              <span className="font-mono font-bold text-[var(--color-brand-primary)]">
                {monthlyArrivals} units/mo
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={120}
              step={5}
              value={monthlyArrivals}
              onChange={(e) => setMonthlyArrivals(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
              <span>10</span>
              <span>60</span>
              <span>120</span>
            </div>
          </div>

          {/* Slider 3: Minutes spent manual entering */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Manual Entry Time in WordPress
              </span>
              <span className="font-mono font-bold text-[var(--color-brand-primary)]">
                {minutesSpentPerVehicle} mins/unit
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={minutesSpentPerVehicle}
              onChange={(e) => setMinutesSpentPerVehicle(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
              <span>10m</span>
              <span>30m</span>
              <span>60m</span>
            </div>
          </div>

          {/* Slider 4: Hourly Wage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Marketing/Admin Staff Rate
              </span>
              <span className="font-mono font-bold text-[var(--color-brand-primary)]">
                ${staffHourlyRate}/hr
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={60}
              step={2}
              value={staffHourlyRate}
              onChange={(e) => setStaffHourlyRate(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
              <span>$20/hr</span>
              <span>$40/hr</span>
              <span>$60/hr</span>
            </div>
          </div>
        </div>

        {/* Right Column: Projected Impact Bento */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bento Card 1: Annual Labor Cost Saved */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Annual Direct Labor Savings
                </span>
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                ${Math.round(annualDollarSavings).toLocaleString()}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Eliminates repetitive manual typing of VINs, chassis specs, and wholesale prices into WordPress.
              </p>
            </div>

            {/* Bento Card 2: Staff Hours Recovered */}
            <div className="rounded-2xl border border-[var(--color-brand-primary)]/30 bg-[var(--color-brand-subtle)] p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--color-brand-primary)]">
                  Annual Hours Recovered
                </span>
                <Clock className="h-5 w-5 text-[var(--color-brand-primary)]" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-[var(--color-brand-primary)]">
                {Math.round(annualHoursSaved).toLocaleString()} hrs
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Reallocated directly to qualified customer consultations and wheelchair ramp fit assessments.
              </p>
            </div>
          </div>

          {/* Bento Comparison Table */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 space-y-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Before vs. After Migration Architecture
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Legacy WordPress */}
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Legacy WordPress (Current State)
                </div>
                <ul className="space-y-1.5 text-[var(--color-text-secondary)]">
                  <li>• Daily Excel feed manually transcribed by staff</li>
                  <li>• Batch imports wipe out custom marketing copy</li>
                  <li>• Sold vehicles remain live causing phone friction</li>
                  <li>• Page load latency averages 1,400ms – 2,200ms</li>
                  <li>• High risk of price discrepancies between floor & site</li>
                </ul>
              </div>

              {/* Modern Next.js + Sanity */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Modern Next.js 15 + Sanity Architecture
                </div>
                <ul className="space-y-1.5 text-[var(--color-text-secondary)]">
                  <li>• 04:00 AM automated cron FTPS streaming sync</li>
                  <li>• Strict fieldset isolation guarantees zero overwrite</li>
                  <li>• Sold status synced within 24h across all channels</li>
                  <li>• Edge cached VDPs load in &lt;45ms worldwide</li>
                  <li>• On-demand ISR updates content in &lt;50ms without rebuild</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
