/**
 * BusWatch — Shared TypeScript Types
 * Sprint: 002 | Technical Foundation
 */

// ─── Geospatial ──────────────────────────────────────────────
export interface LatLng {
  lat: number;
  lng: number;
}

// ─── GPS Source ───────────────────────────────────────────────
export type GpsSource = "ACTUAL" | "SIMULATED";
export type GpsQuality = "GOOD" | "DEGRADED" | "POOR";

// ─── GPS Position ─────────────────────────────────────────────
export interface GpsPositionPayload {
  deviceId: string;
  lat: number;
  lng: number;
  speed?: number;
  heading?: number;
  accuracy?: number;
  altitude?: number;
  source: GpsSource;
  quality?: GpsQuality;
  timestamp: Date;
}

// ─── Vehicle ──────────────────────────────────────────────────
export interface VehicleStatus {
  vehicleId: string;
  plateNumber: string;
  lat: number;
  lng: number;
  speed?: number;
  heading?: number;
  source: GpsSource;
  lastUpdate: Date;
}

// ─── Stop ─────────────────────────────────────────────────────
export interface StopInfo {
  id: string;
  code?: string;
  name: string;
  subtitle?: string;
  lat: number;
  lng: number;
  type: "BUS_STOP" | "TERMINAL" | "INTERCHANGE";
  corridors?: string[];
}

// ─── Corridor ─────────────────────────────────────────────────
export interface CorridorInfo {
  id: string;
  code: string;
  name: string;
  color: string;
  cityName: string;
  operatorName: string;
  routes: RouteInfo[];
}

export interface RouteInfo {
  id: string;
  name: string;
  direction: "OUTBOUND" | "INBOUND";
  stops: StopInfo[];
}

// ─── API Responses ────────────────────────────────────────────
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── App Config ───────────────────────────────────────────────
export interface AppConfig {
  appName: string;
  version: string;
  defaultCenter: LatLng;
  defaultZoom: number;
}
