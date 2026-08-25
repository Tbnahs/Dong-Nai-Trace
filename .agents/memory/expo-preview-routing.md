---
name: Expo preview routing
description: Multiple Expo artifacts can appear to share the currently focused preview domain even when their workflows serve separate ports.
---

Each Expo artifact must be verified by its workflow port and generated HTML title, not only by the currently focused preview iframe. The artifact workflow can still serve the correct app while a shared Expo preview domain or stale iframe displays another running Expo session.

**Why:** The workspace has separate Expo workflows and ports, but the preview surface can retain the last or wrong Expo session when switching between mobile artifacts.

**How to apply:** Check `getWorkflowStatus` and request the local workflow HTML when branding appears swapped; present the specific artifact again and refresh the preview before changing app source.