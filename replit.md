# Đồng Nai Trace — Hệ thống Truy xuất Nguồn gốc Sản phẩm

A product traceability platform for Đồng Nai province, Vietnam. Allows businesses to register products with QR-based trace codes, and lets consumers look up full supply-chain history (farm → harvest → transport → retail).

## Artifacts

| Artifact | Path | Description |
|---|---|---|
| **Portal** (web) | `artifacts/portal/` | Public-facing web portal — homepage, product lookup, business registration |
| **API Server** | `artifacts/api-server/` | Backend REST API (Node.js/Hono, esbuild-bundled) |
| **Mobile** | `artifacts/mobile/` | Expo React Native companion app |
| **Khánh Hòa Trace** (web) | `artifacts/khanh-hoa-trace/` | Independent Khánh Hòa-branded clone of the portal |
| **Khánh Hòa Trace** (mobile) | `artifacts/khanh-hoa-trace-mobile/` | Independent Khánh Hòa-branded Expo companion app |
| **Slides** | `artifacts/dong-nai-trace-slides/` | Project introduction slide deck |

## How to run

Dependencies are managed with **pnpm** (workspace monorepo).

```bash
# Install all dependencies
pnpm install
```

The Replit Run button starts the Đồng Nai Trace portal, mobile app, and API server:

```bash
pnpm --filter @workspace/portal run dev
pnpm --filter @workspace/mobile run dev
pnpm --filter @workspace/api-server run dev
```

Use the `artifacts/portal: web` workflow for the portal at `/portal/` and the `artifacts/mobile: expo` workflow for the Expo companion app at `/mobile/`. The API workflow serves `/api`, including the ward map data used by mobile.

The independent Khánh Hòa Trace artifacts remain available separately:

```bash
pnpm --filter @workspace/khanh-hoa-trace run dev
pnpm --filter @workspace/khanh-hoa-trace-mobile run dev
```

The API server can be started separately when backend integration is needed:

```bash
pnpm --filter @workspace/api-server run dev
```

## Stack

- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend:** Node.js + Express, bundled with esbuild
- **Mobile:** Expo (React Native)
- **Shared types/libs:** `lib/` packages in the pnpm workspace

## User preferences

<!-- Add any preferences the user asks you to remember here -->
