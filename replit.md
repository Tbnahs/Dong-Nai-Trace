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

## How to Run

Both services start automatically via managed Replit workflows:

| Service | Workflow name | Port | URL prefix |
|---|---|---|---|
| Portal (React/Vite) | `artifacts/portal: web` | 25265 | `/portal/` |
| API Server (Express) | `artifacts/api-server: API Server` | 8080 | `/api/` |

```bash
# Install dependencies
pnpm install

# Push DB schema changes (dev only — production schema is managed by Replit Publish)
pnpm --filter @workspace/db run push

# Run OpenAPI codegen (regenerate hooks/schemas from openapi.yaml)
pnpm run --filter @workspace/api-spec codegen

# Run typecheck across the workspace
pnpm run typecheck
```

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, shadcn/ui, TanStack Query, Wouter, Leaflet maps
- **Backend**: Express 5, Drizzle ORM, Pino logger
- **Language**: TypeScript throughout
- **Package manager**: pnpm workspaces (yarn/npm are blocked by preinstall script)

## Database

Uses Replit's managed PostgreSQL. `DATABASE_URL` is injected automatically. Schema is defined in `lib/db/src/schema/` using Drizzle ORM.

## Environment Variables

- `DATABASE_URL` — auto-managed by Replit (PostgreSQL connection string)
- `SESSION_SECRET` — stored as a Replit Secret (required)
- `NODE_ENV` — set to `development` in shared env
- `LOG_LEVEL` — set to `info` in shared env

## Branding

- Name: **Đồng Nai Trace** (`txng.dongnai.gov.vn`)
- Primary color: navy blue (`#1B2A6B`)
- Accent color: orange (CTA/industrial)
- Font: sans-serif with full Vietnamese diacritic support (Inter / Be Vietnam Pro)
- Do **not** display Checkee branding on any public-facing page

## User Preferences

- Use pnpm for all package management
- Keep existing project structure — do not restructure or migrate
