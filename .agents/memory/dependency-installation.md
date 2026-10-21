---
name: Dependency installation
description: Handle blocked transitive npm packages safely in this multi-artifact workspace.
---

When Replit's package firewall rejects a locked transitive dependency, keep the firewall enabled. Check the latest upstream version and its semver compatibility, then update only the affected dependency to a safe compatible release. In this multi-artifact workspace, filter installation to the artifacts being run so unrelated apps do not block setup.

**Why:** Older lockfile versions can be blocked even when a compatible newer release is available; filtering also avoids installing unrelated province-specific apps.

**How to apply:** Inspect the dependency chain and current compatible ranges, use a workspace override only when appropriate, then run a filtered pnpm install and verify the selected services.
