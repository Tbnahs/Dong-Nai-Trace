# Đồng Nai Trace — Portal

Cổng thông tin truy xuất nguồn gốc sản phẩm, hàng hóa Thành phố Đồng Nai, do Sở Khoa học và Công nghệ chủ trì.

## Stack

- **Frontend** (`artifacts/portal`): React 19 + Vite + TailwindCSS + Wouter (routing) + TanStack Query + shadcn/ui components + React Leaflet (maps)
- **Backend** (`artifacts/api-server`): Node.js + Express 5 + Pino (logging), built with esbuild
- **Shared libs** (`lib/`):
  - `api-spec` — OpenAPI spec (source of truth for all API contracts)
  - `api-zod` — Zod schemas generated from OpenAPI spec
  - `api-client-react` — React Query hooks generated from OpenAPI spec
  - `db` — Drizzle ORM database layer

## How to run

Both services start automatically via managed workflows:

| Service | Workflow name | URL |
|---|---|---|
| Portal (frontend) | `artifacts/portal: web` | Port 25265, path `/` |
| API Server | `artifacts/api-server: API Server` | Port 8080, path `/api` |

Install dependencies (first time or after pulling): `pnpm install`

## Project context

- Brand: "Đồng Nai Trace" — professional government portal aesthetic, navy/orange palette
- Primary colors: xanh navy `#1B2A6B` (primary), cam/orange (accent/CTA)
- Font: Vietnamese-supporting sans-serif (Inter / Be Vietnam Pro / Noto Sans)
- Three platforms in scope: Portal (public web), App (mobile), Client (admin dashboard)
- This repo covers the **Portal** (public + enterprise) and its shared API/DB backend

## User preferences

<!-- Add remembered user preferences here -->
