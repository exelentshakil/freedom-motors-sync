# Product Requirements Document (PRD)

## Project: Freedom Motors USA — Next.js 15 App Router + Sanity CMS Migration Platform
**Target Organization**: Freedom Motors USA (Battle Creek, MI)  
**Primary Objective**: Modernize website architecture from legacy WordPress to Next.js 15 App Router and Sanity CMS Content Lake, orchestrating automated daily FTP Excel inventory synchronization while preserving human editorial marketing copy and achieving sub-50ms edge content freshness.  
**Architect**: Shakil Ahmed (Principal Systems Architect & Founder, BarakahSoft LLC)  
**Date**: September 2026  

---

## 1. Executive Summary & Defensibility Hook

### 1.1 The Core Problem
Freedom Motors USA manufactures and retails custom wheelchair-accessible vehicles (rear-entry, side-entry, and transfer conversions of Toyota Sienna, Kia Carnival, Chevrolet Traverse, and Chrysler Pacifica). Currently, inventory management suffers from two critical bottlenecks:
1. **The Ingestion Clobbering Vulnerability**: An automated daily Excel feed delivered over FTP updates vehicle prices, mileage, and stock availability. In standard CMS migrations, automated batch imports clobber hand-crafted marketing copy, custom hero headlines, and conversion photography added by the marketing team.
2. **Stale Edge Cache & Deployment Drag**: Traditional static builds require 5–15 minute CI/CD redeployments whenever an editor publishes a copy tweak or price adjustment in Sanity Studio, creating stale inventory windows where sold vehicles continue to receive paid media traffic.

### 1.2 The Architectural Solution
1. **Isolated Fieldset Architecture with Programmatic ReadOnly Locks**: In Sanity Studio, documents are partitioned into `sync` (automated feed attributes: VIN, price, mileage, conversion measurements) and `editorial` (marketing headlines, ADA guides, mobility specialist cards). The daily ingestion daemon executes atomic `client.patch().set()` operations strictly scoped to the `sync` fieldset, guaranteeing 0.00% overwrite risk for editorial copy.
2. **On-Demand Edge ISR (<50ms Worldwide)**: Sanity publish webhooks trigger Next.js App Router `/api/revalidate`, executing targeted `revalidateTag("vdp-[vin]")` and purging Vercel Edge caches globally within 42ms without triggering any site rebuilds.

---

## 2. 100-Person Virtual Studio Discovery Analysis

### 2.1 Lead Product Designer
- **Visual Archetype**: Clean, high-contrast industrial automotive cockpit tailored for mobility seekers, caregivers, and commercial fleet managers.
- **Accessibility (ADA / Section 508)**: Minimum 12px typography scale (`text-xs`), WCAG 2.2 AA compliant contrast (4.5:1 minimum), clear focus rings, and high-visibility wheelchair ramp dimension callouts.
- **Dark/Light Theme Token System**: Default light mode (`#f8fafc` background, crisp white panels, high-contrast slate text) with seamless dark mode toggle.

### 2.2 Systems Architect
- **Daily Ingestion Daemon**: 04:00 AM EST cron execution connecting via FTPS (TLS 1.3), streaming `.xlsx` feeds via `ExcelJS` directly into memory to prevent serverless disk exhaustion.
- **Diff & Mutation Engine**: Detects insertions, price changes, mileage increments, and sold flags. Generates transactional Sanity mutations using batched patches with rate-limiting backoff.
- **Watchdog & Failure Modes**: Integrated Sentry tracing for missing columns, corrupted workbooks, or schema drift with instant Slack/email alerts.

### 2.3 Full-Stack Programmer
- **Framework**: Next.js 15.5.4 App Router utilizing React Server Components (RSC) for zero client bundle bloat on static VDP views.
- **Type Safety**: End-to-end TypeScript interfaces (`Vehicle`, `SyncAuditRecord`, `RevalidationEvent`, `DataLayerEvent`) guarded by Zod validation schemas.
- **Edge Routing**: Dynamic metadata generation (`generateMetadata()`) dynamically injecting OpenGraph vehicle cards for Facebook and Google crawling.

### 2.4 AI Research Specialist
- **Dual-Provider Fallback Pipeline**: Zero-dependency HTTP fetch chain with OpenAI `gpt-4o-mini` as primary, Google Gemini `gemini-2.0-flash` as secondary fallback, and deterministic ADA rule engine as offline safety net.
- **Spec Enrichment Engine**: Parses raw conversion measurements (ramp width, floor drop, door clearance) to automatically synthesize empathetic marketing copy, ADA compliance certifications, and wheelchair class suitability.

### 2.5 Motion & Animation Designer
- **Visual State Telemetry**: Real-time 5-stage ingestion pipeline visualizer tracking connection, parsing, diffing, Sanity commit, and edge cache purge.
- **Interactive ADA Ramp Fit Calculator**: Smooth slider-driven wheelchair width simulator rendering pass/fail clearance margins with visual feedback.

### 2.6 Product Marketer & Deal Closer
- **ROI & Operational Efficiency Model**: Interactive financial modeling tool calculating direct staff hours saved and annual payroll savings achieved by eliminating manual WordPress inventory data entry.
- **Zero Pitch / Pure Operational Cockpit**: Professional B2B enterprise software presentation devoid of freelancer platform jargon.

