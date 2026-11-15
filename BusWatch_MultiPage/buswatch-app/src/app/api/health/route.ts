import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

/**
 * GET /api/health
 * Returns application health status including database connectivity.
 * Used by monitoring tools and development checks.
 */
export async function GET() {
  const result = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? "unknown",
    environment: process.env.NODE_ENV ?? "unknown",
    services: {
      database: {
        status: "unknown" as "ok" | "error" | "unknown",
        message: "",
      },
      postgis: {
        status: "unknown" as "ok" | "error" | "unknown",
        version: "",
      },
    },
  };

  // ── Database connectivity check ────────────────────────────
  try {
    await prisma.$queryRaw`SELECT 1`;
    result.services.database.status = "ok";
    result.services.database.message = "Connected";
  } catch (err) {
    result.status = "degraded";
    result.services.database.status = "error";
    result.services.database.message =
      err instanceof Error ? err.message : "Unknown database error";
  }

  // ── PostGIS extension check ────────────────────────────────
  try {
    const rows = await prisma.$queryRaw<[{ postgis_version: string }]>`
      SELECT PostGIS_Version() AS postgis_version
    `;
    result.services.postgis.status = "ok";
    result.services.postgis.version = rows[0]?.postgis_version ?? "unknown";
  } catch (err) {
    if (result.services.database.status === "ok") {
      // DB is up but PostGIS not installed/enabled
      result.status = "degraded";
      result.services.postgis.status = "error";
      result.services.postgis.version =
        err instanceof Error ? err.message : "PostGIS unavailable";
    }
  }

  const httpStatus = result.status === "ok" ? 200 : 503;
  return NextResponse.json(result, { status: httpStatus });
}
