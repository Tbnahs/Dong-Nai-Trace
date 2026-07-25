# Đồng Nai Trace — Portal

A Vietnamese traceability portal for Đồng Nai province's science & technology system. Users can search products, view business profiles, browse news, and authenticate.

## Stack

- **Frontend** (`artifacts/portal`): React + Vite + Tailwind CSS + Wouter routing + React Query
- **API Server** (`artifacts/api-server`): Express 5 + Drizzle ORM + Pino logging
- **Database**: PostgreSQL (Replit managed, `DATABASE_URL` auto-provisioned)
- **Package manager**: pnpm (monorepo workspace)

## Running the project

Both services start automatically via managed workflows:

| Service | Workflow | URL |
|---|---|---|
| Portal (frontend) | `artifacts/portal: web` | `/portal/` |
| API Server | `artifacts/api-server: API Server` | `/api/` |

To restart manually:
```
pnpm --filter @workspace/portal run dev       # portal on PORT=25265
pnpm --filter @workspace/api-server run dev   # api server on PORT=8080
```

## Installing dependencies

```
pnpm install
```

## Project structure

```
artifacts/
  portal/          — React frontend (src/pages, src/components, src/context)
  api-server/      — Express API (src/routes, src/middlewares, src/lib)
lib/
  db/              — Drizzle ORM schema & config (lib/db/src/schema/)
  api-spec/        — OpenAPI spec (source of truth for API contracts)
  api-zod/         — Generated Zod schemas
  api-client-react/ — Generated React Query hooks
attached_assets/   — Brand images, logos, reference documents
```

## Environment variables

- `DATABASE_URL` — auto-managed by Replit (do not set manually)
- `SESSION_SECRET` — stored as a Replit Secret

## User preferences

_None recorded yet._
