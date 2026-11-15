-- BusWatch PostgreSQL Initialization Script
-- This runs automatically when the container is first created.

-- Enable PostGIS extension (required for geospatial queries)
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Verify PostGIS is active
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'postgis'
  ) THEN
    RAISE EXCEPTION 'PostGIS extension failed to load';
  END IF;
  RAISE NOTICE 'PostGIS % is active', PostGIS_Version();
END;
$$;
