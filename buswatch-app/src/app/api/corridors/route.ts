import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import type { ApiResponse, CorridorInfo } from "@/types";

/**
 * GET /api/corridors
 * Returns all active corridors with their routes and stops.
 * Query params:
 *   ?cityId=<uuid>      — filter by city
 *   ?operatorId=<uuid>  — filter by operator
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get("cityId");
  const operatorId = searchParams.get("operatorId");

  try {
    const corridors = await prisma.corridor.findMany({
      where: {
        isActive: true,
        ...(cityId ? { cityId } : {}),
        ...(operatorId ? { operatorId } : {}),
      },
      include: {
        city: { select: { name: true } },
        operator: { select: { name: true } },
        routes: {
          where: { isActive: true },
          include: {
            routeStops: {
              orderBy: { stopOrder: "asc" },
              include: {
                stop: {
                  select: {
                    id: true, code: true, name: true,
                    subtitle: true, lat: true, lng: true, type: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { code: "asc" },
    });

    const data: CorridorInfo[] = corridors.map((c) => ({
      id: c.id,
      code: c.code,
      name: c.name,
      color: c.color,
      cityName: c.city.name,
      operatorName: c.operator.name,
      routes: c.routes.map((r) => ({
        id: r.id,
        name: r.name,
        direction: r.direction as "OUTBOUND" | "INBOUND",
        stops: r.routeStops.map((rs) => ({
          id: rs.stop.id,
          code: rs.stop.code ?? undefined,
          name: rs.stop.name,
          subtitle: rs.stop.subtitle ?? undefined,
          lat: rs.stop.lat,
          lng: rs.stop.lng,
          type: rs.stop.type as "BUS_STOP" | "TERMINAL" | "INTERCHANGE",
        })),
      })),
    }));

    const response: ApiResponse<CorridorInfo[]> = { success: true, data };
    return NextResponse.json(response);
  } catch (err) {
    console.error("[API /api/corridors]", err);
    const response: ApiResponse<never> = {
      success: false,
      error: "Gagal mengambil data koridor.",
      code: "CORRIDORS_FETCH_ERROR",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
