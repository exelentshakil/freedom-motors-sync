"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  Car,
  RefreshCw,
  Sun,
  Moon,
  Database,
  Webhook,
  Layers,
  Code2,
  FileCode,
  Activity,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export type Environment = "production" | "staging" | "development";

export interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  onQuickSync: () => void;
  isSyncing: boolean;
}

export function Navbar({
  activeTab,
  setActiveTab,
  environment,
  setEnvironment,
  onQuickSync,
  isSyncing,
}: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [envDropdownOpen, setEnvDropdownOpen] = useState(false);

  const envColors = {
    production: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    staging: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
    development: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
  };

  const navItems = [
    { id: "showroom", label: "Showroom & VDP", icon: Car },
    { id: "sync", label: "FTP Sync Watchdog", icon: RefreshCw },
    { id: "sanity", label: "Sanity Hybrid Schema", icon: Database },
    { id: "webhooks", label: "ISR Revalidation", icon: Webhook },
    { id: "environments", label: "3-Tier Pipeline", icon: Layers },
    { id: "analytics", label: "GTM & Third-Party", icon: Activity },
    { id: "blueprints", label: "Blueprints & ROI", icon: FileCode },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-panel)]/95 backdrop-blur-md transition-colors">
      {/* Top Banner: Status & Context */}
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] px-4 py-1.5 text-xs text-[var(--color-text-secondary)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--color-text-primary)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Freedom Motors USA • Battle Creek, MI
            </span>
            <span className="hidden text-[var(--color-text-muted)] sm:inline">•</span>
            <span className="hidden font-mono text-[var(--color-text-muted)] sm:inline">
              Daily FTP Excel Ingestion Active (04:00 EST)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Core Web Vitals: 99/100 (0.38s LCP)
            </span>
            <span className="hidden text-[var(--color-text-muted)] md:inline">|</span>
            <span className="hidden text-xs text-[var(--color-text-secondary)] md:inline">
              Next.js 15 App Router + Sanity GROQ
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand & Environment Selector */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand-primary)] text-white shadow-sm">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[var(--color-text-primary)]">
                  FREEDOM MOTORS
                </span>
                <span className="rounded bg-[var(--color-brand-subtle)] px-1.5 py-0.5 text-xs font-semibold text-[var(--color-brand-primary)]">
                  USA
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Wheelchair Accessible Vehicle Platform
              </p>
            </div>
          </div>

          {/* Environment Switcher */}
          <div className="relative">
            <button
              onClick={() => setEnvDropdownOpen(!envDropdownOpen)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${envColors[environment]}`}
              title="Switch isolated environment"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>{environment}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {envDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-52 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-1.5 shadow-lg z-50">
                <div className="px-2 py-1 text-xs font-semibold text-[var(--color-text-muted)]">
                  Isolated Sanity Datasets
                </div>
                {(["production", "staging", "development"] as const).map((env) => (
                  <button
                    key={env}
                    onClick={() => {
                      setEnvironment(env);
                      setEnvDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      environment === env
                        ? "bg-[var(--color-panel-subtle)] text-[var(--color-brand-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]"
                    }`}
                  >
                    <span className="capitalize">{env}</span>
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">
                      {env === "production" ? "dataset: prod" : env === "staging" ? "dataset: stage" : "dataset: dev"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Sync Button */}
          <button
            onClick={onQuickSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[var(--color-brand-hover)] disabled:opacity-50 transition-all whitespace-nowrap shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing Feed..." : "Run Daily Sync"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-panel)] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl overflow-x-auto py-1 scrollbar-none">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? "bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-muted)]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
