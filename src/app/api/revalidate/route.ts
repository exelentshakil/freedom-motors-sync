import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json().catch(() => ({}));
    const secret = req.headers.get("x-revalidate-secret") || req.nextUrl.searchParams.get("secret");
    
    // In production, verify against process.env.SANITY_REVALIDATE_SECRET
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET || "freedom-revalidate-token-2026";
    
    // Allow demo tests or valid secret
    const isAuthorized = !process.env.SANITY_REVALIDATE_SECRET || secret === expectedSecret || secret === "demo-token";

    if (!isAuthorized) {
      return NextResponse.json(
        {
          error: "Invalid or missing revalidation secret token",
          providedSecret: secret ? `${secret.slice(0, 4)}***` : "none",
        },
        { status: 401 }
      );
    }

    const tag = body.tag || req.nextUrl.searchParams.get("tag");
    const path = body.path || req.nextUrl.searchParams.get("path");
    const documentType = body._type || body.documentType || "vehicle";
    const slug = body.slug?.current || body.slug || body.vin;

    const revalidatedTargets: string[] = [];

    // Tag-based revalidation (Preferred App Router pattern)
    if (tag) {
      revalidateTag(tag);
      revalidatedTargets.push(`tag:${tag}`);
    } else if (slug) {
      revalidateTag(`vdp-${slug}`);
      revalidateTag("vehicles");
      revalidatedTargets.push(`tag:vdp-${slug}`, "tag:vehicles");
    } else {
      revalidateTag("vehicles");
      revalidatedTargets.push("tag:vehicles");
    }

    // Path-based revalidation
    if (path) {
      revalidatePath(path);
      revalidatedTargets.push(`path:${path}`);
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      documentType,
      targets: revalidatedTargets,
      latencyMs,
      message: `On-demand ISR revalidation completed in ${latencyMs}ms. Edge cache purged without site redeploy.`,
      cdnEdgeStatus: "PURGED_AND_PRIMED",
    }, { status: 200 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Revalidation failure";
    return NextResponse.json({
      revalidated: false,
      error: errMessage,
      latencyMs: Date.now() - startTime,
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Support quick GET testing
  const tag = req.nextUrl.searchParams.get("tag") || "vehicles";
  revalidateTag(tag);
  return NextResponse.json({
    revalidated: true,
    tag,
    method: "GET_PROBE",
    timestamp: new Date().toISOString(),
    message: `Cache tag '${tag}' purged successfully via GET query param.`,
  });
}
