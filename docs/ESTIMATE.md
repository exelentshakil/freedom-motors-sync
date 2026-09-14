# Project Cost & Scope Estimate

**Client**: Freedom Motors USA  
**Location**: Battle Creek, MI  
**Project**: Next.js 15 App Router + Sanity CMS Website Migration & Daily FTP Ingestion  
**Architect**: Shakil Ahmed — Principal Systems Architect, BarakahSoft LLC  
**Credentials**: Verified Upwork Partner · 12+ Years Enterprise Systems Engineering · Former Lead Engineer at Legiit ($1M ARR Command Center)  
**Calibrated Rate**: $38.00/hr  
**Total Scoped Hours**: 70 Hours  
**Total Turnkey Investment**: $2,660.00 USD  
**Estimated Turnaround**: 2–3 Weeks  

---

## Executive Summary
This scope estimate provides a turnkey, production-grade roadmap for migrating Freedom Motors USA from legacy WordPress to Next.js 15 App Router with Sanity CMS. It addresses the client's mission-critical operational requirement: automating daily FTPS Excel inventory ingestion without clobbering editorial copy, paired with sub-50ms on-demand edge cache invalidation.

---

## Detailed Milestone Breakdown

### Phase 0: Interactive Architectural Demo & Migration Cockpit
*Status: COMPLETED & DELIVERED (Pre-Engagement)*
- Functional Next.js 15 App Router prototype with live dual-provider AI spec enrichment.
- Interactive Sanity schema explorer proving fieldset isolation (`sync` vs `editorial`).
- Real-time on-demand ISR webhook simulation bench invalidating edge tags in <50ms.
- 5-stage visual FTP ingestion pipeline with Sentry error monitoring terminal.
- Interactive ADA wheelchair ramp fit calculator & GTM dataLayer event inspector.
- **Investment**: **$0.00** (Complimentary proof-of-competence deliverable)

---

### Phase 1: Sanity Studio & Content Lake Schema Engineering
*Estimated Hours: 16 hrs | Rate: $38.00/hr | Subtotal: $608.00*
- Architect complete Sanity schema for `vehicle`, `conversionSpec`, `chassisModel`, and `staffMember`.
- Configure strict fieldsets: `sync` (automated feed data) and `editorial` (marketing copy).
- Implement programmatic field-level locks via `readOnly: ({ currentUser }) => !isAdmin` to block accidental manual edits on feed-governed attributes.
- Author optimized GROQ queries for inventory catalog filtering, individual VDP views, and sitemap generation.
- Deploy custom Sanity Studio interface with customized badges and workflow states.

---

### Phase 2: Automated Daily FTP Excel Ingestion Engine & Sentry Watchdog
*Estimated Hours: 18 hrs | Rate: $38.00/hr | Subtotal: $684.00*
- Implement scheduled cron daemon (04:00 AM EST) with secure FTPS handshake (TLS 1.3).
- Build streaming memory parser using `ExcelJS` to process multi-megabyte inventory feeds without memory spikes.
- Build intelligent diffing engine:
  - New VIN detection ➔ transactional insertions.
  - Price & mileage adjustments ➔ field-level updates strictly inside `sync` fieldset.
  - Missing VINs ➔ marked as `sold` or `in_transit` (preserving document history).
- Atomic Sanity mutation patching via `client.patch(vin).set({ ...syncData }).commit()`.
- Sentry error tracking hooks alerting to schema drift, missing columns, or FTP timeout errors.

---

### Phase 3: Next.js 15 App Router Frontend & Sub-50ms On-Demand ISR
*Estimated Hours: 18 hrs | Rate: $38.00/hr | Subtotal: $684.00*
- Build high-performance Vehicle Display Pages (VDP) and Inventory Catalog using React Server Components.
- Implement `/api/revalidate` edge webhook route authenticating `x-revalidate-secret` from Sanity.
- Integrate targeted tag invalidation (`revalidateTag("vdp-[vin]")`) purging Vercel edge caches worldwide in <50ms without rebuilding.
- Develop interactive ADA wheelchair ramp fit calculator and conversion measurement visualizer.
- Responsive mobile-first styling complying with WCAG 2.2 AA accessibility and 12px+ typography hierarchy.

---

### Phase 4: Third-Party Telemetry & CRM Lead Capture
*Estimated Hours: 10 hrs | Rate: $38.00/hr | Subtotal: $380.00*
- Implement Google Tag Manager container with structured `window.dataLayer` event dispatching (`view_item`, `select_item`, `ada_fit_calculated`).
- Configure Meta Conversions API (CAPI) server bridge for high-fidelity conversion tracking.
- Build custom HubSpot CRM form integration routing VDP test drive inquiries directly into sales pipelines.
- Ensure GDPR & CCPA cookie compliance consent banner compatibility.

---

### Phase 5: Three-Tier Environment Isolation & Production Go-Live
*Estimated Hours: 8 hrs | Rate: $38.00/hr | Subtotal: $304.00*
- Configure 3 isolated environments: Development (`freedom-dev`), Staging (`freedom-stage`), Production (`freedom-production`).
- Implement Sanity dataset migration workflows and environment variable encryption.
- DNS cutover, SSL provisioning, and zero-downtime traffic migration from legacy WordPress.
- Final Sentry error alerting verification and operational handoff documentation.

---

## Project Summary & Commercial Terms

| Milestone | Scope Description | Hours | Subtotal |
|---|---|:---:|:---:|
| **Phase 0** | Interactive Architectural Demo & Migration Cockpit | Delivered | **$0.00** |
| **Phase 1** | Sanity Studio Schema & Fieldset Locks | 16 hrs | **$608.00** |
| **Phase 2** | Daily FTPS Ingestion Daemon & Watchdog | 18 hrs | **$684.00** |
| **Phase 3** | Next.js 15 App Router & Sub-50ms On-Demand ISR | 18 hrs | **$684.00** |
| **Phase 4** | Third-Party Telemetry (GTM, Meta CAPI, HubSpot) | 10 hrs | **$380.00** |
| **Phase 5** | 3-Tier Environment Isolation & Production Cutover | 8 hrs | **$304.00** |
| **TOTAL** | **Full Turnkey Migration & Ingestion Platform** | **70 hrs** | **$2,660.00** |

**Terms**: Weekly milestone escrow releases via Upwork; 30-day post-launch warranty included.
