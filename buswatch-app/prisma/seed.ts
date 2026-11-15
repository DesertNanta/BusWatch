/**
 * BusWatch — Prisma Seed Script
 * Sprint: 002 | Technical Foundation
 *
 * Seeds the database with initial data derived from the
 * prototype's hard-coded objects (BALI_COORDINATES, CORRIDOR_DATA, etc.)
 *
 * Run: npm run db:seed
 * Note: This script uses tsx to run TypeScript directly.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting BusWatch database seed...");

  // ─── 1. Roles ─────────────────────────────────────────────
  console.log("  Creating roles...");
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: "SUPER_ADMIN" },
      update: {},
      create: { name: "SUPER_ADMIN", description: "Super administrator with full system access" },
    }),
    prisma.role.upsert({
      where: { name: "OPERATOR_ADMIN" },
      update: {},
      create: { name: "OPERATOR_ADMIN", description: "Operator administrator" },
    }),
    prisma.role.upsert({
      where: { name: "OPERATOR_STAFF" },
      update: {},
      create: { name: "OPERATOR_STAFF", description: "Operator staff member" },
    }),
    prisma.role.upsert({
      where: { name: "PASSENGER" },
      update: {},
      create: { name: "PASSENGER", description: "Passenger / end user" },
    }),
    prisma.role.upsert({
      where: { name: "GOVERNMENT" },
      update: {},
      create: { name: "GOVERNMENT", description: "Government regulator with read-only access" },
    }),
  ]);
  console.log(`  ✓ ${roles.length} roles created.`);

  // ─── 2. City ──────────────────────────────────────────────
  console.log("  Creating cities...");
  const denpasar = await prisma.city.upsert({
    where: { name_province: { name: "Denpasar", province: "Bali" } },
    update: {},
    create: {
      name: "Denpasar",
      province: "Bali",
      country: "Indonesia",
      lat: -8.6500,
      lng: 115.2167,
    },
  });
  const buleleng = await prisma.city.upsert({
    where: { name_province: { name: "Singaraja", province: "Bali" } },
    update: {},
    create: {
      name: "Singaraja",
      province: "Bali",
      country: "Indonesia",
      lat: -8.1120,
      lng: 115.0882,
    },
  });
  console.log("  ✓ Cities: Denpasar, Singaraja (Buleleng)");

  // ─── 3. Operator ──────────────────────────────────────────
  console.log("  Creating operator...");
  const operator = await prisma.operator.upsert({
    where: { code: "BWBALI" },
    update: {},
    create: {
      name: "BusWatch Bali (Demo)",
      code: "BWBALI",
      contactEmail: "operator@buswatch.local",
      isActive: true,
    },
  });
  console.log("  ✓ Operator: BusWatch Bali (Demo)");

  // ─── 4. City ↔ Operator ───────────────────────────────────
  await prisma.cityOperator.upsert({
    where: { cityId_operatorId: { cityId: denpasar.id, operatorId: operator.id } },
    update: {},
    create: { cityId: denpasar.id, operatorId: operator.id },
  });
  await prisma.cityOperator.upsert({
    where: { cityId_operatorId: { cityId: buleleng.id, operatorId: operator.id } },
    update: {},
    create: { cityId: buleleng.id, operatorId: operator.id },
  });
  console.log("  ✓ City–Operator relations created.");

  // ─── 5. Stops (from prototype STOPS_DATA + POPULAR_LOCATIONS) ─
  console.log("  Creating stops...");
  const stopData = [
    { code: "HLT-A", name: "Halte A", subtitle: "Gatot Subroto / Ubung", lat: -8.6355, lng: 115.2015 },
    { code: "HLT-B", name: "Halte B", subtitle: "Lapangan Puputan Badung", lat: -8.6565, lng: 115.2185 },
    { code: "HLT-C", name: "Halte C", subtitle: "Sanur Matahari Terbit", lat: -8.6750, lng: 115.2600 },
    { code: "HLT-D", name: "Halte D", subtitle: "Renon / Bajra Sandhi", lat: -8.6710, lng: 115.2340 },
    { code: "HLT-E", name: "Halte E", subtitle: "Nusa Dua Benoa", lat: -8.7890, lng: 115.2150 },
    { code: "TRML-UBG", name: "Terminal Ubung", subtitle: "Terminal Bus Ubung, Denpasar Utara", lat: -8.6305, lng: 115.1972, type: "TERMINAL" },
    { code: "KAMPUS-PLT", name: "Poltrada Bali", subtitle: "Kampus Politeknik Transportasi Darat Bali", lat: -8.5445, lng: 115.1147, type: "BUS_STOP" },
  ];

  const stops: Record<string, { id: string }> = {};
  for (const s of stopData) {
    const stop = await prisma.stop.upsert({
      where: { id: s.code }, // use code as a stable lookup
      update: { name: s.name, lat: s.lat, lng: s.lng },
      create: {
        id: s.code, // NOTE: in real use, let uuid() generate; here we set for repeatability
        cityId: denpasar.id,
        name: s.name,
        code: s.code,
        subtitle: s.subtitle,
        lat: s.lat,
        lng: s.lng,
        type: (s as { type?: string }).type ?? "BUS_STOP",
      },
    });
    stops[s.code] = stop;
  }
  console.log(`  ✓ ${stopData.length} stops created.`);

  // ─── 6. Corridors & Routes ────────────────────────────────
  console.log("  Creating corridors and routes...");

  // Koridor 1
  const k1 = await prisma.corridor.upsert({
    where: { cityId_code: { cityId: denpasar.id, code: "K1" } },
    update: {},
    create: {
      cityId: denpasar.id,
      operatorId: operator.id,
      name: "Koridor 1 (Poltrada – Ubung – Puputan)",
      code: "K1",
      color: "#1677f9",
    },
  });
  const k1Route = await prisma.route.create({
    data: {
      corridorId: k1.id,
      name: "Poltrada → Lapangan Puputan",
      direction: "OUTBOUND",
    },
  });
  await prisma.routeStop.createMany({
    skipDuplicates: true,
    data: [
      { routeId: k1Route.id, stopId: stops["KAMPUS-PLT"].id, stopOrder: 1 },
      { routeId: k1Route.id, stopId: stops["TRML-UBG"].id,   stopOrder: 2 },
      { routeId: k1Route.id, stopId: stops["HLT-A"].id,       stopOrder: 3 },
      { routeId: k1Route.id, stopId: stops["HLT-B"].id,       stopOrder: 4 },
    ],
  });

  // Koridor 3
  const k3 = await prisma.corridor.upsert({
    where: { cityId_code: { cityId: denpasar.id, code: "K3" } },
    update: {},
    create: {
      cityId: denpasar.id,
      operatorId: operator.id,
      name: "Koridor 3 (Ubung – Renon – Sanur)",
      code: "K3",
      color: "#0f9f91",
    },
  });
  const k3Route = await prisma.route.create({
    data: {
      corridorId: k3.id,
      name: "Terminal Ubung → Sanur",
      direction: "OUTBOUND",
    },
  });
  await prisma.routeStop.createMany({
    skipDuplicates: true,
    data: [
      { routeId: k3Route.id, stopId: stops["TRML-UBG"].id, stopOrder: 1 },
      { routeId: k3Route.id, stopId: stops["HLT-A"].id,    stopOrder: 2 },
      { routeId: k3Route.id, stopId: stops["HLT-D"].id,    stopOrder: 3 },
      { routeId: k3Route.id, stopId: stops["HLT-C"].id,    stopOrder: 4 },
    ],
  });

  // Koridor 5
  const k5 = await prisma.corridor.upsert({
    where: { cityId_code: { cityId: denpasar.id, code: "K5" } },
    update: {},
    create: {
      cityId: denpasar.id,
      operatorId: operator.id,
      name: "Koridor 5 (Puputan – Kuta – Nusa Dua)",
      code: "K5",
      color: "#8050cf",
    },
  });
  const k5Route = await prisma.route.create({
    data: {
      corridorId: k5.id,
      name: "Lapangan Puputan → Nusa Dua",
      direction: "OUTBOUND",
    },
  });
  await prisma.routeStop.createMany({
    skipDuplicates: true,
    data: [
      { routeId: k5Route.id, stopId: stops["HLT-B"].id, stopOrder: 1 },
      { routeId: k5Route.id, stopId: stops["HLT-E"].id, stopOrder: 2 },
    ],
  });
  console.log("  ✓ 3 corridors and routes with stops created.");

  // ─── 7. Demo Vehicle + GPS Device ─────────────────────────
  console.log("  Creating demo vehicle and GPS device...");
  const vehicle = await prisma.vehicle.upsert({
    where: { plateNumber: "DK-001-BW" },
    update: {},
    create: {
      operatorId: operator.id,
      plateNumber: "DK-001-BW",
      model: "Mercedes-Benz Citaro (Demo)",
      capacity: 60,
    },
  });
  await prisma.gpsDevice.upsert({
    where: { serial: "GPS-DEMO-001" },
    update: {},
    create: {
      vehicleId: vehicle.id,
      serial: "GPS-DEMO-001",
      model: "Simulated GPS Unit",
    },
  });
  console.log("  ✓ Demo vehicle DK-001-BW and GPS device created.");

  // ─── 8. Demo Fare Rule ────────────────────────────────────
  await prisma.fareRule.create({
    data: {
      cityId: denpasar.id,
      operatorId: operator.id,
      baseFare: 5000,
      perKmRate: 0,
      currency: "IDR",
      validFrom: new Date("2024-01-01"),
    },
  });
  console.log("  ✓ Demo fare rule (Rp 5.000 flat) created.");

  console.log("\n✅ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
