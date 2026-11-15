/**
 * BusWatch — Database Client (Prisma)
 *
 * Uses the singleton pattern recommended by the Prisma team for Next.js
 * to avoid creating multiple instances during hot-module reloads in dev.
 *
 * Usage:
 *   import { prisma } from "@/lib/db/prisma";
 *   const cities = await prisma.city.findMany();
 *
 * NEVER import this in client components (pages/components marked "use client").
 * Only use in Server Components, API route handlers, and server actions.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
