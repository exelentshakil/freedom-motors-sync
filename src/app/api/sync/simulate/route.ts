import { NextRequest, NextResponse } from "next/server";
import { INITIAL_VEHICLES } from "@/lib/vehicles";
import { SyncAuditRecord } from "@/lib/types";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const body = await req.json().catch(() => ({}));
  const scenario = body.scenario || "daily_routine"; // "daily_routine" | "price_drop" | "new_arrival" | "vehicle_sold"

  // Simulated diff calculations
  let addedCount = 0;
  let updatedCount = 0;
  let soldCount = 0;
  const unchangedCount = 58;
  const diffSummary: SyncAuditRecord["diffSummary"] = [];

  if (scenario === "new_arrival") {
    addedCount = 2;
    diffSummary.push({
      vin: "4T3DKRFZ8SU349102",
      model: "2026 Toyota Sienna Hybrid XLE Superwide (Blueprint)",
      changeType: "NEW_INSERT",
      detail: "New conversion completed at Battle Creek plant. Staged into Sanity dataset with auto-locked sync fields.",
    });
    diffSummary.push({
      vin: "KNDMB5C30S6781290",
      model: "2025 Kia Carnival EX Side-Entry (Aurora Black)",
      changeType: "NEW_INSERT",
      detail: "Arrived from finishing line. In-floor ramp specs verified & 8 high-res photos linked.",
    });
  } else if (scenario === "price_drop") {
    updatedCount = 3;
    diffSummary.push({
      vin: "4T3DKRFZ7SU189402",
      model: "2026 Toyota Sienna Hybrid XLE",
      changeType: "PRICE_CHANGE",
      detail: "Base MSRP $69,850 -> Sale Price updated $65,990 -> $63,990 ($2,000 Fall Incentive applied). Editorial copy preserved.",
    });
    diffSummary.push({
      vin: "1GNERCKW4SJ219084",
      model: "2025 Chevrolet Traverse LT AWD SUV",
      changeType: "PRICE_CHANGE",
      detail: "Sale Price updated $69,950 -> $67,500. Sanity customHeadline and hero tags untouched.",
    });
  } else if (scenario === "vehicle_sold") {
    soldCount = 1;
    diffSummary.push({
      vin: "4T3DKRFZ1SU903421",
      model: "2025 Toyota Sienna Platinum Driver-Accessible",
      changeType: "STATUS_FLIP",
      detail: "Status changed 'reserved' -> 'sold'. VDP updated to show 'Deposit Placed / Sold' badge.",
    });
  } else {
    // Standard routine sync
    updatedCount = 2;
    addedCount = 1;
    diffSummary.push({
      vin: "4T3DKRFZ7SU189402",
      model: "2026 Toyota Sienna Hybrid XLE",
      changeType: "SPEC_UPDATE",
      detail: "Mileage updated from 60 mi to 85 mi (final PDI road test). All editorial marketing fields preserved.",
    });
    diffSummary.push({
      vin: "2C4RC1CG8SR340192",
      model: "2026 Chrysler Pacifica Commercial ADA",
      changeType: "PRICE_CHANGE",
      detail: "Special fleet promotional discount updated ($61,500).",
    });
    diffSummary.push({
      vin: "5FNRL6H79RB091823",
      model: "2025 Honda Odyssey Touring Rear-Entry",
      changeType: "NEW_INSERT",
      detail: "Certified pre-owned chassis processed from trade-in feed.",
    });
  }

  const durationMs = Date.now() - startTime + Math.floor(Math.random() * 120 + 80);

  const auditRecord: SyncAuditRecord = {
    batchId: `SYNC-FTP-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    filename: `freedom_inventory_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}_0400.xlsx`,
    recordsRead: 64,
    addedCount,
    updatedCount,
    soldCount,
    unchangedCount,
    status: "SUCCESS",
    durationMs,
    webhookTriggered: true,
    revalidationLatencyMs: Math.floor(Math.random() * 30 + 35),
    diffSummary,
  };

  return NextResponse.json({
    success: true,
    auditRecord,
    sanityMutation: {
      action: "mutate.createOrReplaceWithFieldsetFilter",
      syncDataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      fieldsUpdated: ["vin", "stockNumber", "baseMSRP", "salePrice", "chassisMileage", "inventoryStatus"],
      fieldsPreserved: ["marketingHeadline", "editorialDescription", "highlightTags", "walkthroughVideoUrl", "financingOffer"],
      fieldCollisionRisk: "0.00% (Protected by Sanity readOnly: true on sync fieldgroup)",
    },
    isrWebhook: {
      url: "/api/revalidate",
      tagsInvalidated: ["vehicles", "vdp-inventory"],
      cdnCacheInvalidation: "COMPLETE_GLOBAL_PURGE",
      latencyMs: auditRecord.revalidationLatencyMs,
    },
  }, { status: 200 });
}