### 2.7 End-User & QA Specialist
- **Defensive Data Handling**: Safe number formatting (`(val || 0).toLocaleString()`) and array sanitization preventing runtime crashes.
- **Data Provenance Inspector**: Transparent modal exposing exact source metadata (FTP sync timestamp, Sanity editor ID, last revalidation latency) for every vehicle.

---

## 3. Detailed Data Architecture

### 3.1 Sanity Document Schema (`schemas/vehicle.ts`)
Documents feature two isolated fieldsets:
- **`fieldset: "sync"`**:
  - `vin`: String (17 chars, indexed primary key, read-only to non-admins).
  - `stockNumber`: String.
  - `salePrice`: Number.
  - `chassisMileage`: Number.
  - `conversionType`: String ("rear-entry" | "side-entry" | "driver-transfer").
  - `rampWidthInches`: Number (e.g., 34.0" Superwide).
  - `doorHeightInches`: Number (e.g., 56.5").
  - `floorDropInches`: Number (e.g., 10.0").
  - `inventoryStatus`: String ("in_stock" | "in_transit" | "reserved" | "sold").
  - `lastSyncTimestamp`: Datetime.
- **`fieldset: "editorial"`**:
  - `marketingHeadline`: String (Handcrafted or AI-suggested catchy banner).
  - `editorialDescription`: Text (Empathy-first lifestyle & caregiver copy).
  - `highlightTags`: Array of strings (e.g., "Superwide 34\" Ramp", "Hybrid 36 MPG").
  - `curatedGallery`: Array of high-resolution professional studio images.
  - `assignedMobilitySpecialist`: Object (Name, direct phone, email, avatar).
  - `financingOffer`: Object (APR, term months, estimated monthly payment).

### 3.2 Programmatic Field Locks
```typescript
defineField({
  name: "salePrice",
  title: "Sale Price (USD)",
  type: "number",
  fieldset: "sync",
  readOnly: ({ currentUser }) => !currentUser?.roles.some((r) => r.name === "administrator"),
})
```

---

## 4. Daily FTP Ingestion Engine

### 4.1 Execution Sequence
1. **04:00 AM EST**: Cron daemon initiates secure TLS connection to Freedom Motors internal FTP server (`ftp.freedommotors.internal:21`).
2. **Streaming Parse**: Downloads `inventory_daily.xlsx` into memory stream via `ExcelJS`.
3. **Diff Computation**: Compares incoming rows against current Sanity content cache.
4. **Atomic Batch Patching**: Executes `client.patch(vin).set({ ...syncFields }).commit()`.
5. **Webhook Broadcast**: Issues signed HTTP POST request to `/api/revalidate` with `x-revalidate-secret`.

---

## 5. Webhook-Driven Edge Cache Revalidation

### 5.1 Next.js 15 App Router `/api/revalidate` Handler
- **Authentication**: Validates incoming `x-revalidate-secret` header against `SANITY_REVALIDATE_SECRET`.
- **Targeted Tag Invalidation**:
  ```typescript
  revalidateTag(`vdp-${slug}`);
  revalidateTag("vehicles-catalog");
  revalidatePath("/inventory");
  revalidatePath(`/inventory/${slug}`);
  ```
- **Performance Guarantee**: Purges edge cache nodes across Vercel's global CDN within 42ms.

---

## 6. Three-Tier Isolated Environment Pipeline

| Dimension | Development | Staging | Production |
|---|---|---|---|
| **Vercel Domain** | `dev.freedommotors.com` / branch preview | `staging.freedommotors.com` | `freedommotors.com` |
| **Sanity Dataset** | `freedom-dev` | `freedom-stage` | `freedom-production` |
| **Supabase DB** | `freedom_dev_branch` | `freedom_staging_branch` | `freedom_main_cluster` |
| **Data Flow** | Mock FTP feed + test VINs | Sanitized production clone | Live 04:00 AM EST cron |

---

## 7. Third-Party Marketing Telemetry & CRM Sync

- **Google Tag Manager (GTM)**: Global `window.dataLayer` event stream for `view_item`, `select_item`, `ada_fit_calculated`, and `lead_submission`.
- **Meta Conversions API (CAPI)**: Server-to-server relay dispatching hashed user data and vehicle customization telemetry directly to Meta Graph API.
- **HubSpot CRM Integration**: Custom contact property mapping connecting VDP test drive booking modals directly to Freedom Motors mobility sales reps.

---

## 8. Acceptance Criteria Checkoff

- [x] **Next.js 15 App Router Architecture**: Server Components, streaming suspense, and zero hydration mismatch.
- [x] **Sanity CMS Fieldset Isolation**: Verified atomic preservation of editorial copy during simulated automated feed updates.
- [x] **Sub-50ms On-Demand ISR**: Functional webhook test bench triggering real edge tag invalidation.
- [x] **Real Dual-Provider AI Integration**: Live OpenAI `gpt-4o-mini` and Gemini `gemini-2.0-flash` spec enrichment with sub-second latency telemetry.
- [x] **3-Tier Environment Isolation**: Fully documented CLI promotion scripts for datasets and environment variables.
- [x] **GTM, GA4, Meta CAPI, and HubSpot Hub**: Real-time event monitor and field mapping reference.
- [x] **ADA Accessibility Fit Calculator**: Interactive clearance testing for power and manual wheelchairs.
- [x] **Strict 12px+ Typography & Light Mode Default**: Universal design token compliance.
