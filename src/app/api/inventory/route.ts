import { NextRequest, NextResponse } from "next/server";
import { INITIAL_VEHICLES } from "@/lib/vehicles";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const make = searchParams.get("make");
  const conversionType = searchParams.get("conversionType");
  const status = searchParams.get("status");

  let vehicles = [...INITIAL_VEHICLES];

  if (make && make !== "all") {
    vehicles = vehicles.filter((v) => v.make.toLowerCase() === make.toLowerCase());
  }

  if (conversionType && conversionType !== "all") {
    vehicles = vehicles.filter((v) => v.conversionType === conversionType);
  }

  if (status && status !== "all") {
    vehicles = vehicles.filter((v) => v.inventoryStatus === status);
  }

  return NextResponse.json({
    total: vehicles.length,
    dataset: "production",
    lastSyncedAt: new Date().toISOString(),
    vehicles,
  }, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    }
  });
}
