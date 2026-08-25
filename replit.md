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

The requested Replit setup runs only the Expo mobile app:

```bash
pnpm --filter @workspace/mobile run dev
```

Use the `artifacts/mobile: expo` workflow to start the mobile preview. The portal, API server, and mockup sandbox are intentionally not started for this setup.

The Khánh Hòa Trace clones run independently:

```bash
pnpm --filter @workspace/khanh-hoa-trace run dev
pnpm --filter @workspace/khanh-hoa-trace-mobile run dev
```

Use the `artifacts/khanh-hoa-trace: web` and `artifacts/khanh-hoa-trace-mobile: expo` workflows. The original Đồng Nai Trace artifacts remain unchanged.

## Stack

- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend:** Node.js + Hono, bundled with esbuild
- **Mobile:** Expo (React Native)
- **Shared types/libs:** `lib/` packages in the pnpm workspace

## User preferences

<!-- Add any preferences the user asks you to remember here -->
