import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import type { ApiResponse, StopInfo } from "@/types";

/**
 * GET /api/stops
 * Returns all active stops for a given city (or all cities).
 * Query params:
 *   ?cityId=<uuid>  — filter by city
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("cityId");

  try {
    const stops = await prisma.stop.findMany({
      where: {
        isActive: true,
        ...(cityId ? { cityId } : {}),
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        code: true,
        name: true,
        subtitle: true,
        lat: true,
        lng: true,
        type: true,
      },
    });

    const data: StopInfo[] = stops.map((s) => ({
      id: s.id,
      code: s.code ?? undefined,
      name: s.name,
      subtitle: s.subtitle ?? undefined,
      lat: s.lat,
      lng: s.lng,
      type: s.type as StopInfo["type"],
    }));

    const response: ApiResponse<StopInfo[]> = { success: true, data };
    return NextResponse.json(response);
  } catch (err) {
    console.error("[API /api/stops]", err);
    const response: ApiResponse<never> = {
      success: false,
      error: "Gagal mengambil data halte. Silakan coba lagi.",
      code: "STOPS_FETCH_ERROR",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
