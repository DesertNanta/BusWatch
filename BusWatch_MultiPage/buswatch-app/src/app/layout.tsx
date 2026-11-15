import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Leaflet CSS is loaded here (client-only styles — Next.js handles this correctly
// because CSS imports in a Server Component are injected into the page <head>)
import "leaflet/dist/leaflet.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BusWatch — Sistem Informasi Bus Terintegrasi",
  description:
    "Platform informasi dan mobilitas bus untuk Bali. Status: Development (Sprint 002).",
  keywords: ["BusWatch", "bus", "Bali", "transportasi", "BRT", "GPS"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head />
      <body className={inter.className}>
        {/* ── Development Banner ────────────────────────────── */}
        <div className="dev-banner text-center py-1 px-4 text-xs font-bold text-amber-900 tracking-wide">
          🚧 APLIKASI DALAM TAHAP PENGEMBANGAN — DATA BERSIFAT DEMONSTRASI —
          BUKAN DATA OPERASIONAL AKTUAL 🚧
        </div>

        {children}
      </body>
    </html>
  );
}
