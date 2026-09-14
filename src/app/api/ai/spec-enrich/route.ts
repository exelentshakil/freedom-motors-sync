import { NextRequest, NextResponse } from "next/server";
import { enrichVehicleSpecs } from "@/lib/ai";
import { INITIAL_VEHICLES } from "@/lib/vehicles";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const vehicleId = body.vehicleId;
    let vehicle = body.vehicle;

    if (!vehicle && vehicleId) {
      vehicle = INITIAL_VEHICLES.find((v) => v.id === vehicleId || v.vin === vehicleId);
    }

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehicle data or valid vehicleId is required" },
        { status: 400 }
      );
    }

    const enrichment = await enrichVehicleSpecs({
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim,
      conversionType: vehicle.conversionType,
      rampOperation: vehicle.rampOperation,
      rampWidthInches: vehicle.rampWidthInches || 34,
      doorHeightInches: vehicle.doorHeightInches || 56,
      floorDropInches: vehicle.floorDropInches || 11.5,
      kneelingSuspension: Boolean(vehicle.kneelingSuspension),
      adaCompliant: Boolean(vehicle.adaCompliant),
      wheelchairPositions: vehicle.wheelchairPositions || 1,
    });

    return NextResponse.json({
      success: true,
      enrichment,
      metadata: {
        vin: vehicle.vin,
        stockNumber: vehicle.stockNumber,
        processedAt: new Date().toISOString(),
      }
    }, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "AI generation failed";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
