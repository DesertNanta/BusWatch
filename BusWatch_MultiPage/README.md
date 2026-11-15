# BusWatch — Sistem Informasi & Mobilitas Bus Terintegrasi

Platform sistem informasi bus modern untuk penumpang, operator armada, dan regulator transportasi.

---

## 📁 Struktur Workspace

Workspace ini terbagi menjadi 3 bagian utama:

- **`prototype/`**: Versi prototype awal berbasis HTML/CSS/JavaScript. Dapat dibuka langsung di peramban (`index.html`) tanpa dependensi server atau build.
- **`buswatch-app/`**: Aplikasi produksi masa depan berbasis **Next.js 14 (App Router)**, **TypeScript (Strict Mode)**, **Tailwind CSS**, **Prisma ORM**, dan **Leaflet**.
- **`docs/`**: Dokumentasi teknis lengkap:
  - [`docs/TECHNICAL_ARCHITECTURE.md`](docs/TECHNICAL_ARCHITECTURE.md): Arsitektur sistem dan keputusan teknologi Modular Monolith.
  - [`docs/DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md): Dokumentasi relasional 17 entitas data dan dukungan spasial PostGIS.
  - [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md): Penjelasan struktur folder dan pembagian modul domain.
  - [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md): Rencana tahapan migrasi bertahap dari prototype menuju rilis MVP.

---

## 🚀 Panduan Menjalankan Aplikasi (`buswatch-app`)

### 1. Prasyarat Sistem
Pastikan lingkungan Anda telah terpasang:
- **Node.js** >= 18.17.0 (disarankan LTS v20.x)
- **npm** atau **pnpm**
- **Docker Desktop** (untuk database PostgreSQL + PostGIS lokal)

### 2. Menjalankan Database Lokal (PostgreSQL + PostGIS)
Masuk ke direktori `buswatch-app` dan jalankan Docker Compose:
```bash
cd buswatch-app
docker compose up -d db
```
Database akan berjalan pada port `5432` dengan database name `buswatch`, username `buswatch`, dan password `buswatch_secret`. Ekstensi PostGIS diaktifkan secara otomatis saat inisialisasi pertama melalui `docker/postgres/init.sql`.

*(Opsional: Untuk antarmuka web pgAdmin, jalankan `docker compose up -d` lalu buka `http://localhost:5050`)*.

### 3. Instalasi Dependensi & Variabel Lingkungan
Salin berkas konfigurasi lingkungan:
```bash
cp .env.example .env.local
```
Instal paket dependensi:
```bash
npm install
```

### 4. Eksekusi Migrasi & Seeding Database
Jalankan migrasi skema Prisma ke database PostgreSQL:
```bash
npm run db:migrate
```
Isi data awal (seed) koridor, halte, dan armada demo Bali:
```bash
npm run db:seed
```

### 5. Menjalankan Server Pengembangan
Jalankan Next.js development server:
```bash
npm run dev
```
Buka browser pada: [http://localhost:3000](http://localhost:3000).

Healthcheck database & PostGIS dapat dicek via: [http://localhost:3000/api/health](http://localhost:3000/api/health).

---

## 🧪 Skrip Pengujian & Validasi Kualitas Kode

- **Pemeriksaan Tipe Data TypeScript**:
  ```bash
  npm run typecheck
  ```
- **Pemeriksaan Linter (ESLint)**:
  ```bash
  npm run lint
  ```
- **Uji Build Produksi**:
  ```bash
  npm run build
  ```
- **Antarmuka GUI Database (Prisma Studio)**:
  ```bash
  npm run db:studio
  ```

---

## ⚠️ Pemberitahuan Status Pengembangan
Aplikasi saat ini berada pada tahap **Sprint 002 (Technical Foundation)**. Seluruh data rute, halte, dan armada yang ditampilkan dalam antarmuka berstatus **DEMONSTRASI** dan bukan merupakan telemetri operasional aktual.
