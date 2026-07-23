# Đồng Nai Trace

A product traceability portal for businesses in Đồng Nai province, Vietnam. Users can search for products and view full traceability details; businesses manage their listings through a dashboard.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4, Radix UI, Wouter, TanStack Query |
| Backend | Express 5, TypeScript, Node.js |
| Database | PostgreSQL + Drizzle ORM |
| Monorepo | pnpm Workspaces |

## Project structure

```
artifacts/
  portal/        – React frontend (served at /portal/)
  api-server/    – Express API server (port 8080)
  mockup-sandbox/ – UI development/preview sandbox
lib/
  db/            – Database schema and Drizzle config
  api-spec/      – OpenAPI specification and codegen config
  api-zod/       – Generated Zod schemas
  api-client-react/ – Generated React Query hooks
scripts/         – Workspace utility scripts
```

## Running the project

Dependencies are installed via pnpm from the workspace root:

```bash
pnpm install
```

Both services are managed as workflows and start automatically:

- **Portal (frontend)**: `pnpm --filter @workspace/portal run dev` — served at `/portal/`
- **API Server (backend)**: `pnpm --filter @workspace/api-server run dev` — port 8080

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | Express session signing secret |

## Database

Push the schema to your database:

```bash
pnpm --filter @workspace/db run push
```

## User preferences

<!-- Add any preferences the user asks to remember here -->
