# Đồng Nai Trace — Hệ thống Truy xuất Nguồn gốc Sản phẩm

A product traceability platform for Đồng Nai province, Vietnam. Allows businesses to register products with QR-based trace codes, and lets consumers look up full supply-chain history (farm → harvest → transport → retail).

## Artifacts

| Artifact | Path | Description |
|---|---|---|
| **Portal** (web) | `artifacts/portal/` | Public-facing web portal — homepage, product lookup, business registration |
| **API Server** | `artifacts/api-server/` | Backend REST API (Node.js/Hono, esbuild-bundled) |
| **Mobile** | `artifacts/mobile/` | Expo React Native companion app |
| **Slides** | `artifacts/dong-nai-trace-slides/` | Project introduction slide deck |

## How to run

Dependencies are managed with **pnpm** (workspace monorepo).

```bash
# Install all dependencies
pnpm install
```

The default `Project` workflow runs only the Expo mobile app:

```bash
pnpm --filter @workspace/mobile run dev
```

Use the workflow panel to start the mobile preview. The portal, API server, and mockup sandbox are not part of the default run workflow.

## Stack

- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend:** Node.js + Hono, bundled with esbuild
- **Mobile:** Expo (React Native)
- **Shared types/libs:** `lib/` packages in the pnpm workspace

## User preferences

<!-- Add any preferences the user asks you to remember here -->
