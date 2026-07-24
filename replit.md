# Đồng Nai Traceability Portal

A Vietnamese agricultural product traceability platform for Đồng Nai province. Allows consumers and businesses to look up, trace, and verify agricultural product origins.

## Stack

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

## Environment Variables

- `DATABASE_URL` — auto-managed by Replit (PostgreSQL connection string)
- `NODE_ENV` — set to `development` in shared env
- `LOG_LEVEL` — set to `info` in shared env
- `SESSION_SECRET` — stored as a Replit Secret

## User Preferences

- Use pnpm for all package management (yarn/npm are blocked by preinstall script)
- Keep existing project structure — do not restructure or migrate
