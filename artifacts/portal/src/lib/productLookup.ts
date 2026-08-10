// Shared lookup table — maps trace codes and GTIN+lot to product IDs.
// Both LandingPage and SearchResultsPage use this to navigate directly
// to ProductDetailPage when a user searches by exact code.

// ─── Trace code → product ID ──────────────────────────────────────────────────
const TRACE_CODE_MAP: Record<string, string> = {
  'TXNG-VCU-001-2024': 'sp001',
  'TXNG-XL-002-2024':  'sp002',
  'TXNG-LT-003-2024':  'sp003',
  'TXNG-NT-004-2024':  'sp004',
  'TXNG-XL-005-2024':  'sp005',
  'TXNG-DQ-006-2024':  'sp006',
  'TXNG-TP-007-2024':  'sp007',
  'TXNG-DQ-008-2024':  'sp008',
  'TXNG-BH-009-2024':  'sp009',
  'TXNG-LK-010-2024':  'sp010',
  'TXNG-LK-011-2024':  'sp011',
  'TXNG-VC-012-2024':  'sp012',
};

// ─── GTIN → product ID ────────────────────────────────────────────────────────
// Lot code is optional — if provided we do an exact match; otherwise GTIN alone.
const GTIN_MAP: Record<string, string> = {
  '8934113001234': 'sp001',
  '8934567890123': 'sp002',
  '8934000003000': 'sp003',
  '8934000004000': 'sp004',
  '8934000005000': 'sp005',
  '8934000006000': 'sp006',
  '8934000007000': 'sp007',
  '8934000008000': 'sp008',
  '8934000009000': 'sp009',
  '8934000010000': 'sp010',
  '8934000011000': 'sp011',
  '8934000012000': 'sp012',
};

const LOT_MAP: Record<string, string> = {
  'L-20241015-01': 'sp001',
  'L-20240715-02': 'sp002',
  'L-20240810-03': 'sp003',
};

const GTIN_LOT_MAP: Record<string, string> = {
  '8934113001234|L-20241015-01': 'sp001',
  '8934567890123|L-20240715-02': 'sp002',
  '8934000003000|L-20240810-03': 'sp003',
};

// ─── Public API ───────────────────────────────────────────────────────────────
/** Returns product ID for an exact trace code match (case-insensitive), or null. */
export function lookupByTraceCode(code: string): string | null {
  return TRACE_CODE_MAP[code.trim().toUpperCase()] ??
         TRACE_CODE_MAP[code.trim()] ??
         null;
}

/** Returns product ID for a GTIN (+ optional lot) match, or null. */
export function lookupByGtin(gtin: string, lot?: string): string | null {
  const g = gtin.trim();
  const l = lot?.trim();

  // Exact lot match takes priority
  if (l && LOT_MAP[l]) return LOT_MAP[l];

  // Fall back to GTIN-only
  return GTIN_MAP[g] ?? null;
}

/** Returns product ID only when both GTIN and lot form an exact match. */
export function lookupByGtinAndLot(gtin: string, lot: string): string | null {
  return GTIN_LOT_MAP[`${gtin.trim()}|${lot.trim()}`] ?? null;
}
