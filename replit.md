# Đồng Nai Trace — Portal

A product traceability portal for Đồng Nai province (Vietnam). Users can look up product origins, manage organisation profiles, and track certifications.

## Stack

- **Frontend** (`artifacts/portal`): React + Vite + Tailwind CSS + shadcn/ui, served at `/portal/`
- **Backend** (`artifacts/api-server`): Express 5 + Drizzle ORM, served at `/api`
- **Database**: PostgreSQL (Replit-managed, `DATABASE_URL` is runtime-provided)
- **Shared libs**: `lib/api-spec` (OpenAPI spec + Orval codegen), `lib/api-client-react` (React Query hooks), `lib/api-zod` (Zod schemas), `lib/db` (Drizzle client + schema)

## How to run

Both services start automatically via their managed workflows:

| Workflow | Command |
|---|---|
| `artifacts/portal: web` | `PORT=25265 BASE_PATH=/portal/ pnpm --filter @workspace/portal run dev` |
| `artifacts/api-server: API Server` | `PORT=8080 pnpm --filter @workspace/api-server run dev` |

## Key URLs (dev)

- Portal: `https://<dev-domain>/portal/`
- API health: `https://<dev-domain>/api/healthz`

## Database

Replit provides a PostgreSQL database automatically. `DATABASE_URL` is injected at runtime — do not set it manually. Run migrations / schema pushes with Drizzle Kit from `lib/db/`.

## Codegen

After editing `lib/api-spec/openapi.yaml`, regenerate clients:

```bash
pnpm run --filter @workspace/api-spec codegen
```

## User preferences

_(none recorded yet)_
