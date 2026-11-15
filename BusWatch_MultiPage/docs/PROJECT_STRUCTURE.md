# BusWatch — Project Structure & Modularity Guide

> **Sprint:** 002 — Technical Foundation  
> **Architecture Pattern:** Modular Monolith (Next.js 14 App Router)  
> **Last Updated:** 2026-11-13  

---

## 1. Ikhtisar Struktur Workspace

Workspace `BusWatch_MultiPage` diorganisasi ke dalam tiga zona utama:
1. `prototype/`: Arsip prototype HTML/CSS/JS lama yang tetap utuh dan dapat dijalankan langsung di browser untuk referensi interaksi dan visualisasi awal.
2. `buswatch-app/`: Fondasi aplikasi Next.js TypeScript modular berbasis PRD lengkap dengan backend API, ORM Prisma, Leaflet map, dan Docker container PostgreSQL/PostGIS.
3. `docs/`: Dokumentasi teknis terpadu arsitektur, skema basis data, struktur proyek, dan rencana migrasi bertahap.

```
BusWatch_MultiPage/
├── prototype/                      # Backup aman prototype awal (HTML/CSS/JS)
│   ├── index.html
│   ├── planner.html
│   ├── tracking.html
│   ├── stops.html
│   ├── notifications.html
│   ├── operator.html
│   ├── app.js
│   └── styles.css
├── buswatch-app/                   # Aplikasi Modern Modular Next.js + TypeScript
│   ├── docker/                     # Konfigurasi containerization
│   │   └── postgres/
│   │       └── init.sql            # Script inisialisasi PostGIS extension
│   ├── prisma/                     # Konfigurasi ORM Database
│   │   ├── schema.prisma           # Skema 17 entitas data lengkap
│   │   ├── seed.ts                 # Script seeding data awal Bali
│   │   └── migrations/             # Direktori rekam jejak migrasi
│   ├── public/                     # Aset statis client
│   ├── src/                        # Source code aplikasi
│   │   ├── app/                    # Next.js App Router (Layouts, Pages, APIs)
│   │   ├── components/             # Reusable UI & Map components
│   │   ├── hooks/                  # Custom React hooks (lokasi, viewport)
│   │   ├── lib/                    # Library setup (Prisma singleton, utility helpers)
│   │   ├── modules/                # Domain Modular Monolith (Business Logic)
│   │   ├── services/               # Integrasi eksternal (OSM, Geocoding proxy)
│   │   └── types/                  # Definisi TypeScript global
│   ├── .env.example                # Template variabel lingkungan
│   ├── .env.local                  # Nilai variabel lingkungan lokal
│   ├── .eslintrc.json              # Konfigurasi audit kualitas kode ESLint
│   ├── .gitignore                  # Berkas yang dikecualikan dari Git
│   ├── docker-compose.yml          # Definisi PostgreSQL + PostGIS container
│   ├── next.config.mjs             # Konfigurasi bundler Next.js & Leaflet SSR handling
│   ├── package.json                # Dependensi & skrip eksekusi
│   ├── postcss.config.js           # Konfigurasi PostCSS untuk Tailwind
│   ├── tailwind.config.ts          # Tema styling BusWatch
│   └── tsconfig.json               # Konfigurasi TypeScript strict mode
├── docs/                           # Dokumentasi Arsitektur & Rekayasa
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── PROJECT_STRUCTURE.md
│   └── MIGRATION_PLAN.md
└── README.md                       # Panduan umum proyek & petunjuk eksekusi
```

---

## 2. Rincian Modul Domain (`src/modules/`)

Setiap folder domain di `src/modules/` memisahkan tanggung jawab (Separation of Concerns) sehingga logika bisnis tidak bercampur aduk di dalam komponen antarmuka atau route handler:

| Modul | Tanggung Jawab Utama | Rencana Komponen / Service |
|---|---|---|
| `auth` | Manajemen identitas, enkripsi password, dan validasi RBAC (`User`, `Role`, `UserRole`). | `auth.service.ts`, `rbac.guard.ts` |
| `city` | Pengelolaan data kota/kabupaten dan integrasi multi-city. | `city.service.ts` |
| `operator` | Administrasi operator bus, lisensi trayek, isolasi akses data operator. | `operator.service.ts`, `tenant.filter.ts` |
| `corridor` | Definisi jalur koridor BRT/bus kota dan konfigurasi rute (`direction`). | `corridor.service.ts` |
| `stop` | Master data halte/terminal, perhitungan jarak spasial ke titik penumpang. | `stop.service.ts`, `geo.util.ts` |
| `vehicle` | Manajemen inventaris armada bus, plat nomor, kapasitas, dan status fisik. | `vehicle.service.ts` |
| `gps` | Penerimaan telemetri GPS, pemisahan append-only log vs latest position, verifikasi `ACTUAL` vs `SIMULATED`. | `gps-ingest.service.ts`, `gps-filter.ts` |
| `planner` | Logika penentuan rute terbaik transit, kombinasi jalan kaki dan bus, tanpa transit ganda. | `planner.algorithm.ts` |
| `fare` | Kalkulasi tarif perjalanan berdasarkan koridor, aturan flat atau jarak per km. | `fare.service.ts` |
| `occupancy` | Riwayat dan prediksi persentase keterisian kursi bus dari sensor/laporan. | `occupancy.service.ts` |

---

## 3. Pembagian Tanggung Jawab Lapisan (Layering)

1. **Presentation Layer (`src/app/`, `src/components/`)**:
   - Komponen React murni (Server & Client Components).
   - Bertanggung jawab merender UI, menampilkan status aplikasi, dan menangani interaksi pengguna.
   - Peta Leaflet diisolasi di `src/components/map/BuswatchMap.tsx` dengan lazy loading `dynamic(() => ..., { ssr: false })`.
2. **API Layer (`src/app/api/`)**:
   - Next.js Route Handlers (`GET`, `POST`, `PUT`, `DELETE`).
   - Menerima HTTP request, melakukan validasi payload, meneruskan ke Service Layer, dan mengembalikan respon berformat `ApiResponse<T>`.
3. **Domain / Service Layer (`src/modules/`)**:
   - Tempat implementasi murni logika bisnis dan perhitungan analitik.
   - Tidak bergantung pada representasi visual UI.
4. **Data Access Layer (`src/lib/db/prisma.ts`)**:
   - Singleton Prisma Client yang menghubungkan aplikasi ke PostgreSQL/PostGIS.
   - Menjalankan migrasi, query relasional, dan spatial raw query `ST_DWithin` / `ST_Distance`.
