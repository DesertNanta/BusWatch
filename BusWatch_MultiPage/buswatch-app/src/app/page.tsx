import Link from "next/link";
import dynamic from "next/dynamic";

// Map component loaded client-side only (Leaflet requires window)
const BuswatchMap = dynamic(() => import("@/components/map/BuswatchMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100 rounded-xl">
      <span className="text-gray-400 text-sm">Memuat peta…</span>
    </div>
  ),
});

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/planner", label: "Perencana Perjalanan" },
  { href: "/tracking", label: "Lacak Bus" },
  { href: "/stops", label: "Halte" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header / Nav ────────────────────────────────────── */}
      <header className="bg-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 grid place-items-center shadow">
              <span className="text-white font-black text-sm">🚌</span>
            </div>
            <div>
              <div className="font-extrabold text-lg leading-none tracking-tight">
                BusWatch
              </div>
              <div className="text-blue-300 text-xs mt-0.5">
                Sistem Informasi Bus — Bali
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-blue-100 hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs font-bold text-green-300">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Sprint 002 · Dev
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left: Status Panel ─────────────────────────── */}
        <aside className="lg:col-span-1 flex flex-col gap-4">
          <section className="bg-white rounded-2xl shadow border border-gray-100 p-5">
            <h2 className="font-extrabold text-sm text-gray-500 uppercase tracking-widest mb-4">
              Status Aplikasi
            </h2>

            <StatusRow label="Versi" value="0.1.0-sprint2" ok />
            <StatusRow label="Framework" value="Next.js 14 (App Router)" ok />
            <StatusRow label="TypeScript" value="Strict Mode" ok />
            <StatusRow label="Database" value="PostgreSQL + PostGIS" pending />
            <StatusRow label="Prisma ORM" value="Schema Siap" pending />
            <StatusRow label="Auth / RBAC" value="Belum Diimplementasikan" notYet />
            <StatusRow label="GPS Real-Time" value="Belum Diimplementasikan" notYet />
            <StatusRow label="Data" value="Demonstrasi (bukan aktual)" warn />
          </section>

          <section className="bg-white rounded-2xl shadow border border-gray-100 p-5">
            <h2 className="font-extrabold text-sm text-gray-500 uppercase tracking-widest mb-3">
              Sprint Roadmap
            </h2>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 grid place-items-center text-xs font-bold">✓</span>
                Sprint 0 — Audit & Prototype Fix
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 grid place-items-center text-xs font-bold">→</span>
                Sprint 2 — Technical Foundation (aktif)
              </li>
              <li className="flex items-center gap-2 opacity-40">
                <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 grid place-items-center text-xs font-bold">○</span>
                Sprint 3 — Auth &amp; RBAC
              </li>
              <li className="flex items-center gap-2 opacity-40">
                <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 grid place-items-center text-xs font-bold">○</span>
                Sprint 4 — GPS &amp; Tracking
              </li>
              <li className="flex items-center gap-2 opacity-40">
                <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 grid place-items-center text-xs font-bold">○</span>
                Sprint 5 — Journey Planner
              </li>
            </ul>
          </section>
        </aside>

        {/* ── Right: Map ────────────────────────────────────── */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-extrabold text-sm">Peta BusWatch</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                OpenStreetMap · Basemap demonstrasi · Titik DEMO bukan lokasi bus aktual
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">
              DEMO
            </span>
          </div>
          <div className="flex-1 min-h-[400px]">
            <BuswatchMap />
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white text-center py-4 text-xs text-gray-400">
        BusWatch · Sprint 002 · Data bersifat demonstrasi · Bukan data operasional aktual
      </footer>
    </div>
  );
}

// ── Helper component ─────────────────────────────────────────
interface StatusRowProps {
  label: string;
  value: string;
  ok?: boolean;
  pending?: boolean;
  notYet?: boolean;
  warn?: boolean;
}

function StatusRow({ label, value, ok, pending, notYet, warn }: StatusRowProps) {
  const badgeClass = ok
    ? "bg-green-100 text-green-700"
    : pending
    ? "bg-blue-100 text-blue-700"
    : notYet
    ? "bg-gray-100 text-gray-400"
    : warn
    ? "bg-amber-100 text-amber-700"
    : "bg-gray-100 text-gray-500";

  const dot = ok ? "✓" : pending ? "⏳" : notYet ? "○" : warn ? "⚠" : "–";

  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${badgeClass}`}>
        {dot} {value}
      </span>
    </div>
  );
}
