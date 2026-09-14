"use client";

import React, { useState } from "react";
import { Vehicle } from "@/lib/types";
import {
  Car,
  Filter,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Eye,
  Sliders,
  Send,
  PlayCircle,
  Lock,
  Edit3,
  Flame,
  ArrowRight,
  Phone,
  Mail,
  Zap,
  Gauge,
  Ruler,
  Maximize2,
  Calendar,
  Layers,
  X,
} from "lucide-react";

interface ShowroomViewProps {
  vehicles: Vehicle[];
  onTriggerEnrichment: (vehicle: Vehicle) => void;
  onDispatchDataLayerEvent: (event: string, payload: Record<string, unknown>) => void;
}

export function ShowroomView({
  vehicles,
  onTriggerEnrichment,
  onDispatchDataLayerEvent,
}: ShowroomViewProps) {
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [selectedConversion, setSelectedConversion] = useState<string>("all");
  const [showDataSourceInspector, setShowDataSourceInspector] = useState<boolean>(true);
  const [activeVdp, setActiveVdp] = useState<Vehicle | null>(null);

  // Wheelchair fit simulator state inside VDP
  const [wheelchairWidth, setWheelchairWidth] = useState<number>(28); // inches
  const [wheelchairType, setWheelchairType] = useState<string>("Permobil Power Chair (28\")");

  // HubSpot Form modal state
  const [hubspotModalOpen, setHubspotModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    wheelchairUserNeeds: "Full Power Wheelchair with Caregiver Driving",
    zipCode: "49037", // Battle Creek, MI
    deliveryPreference: "Free Home Delivery & Mobility Orientation",
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Filter logic
  const filteredVehicles = vehicles.filter((v) => {
    if (selectedMake !== "all" && v.make.toLowerCase() !== selectedMake.toLowerCase()) return false;
    if (selectedConversion !== "all" && v.conversionType !== selectedConversion) return false;
    return true;
  });

  const openVdp = (vehicle: Vehicle) => {
    setActiveVdp(vehicle);
    onDispatchDataLayerEvent("view_vehicle_vdp", {
      vin: vehicle.vin,
      stockNumber: vehicle.stockNumber,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      salePrice: vehicle.salePrice,
      conversionType: vehicle.conversionType,
    });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVdp) return;

    onDispatchDataLayerEvent("hubspot_lead_submit", {
      formId: "hs_form_freedom_testdrive_v1",
      vin: activeVdp.vin,
      stockNumber: activeVdp.stockNumber,
      vehicle: `${activeVdp.year} ${activeVdp.make} ${activeVdp.model}`,
      salePrice: activeVdp.salePrice,
      contact: {
        fullName: leadForm.fullName,
        email: leadForm.email,
        phone: leadForm.phone,
        zipCode: leadForm.zipCode,
        mobilityNeeds: leadForm.wheelchairUserNeeds,
      },
    });

    setLeadSubmitted(true);
    setTimeout(() => {
      setLeadSubmitted(false);
      setHubspotModalOpen(false);
    }, 2400);
  };

  return (
    <div className="space-y-6">
      {/* Cockpit Sub-Header & Controls */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Wheelchair Accessible Vehicle Showroom
              </h2>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                Live Edge ISR
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Production-grade catalog rendered with Next.js 15 Server Components and automatic Sanity GROQ hydration.
            </p>
          </div>

          {/* Data Source Inspector Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDataSourceInspector(!showDataSourceInspector)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                showDataSourceInspector
                  ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]"
                  : "border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>
                {showDataSourceInspector ? "Inspect Data Layer (ON)" : "Inspect Data Layer (OFF)"}
              </span>
            </button>
          </div>
        </div>

        {/* Data Layer Color Key (Visible when inspector is active) */}
        {showDataSourceInspector && (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] px-4 py-2.5 text-xs">
            <span className="font-semibold text-[var(--color-text-primary)]">Data Provenance:</span>
            <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 font-mono font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 whitespace-nowrap shrink-0">
              <Lock className="h-3 w-3" />
              [FTP EXCEL SYNC] Read-Only Fields (VIN, Specs, Price, Images)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded bg-purple-500/10 px-2 py-0.5 font-mono font-medium text-purple-700 dark:text-purple-300 border border-purple-500/20 whitespace-nowrap shrink-0">
              <Edit3 className="h-3 w-3" />
              [SANITY STUDIO] Hand-Edited Marketing (Headlines, Tags, Videos, Staff)
            </span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter By:</span>
          </div>

          {/* Make Filter */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {["all", "Toyota", "Kia", "Chevrolet", "Chrysler", "Honda"].map((make) => (
              <button
                key={make}
                onClick={() => {
                  setSelectedMake(make);
                  onDispatchDataLayerEvent("filter_make", { make });
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedMake === make
                    ? "bg-[var(--color-brand-primary)] text-white"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
                }`}
              >
                {make === "all" ? "All Makes" : make}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[var(--color-border)] hidden sm:block" />

          {/* Conversion Filter */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {[
              { id: "all", label: "All Conversions" },
              { id: "rear-entry", label: "Rear-Entry (Superwide)" },
              { id: "side-entry", label: "Side-Entry (In-Floor)" },
              { id: "driver-transfer", label: "Driver Accessible" },
            ].map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedConversion(conv.id);
                  onDispatchDataLayerEvent("filter_conversion", { conversion: conv.id });
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  selectedConversion === conv.id
                    ? "bg-[var(--color-text-primary)] text-[var(--color-panel)]"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
                }`}
              >
                {conv.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] shadow-sm hover:border-[var(--color-brand-primary)] hover:shadow-md transition-all"
          >
            <div>
              {/* Image & Badges Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={vehicle.rawFtpImages[0] || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-blue-600/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm whitespace-nowrap shrink-0">
                    {vehicle.conversionType === "rear-entry"
                      ? "Rear-Entry"
                      : vehicle.conversionType === "side-entry"
                      ? "Side-Entry"
                      : "Driver Transfer"}
                  </span>
                  {vehicle.adaCompliant && (
                    <span className="rounded-full bg-emerald-600/90 px-2 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm whitespace-nowrap shrink-0">
                      ADA Certified
                    </span>
                  )}
                </div>

                {/* Status Pill */}
                <div className="absolute right-3 top-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm whitespace-nowrap shrink-0 ${
                      vehicle.inventoryStatus === "in_stock"
                        ? "bg-emerald-500 text-white"
                        : vehicle.inventoryStatus === "reserved"
                        ? "bg-amber-500 text-white"
                        : "bg-slate-700 text-white"
                    }`}
                  >
                    {vehicle.inventoryStatus === "in_stock" ? "In Stock" : vehicle.inventoryStatus}
                  </span>
                </div>

                {/* Image Bottom Strip: Provenance and Stock */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono font-medium">Stock: {vehicle.stockNumber}</span>
                  {showDataSourceInspector && (
                    <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono text-xs text-emerald-300 border border-emerald-400/30">
                      FTP: {vehicle.ftpSourceFile.slice(0, 20)}...
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Title and Pricing */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-[var(--color-brand-primary)]">
                        ${vehicle.salePrice.toLocaleString()}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] line-through">
                        MSRP ${vehicle.baseMSRP.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {vehicle.trim} • {vehicle.fuelType}
                  </p>
                </div>

                {/* Marketing Headline (Sanity Studio Editorial) */}
                <div
                  className={`rounded-lg p-2.5 text-xs transition-colors ${
                    showDataSourceInspector
                      ? "border border-purple-500/30 bg-purple-500/5 text-purple-950 dark:text-purple-200"
                      : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]"
                  }`}
                >
                  {showDataSourceInspector && (
                    <div className="mb-1 flex items-center gap-1 font-mono text-xs font-semibold text-purple-600 dark:text-purple-400">
                      <Edit3 className="h-3 w-3" />
                      SANITY STUDIO FIELD: marketingHeadline
                    </div>
                  )}
                  <p className="line-clamp-2 italic font-medium leading-relaxed">
                    &ldquo;{vehicle.marketingHeadline}&rdquo;
                  </p>
                </div>

                {/* Key Conversion Specs (FTP Excel Synced) */}
                <div
                  className={`rounded-lg p-2.5 text-xs space-y-1.5 transition-colors ${
                    showDataSourceInspector
                      ? "border border-emerald-500/30 bg-emerald-500/5"
                      : "bg-[var(--color-panel-subtle)]"
                  }`}
                >
                  {showDataSourceInspector && (
                    <div className="flex items-center gap-1 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <Lock className="h-3 w-3" />
                      FTP EXCEL SYNC: Conversion Dimension Locks
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[var(--color-text-muted)]">Ramp Width:</span>{" "}
                      <strong className="text-[var(--color-text-primary)] font-mono">
                        {vehicle.rampWidthInches}&quot; Superwide
                      </strong>
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)]">Door Opening:</span>{" "}
                      <strong className="text-[var(--color-text-primary)] font-mono">
                        {vehicle.doorHeightInches}&quot; Height
                      </strong>
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)]">Ramp Type:</span>{" "}
                      <strong className="text-[var(--color-text-primary)] capitalize">
                        {vehicle.rampOperation.replace("-", " ")}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[var(--color-text-muted)]">Chassis Miles:</span>{" "}
                      <strong className="text-[var(--color-text-primary)] font-mono">
                        {vehicle.chassisMileage.toLocaleString()} mi
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Editorial Highlight Tags */}
                <div className="flex flex-wrap gap-1">
                  {vehicle.highlightTags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-[var(--color-panel-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] whitespace-nowrap shrink-0"
                    >
                      {tag}
                    </span>
                  ))}
                  {vehicle.highlightTags.length > 3 && (
                    <span className="rounded bg-[var(--color-panel-subtle)] px-1.5 py-0.5 text-xs text-[var(--color-text-muted)]">
                      +{vehicle.highlightTags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="border-t border-[var(--color-border-subtle)] p-4 bg-[var(--color-panel-subtle)]/50 flex items-center justify-between gap-2">
              <button
                onClick={() => onTriggerEnrichment(vehicle)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-brand-primary)] transition-colors whitespace-nowrap shrink-0"
                title="Run real OpenAI + Gemini spec enrichment"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Enrich with AI</span>
              </button>

              <button
                onClick={() => openVdp(vehicle)}
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <span>View VDP</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL VEHICLE DETAIL PAGE (VDP) MODAL */}
      {activeVdp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative my-8 w-full max-w-4xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveVdp(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* VDP Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--color-brand-primary)] px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                  {activeVdp.conversionType.replace("-", " ")}
                </span>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  VIN: {activeVdp.vin} • Stock: {activeVdp.stockNumber}
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] mt-1">
                {activeVdp.year} {activeVdp.make} {activeVdp.model} {activeVdp.trim}
              </h2>
              <p className="text-sm font-medium text-[var(--color-brand-primary)] italic mt-1">
                &ldquo;{activeVdp.marketingHeadline}&rdquo;
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeVdp.rawFtpImages.map((img, i) => (
                <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={img}
                    alt={`${activeVdp.make} view ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-xs text-white">
                    FTP Image #{i + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Price & Purchase Callout */}
            <div className="flex flex-wrap items-center justify-between rounded-xl bg-[var(--color-panel-subtle)] p-4 border border-[var(--color-border-subtle)]">
              <div>
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">Internet Special Price</span>
                <div className="text-2xl font-bold font-mono text-[var(--color-brand-primary)]">
                  ${activeVdp.salePrice.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-[var(--color-text-muted)] line-through">
                    MSRP ${activeVdp.baseMSRP.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  Est. ${activeVdp.financingOffer.monthlyEst}/mo • {activeVdp.financingOffer.apr} ({activeVdp.financingOffer.termMonths} mos)
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => setHubspotModalOpen(true)}
                  className="rounded-lg bg-[var(--color-brand-primary)] px-4 py-2.5 text-xs font-bold text-white hover:bg-[var(--color-brand-hover)] shadow transition-colors whitespace-nowrap shrink-0"
                >
                  Schedule Home Test Drive
                </button>
                <a
                  href="tel:18006256335"
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] transition-colors whitespace-nowrap shrink-0"
                >
                  (800) 625-6335
                </a>
              </div>
            </div>

            {/* INTERACTIVE WHEELCHAIR FIT CALCULATOR */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                    Interactive Wheelchair Fit & ADA Ramp Clearance Calculator
                  </h4>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Ramp Width: {activeVdp.rampWidthInches}&quot;
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Select your specific wheelchair model or width to verify door opening height and side clearance on this vehicle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: "Standard Manual Chair", width: 24 },
                  { label: "Permobil / Quantum Power Chair", width: 28 },
                  { label: "Bariatric / Tilt-in-Space Chair", width: 32 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setWheelchairWidth(item.width);
                      setWheelchairType(`${item.label} (${item.width}")`);
                      onDispatchDataLayerEvent("ramp_fit_test", {
                        vin: activeVdp.vin,
                        chairWidth: item.width,
                        rampWidth: activeVdp.rampWidthInches,
                        clearance: activeVdp.rampWidthInches - item.width,
                      });
                    }}
                    className={`rounded-lg border p-2.5 text-left text-xs transition-all ${
                      wheelchairWidth === item.width
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-950 dark:text-emerald-200 font-semibold"
                        : "border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]"
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="font-mono text-xs text-[var(--color-text-muted)]">
                      Width: {item.width}&quot;
                    </div>
                  </button>
                ))}
              </div>

              {/* Clearance Result Bar */}
              <div className="rounded-lg bg-[var(--color-panel)] p-3 border border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[var(--color-text-primary)]">
                    Fit Status for {wheelchairType}:
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {activeVdp.rampWidthInches - wheelchairWidth >= 2 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓ Guaranteed Fit: {(activeVdp.rampWidthInches - wheelchairWidth).toFixed(1)}&quot; side clearance with {activeVdp.doorHeightInches}&quot; vertical door clearance.
                      </span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        ⚠ Tight Fit: Only {(activeVdp.rampWidthInches - wheelchairWidth).toFixed(1)}&quot; side clearance. Consult mobility specialist.
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    +{(activeVdp.rampWidthInches - wheelchairWidth).toFixed(1)}&quot;
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] uppercase">Ramp Margin</span>
                </div>
              </div>
            </div>

            {/* DATA PROVENANCE BREAKDOWN TABLE */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Layers className="h-4 w-4 text-[var(--color-brand-primary)]" />
                <span>Field-Level Data Provenance: FTP Sync vs Sanity Studio Editorial</span>
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--color-panel-subtle)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] uppercase font-semibold">
                    <tr>
                      <th className="p-3 w-1/4">Field Name</th>
                      <th className="p-3 w-1/4">Source Origin</th>
                      <th className="p-3 w-1/4">Sanity Studio Schema Rule</th>
                      <th className="p-3 w-1/4">Current Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)] font-mono">
                    <tr className="bg-emerald-500/5">
                      <td className="p-3 font-semibold text-[var(--color-text-primary)]">vin</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">FTP Excel Feed</td>
                      <td className="p-3 text-emerald-700 dark:text-emerald-300">readOnly: true (Locked)</td>
                      <td className="p-3 text-[var(--color-text-primary)]">{activeVdp.vin}</td>
                    </tr>
                    <tr className="bg-emerald-500/5">
                      <td className="p-3 font-semibold text-[var(--color-text-primary)]">rampWidthInches</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">FTP Excel Feed</td>
                      <td className="p-3 text-emerald-700 dark:text-emerald-300">readOnly: true (Locked)</td>
                      <td className="p-3 text-[var(--color-text-primary)]">{activeVdp.rampWidthInches}&quot;</td>
                    </tr>
                    <tr className="bg-emerald-500/5">
                      <td className="p-3 font-semibold text-[var(--color-text-primary)]">salePrice</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">FTP Excel Feed</td>
                      <td className="p-3 text-emerald-700 dark:text-emerald-300">readOnly: true (Locked)</td>
                      <td className="p-3 text-[var(--color-text-primary)]">${activeVdp.salePrice.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-purple-500/5">
                      <td className="p-3 font-semibold text-[var(--color-text-primary)]">marketingHeadline</td>
                      <td className="p-3 text-purple-600 dark:text-purple-400 font-bold">Sanity Studio</td>
                      <td className="p-3 text-purple-700 dark:text-purple-300">Editable (Protected from sync overwrite)</td>
                      <td className="p-3 text-[var(--color-text-primary)] truncate max-w-xs font-sans">
                        {activeVdp.marketingHeadline}
                      </td>
                    </tr>
                    <tr className="bg-purple-500/5">
                      <td className="p-3 font-semibold text-[var(--color-text-primary)]">highlightTags</td>
                      <td className="p-3 text-purple-600 dark:text-purple-400 font-bold">Sanity Studio</td>
                      <td className="p-3 text-purple-700 dark:text-purple-300">Editable (Protected from sync overwrite)</td>
                      <td className="p-3 text-[var(--color-text-primary)] font-sans">
                        {activeVdp.highlightTags.join(", ")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assigned Mobility Specialist */}
            <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeVdp.assignedMobilitySpecialist.avatar}
                  alt={activeVdp.assignedMobilitySpecialist.name}
                  className="h-10 w-10 rounded-full object-cover border border-[var(--color-border)]"
                />
                <div>
                  <div className="text-xs text-[var(--color-text-muted)]">Assigned Certified Mobility Consultant</div>
                  <div className="text-sm font-bold text-[var(--color-text-primary)]">
                    {activeVdp.assignedMobilitySpecialist.name}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {activeVdp.assignedMobilitySpecialist.phone} • {activeVdp.assignedMobilitySpecialist.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setHubspotModalOpen(true)}
                className="rounded-lg bg-[var(--color-brand-primary)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--color-brand-hover)] transition-colors whitespace-nowrap shrink-0"
              >
                Ask Marcus a Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HUBSPOT TEST DRIVE & LEAD MODAL */}
      {hubspotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
              <div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  HubSpot Lead Integration Simulator
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Dispatches directly to HubSpot CRM & Google Tag Manager dataLayer
                </p>
              </div>
              <button
                onClick={() => setHubspotModalOpen(false)}
                className="rounded-full p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {leadSubmitted ? (
              <div className="rounded-xl bg-emerald-500/10 p-6 text-center border border-emerald-500/30 space-y-2">
                <CheckCircle className="mx-auto h-8 w-8 text-emerald-500" />
                <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                  Lead Successfully Dispatched!
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  HubSpot Contact Created & GTM event <code className="font-mono">hubspot_lead_submit</code> fired.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@freedommotors.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(269) 555-0192"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--color-text-primary)] mb-1">
                    Primary Mobility Requirement
                  </label>
                  <select
                    value={leadForm.wheelchairUserNeeds}
                    onChange={(e) => setLeadForm({ ...leadForm, wheelchairUserNeeds: e.target.value })}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:outline-none"
                  >
                    <option>Full Power Wheelchair with Caregiver Driving</option>
                    <option>Independent Driver (Transfer Seat or Hand Controls)</option>
                    <option>Manual Wheelchair with Low Entry Incline</option>
                    <option>Commercial Non-Emergency Medical Transport (NEMT)</option>
                  </select>
                </div>

                <div className="rounded-lg bg-[var(--color-panel-subtle)] p-2.5 border border-[var(--color-border-subtle)] font-mono text-xs text-[var(--color-text-muted)]">
                  Target Vehicle: {activeVdp?.year} {activeVdp?.make} {activeVdp?.model} ({activeVdp?.stockNumber})
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setHubspotModalOpen(false)}
                    className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white hover:bg-[var(--color-brand-hover)] shadow"
                  >
                    Submit Test Drive Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
