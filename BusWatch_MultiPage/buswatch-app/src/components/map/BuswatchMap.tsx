"use client";

/**
 * BuswatchMap — Client-side Leaflet map component
 *
 * IMPORTANT:
 * - This component MUST be loaded with dynamic() + ssr:false in the parent.
 * - Leaflet requires window/document which are not available during SSR.
 * - The DEMO marker is explicitly labelled to avoid confusion with real data.
 *
 * Data shown: OpenStreetMap basemap only.
 * No real-time GPS, no actual bus positions.
 */

import { useEffect, useRef } from "react";

// Map configuration from environment variables with safe fallbacks
const DEFAULT_LAT = parseFloat(process.env.NEXT_PUBLIC_MAP_DEFAULT_LAT ?? "-8.65");
const DEFAULT_LNG = parseFloat(process.env.NEXT_PUBLIC_MAP_DEFAULT_LNG ?? "115.2167");
const DEFAULT_ZOOM = parseInt(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM ?? "12", 10);
const OSM_TILE_URL =
  process.env.NEXT_PUBLIC_OSM_TILE_URL ??
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION =
  process.env.NEXT_PUBLIC_OSM_ATTRIBUTION ??
  "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";

export default function BuswatchMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    // Guard: only run in browser, only mount once
    if (typeof window === "undefined") return;
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Dynamically import Leaflet (client-only)
    import("leaflet").then((L) => {
      // Fix default marker icon paths broken by webpack
      // See: https://github.com/Leaflet/Leaflet/issues/4968
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapContainerRef.current) return;

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [DEFAULT_LAT, DEFAULT_LNG],
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
        attributionControl: true,
      });

      // OpenStreetMap basemap (required attribution)
      L.tileLayer(OSM_TILE_URL, {
        maxZoom: 19,
        attribution: OSM_ATTRIBUTION,
      }).addTo(map);

      // ── DEMO marker ────────────────────────────────────────
      // This marker is for demonstration purposes only.
      // It is NOT a real bus or stop location.
      const demoIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            background:#1677f9;
            color:white;
            border:3px solid white;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            width:28px;height:28px;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 4px 12px rgba(22,119,249,.5);
            font-size:11px;font-weight:800;
          ">
            <span style="transform:rotate(45deg)">D</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      });

      const demoMarker = L.marker([DEFAULT_LAT, DEFAULT_LNG], { icon: demoIcon }).addTo(map);
      demoMarker.bindPopup(`
        <div style="font-family:Inter,sans-serif;min-width:180px">
          <div style="font-weight:800;color:#1677f9;font-size:12px;margin-bottom:4px">
            📍 Titik DEMO
          </div>
          <div style="color:#536784;font-size:10px;line-height:1.5">
            Ini adalah marker demonstrasi.<br>
            <strong>Bukan lokasi bus atau halte aktual.</strong><br>
            Koordinat: ${DEFAULT_LAT}, ${DEFAULT_LNG}
          </div>
          <div style="margin-top:6px;padding:4px 8px;background:#fff3cd;border-radius:5px;font-size:9px;color:#856404;font-weight:700">
            ⚠️ DATA DEMONSTRASI
          </div>
        </div>
      `);
      demoMarker.openPopup();

      mapInstanceRef.current = map;

      // Fix: resize map correctly when container becomes visible
      setTimeout(() => map.invalidateSize(), 200);
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "100%", minHeight: "400px", width: "100%" }}
      aria-label="Peta demonstrasi BusWatch menggunakan OpenStreetMap"
    />
  );
}
