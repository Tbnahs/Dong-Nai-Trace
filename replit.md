# Đồng Nai Trace

A product traceability portal for Đồng Nai province, operated by the Department of Science and Technology (Sở Khoa học và Công nghệ). The system allows consumers, businesses, and regulators to trace the origin of agricultural and manufactured goods.

## Architecture

This is a pnpm monorepo with the following packages:

| Package | Path | Description |
|---|---|---|
| `@workspace/portal` | `artifacts/portal/` | React + Vite public portal (search, product detail, business profiles, login/register) |
| `@workspace/api-server` | `artifacts/api-server/` | Express 5 REST API server |
| `@workspace/api-spec` | `lib/api-spec/` | OpenAPI spec + Orval codegen config |
| `@workspace/api-client-react` | `lib/api-client-react/` | Auto-generated React Query hooks |
| `@workspace/api-zod` | `lib/api-zod/` | Auto-generated Zod schemas |
| `@workspace/db` | `lib/db/` | Drizzle ORM + PostgreSQL client |

## Running the project

Both services start automatically via Replit workflows:

- **Portal** (React/Vite): `artifacts/portal: web` — served at `/portal/` on port 25265
- **API Server** (Express): `artifacts/api-server: API Server` — served on port 8080

To install dependencies: `pnpm install`

## API

- Health check: `GET /api/healthz` → `{ "status": "ok" }`

## Database

Uses Replit's managed PostgreSQL. The connection string is injected automatically as `DATABASE_URL`. Schema is defined in `lib/db/src/schema/index.ts` using Drizzle ORM. Run migrations with `pnpm --filter @workspace/db run db:push` (if configured).

## Tech stack

- **Frontend**: React 19, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Wouter, Leaflet
- **Backend**: Express 5, Drizzle ORM, Pino logger
- **Language**: TypeScript throughout
- **Package manager**: pnpm (workspaces)

## Branding

- Name: **Đồng Nai Trace** (`txng.dongnai.gov.vn`)
- Primary color: navy blue (`#1B2A6B`)
- Accent color: orange (CTA/industrial)
- Font: sans-serif with full Vietnamese diacritic support (Inter / Be Vietnam Pro)
- Do **not** display Checkee branding on any public-facing page

## User preferences

- Keep the existing project structure and stack
