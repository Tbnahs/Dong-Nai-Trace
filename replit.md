<<<<<<< HEAD
# Đồng Nai Trace

A product traceability portal for Đồng Nai province, operated by the Department of Science and Technology (Sở Khoa học và Công nghệ). The system allows consumers, businesses, and regulators to trace the origin of agricultural and manufactured goods.

# Đồng Nai Traceability Portal

A Vietnamese agricultural product traceability platform for Đồng Nai province. Allows consumers and businesses to look up, trace, and verify agricultural product origins.
>>>>>>> 13e22afc288ae591469ed6ca144aea9bdf2946cb

## Architecture

<<<<<<< HEAD
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
=======
- **Frontend** (`artifacts/portal`): React 19 + Vite + Tailwind CSS v4 + shadcn/ui components, with Leaflet maps and Wouter routing. Vietnamese-language UI.
- **API Server** (`artifacts/api-server`): Express 5 + TypeScript, built with esbuild, structured logging with Pino.
- **Database** (`lib/db`): Drizzle ORM + PostgreSQL (Replit managed). Schema lives in `lib/db/src/schema/`.
- **Shared libs**: `lib/api-zod` (Zod schemas), `lib/api-client-react` (React Query hooks), `lib/api-spec` (OpenAPI + Orval codegen).

## How to Run

Both services start automatically via managed workflows:

| Service | Workflow name | Port |
|---|---|---|
| Portal (frontend) | `artifacts/portal: web` | 25265 |
| API Server | `artifacts/api-server: API Server` | 8080 |

The frontend is served at `/portal/` and the API at `/api/`.

## Development

```bash
# Install dependencies
pnpm install

# Run typecheck across the workspace
pnpm run typecheck

# Push DB schema changes (dev only)
pnpm --filter @workspace/db run push

# Run OpenAPI codegen (regenerate hooks/schemas from openapi.yaml)
pnpm run --filter @workspace/api-spec codegen
```
>>>>>>> 13e22afc288ae591469ed6ca144aea9bdf2946cb

## Environment Variables

<<<<<<< HEAD
- Keep the existing project structure and stack
=======
- `DATABASE_URL` — auto-managed by Replit (PostgreSQL connection string)
- `NODE_ENV` — set to `development` in shared env
- `LOG_LEVEL` — set to `info` in shared env
- `SESSION_SECRET` — stored as a Replit Secret

## User Preferences

- Use pnpm for all package management (yarn/npm are blocked by preinstall script)
- Keep existing project structure — do not restructure or migrate
>>>>>>> 13e22afc288ae591469ed6ca144aea9bdf2946cb
