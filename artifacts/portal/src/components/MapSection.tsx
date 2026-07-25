import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Building2, Package, ChevronDown, MapPin, X, ChevronRight } from "lucide-react";

// Product-ID to catalog-ID mapping (for navigate to product detail page)
const PRODUCT_CATALOG_ID: Record<string, string> = {
  p2: 'sp001', // Bưởi Tân Triều
  p4: 'sp002', // Rau muống hữu cơ
  p9: 'p9',    // Mật ong (generic)
  p15: 'sp003',// Tôm thẻ chân trắng
};

// ─── Mock data ────────────────────────────────────────────────────────────────
interface Business {
  id: string;
  name: string;
  type: string;
  wardCode: string;
  wardName: string;
  phone: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  wardCode: string;
  wardName: string;
  cert: string;
}

const BUSINESSES: Business[] = [
  { id: "b1",  name: "HTX Nông nghiệp Bình Phước",      type: "Hợp tác xã",    wardCode: "25195", wardName: "Bình Phước",   phone: "0251 123 456" },
  { id: "b2",  name: "Cty TNHH Xuất khẩu Đồng Xoài",    type: "Doanh nghiệp",  wardCode: "25210", wardName: "Đồng Xoài",   phone: "0251 234 567" },
  { id: "b3",  name: "Trang trại Phước Long Xanh",        type: "Trang trại",    wardCode: "25217", wardName: "Phước Long",   phone: "0251 345 678" },
  { id: "b4",  name: "Cty CP Nông sản Bình Tân",          type: "Doanh nghiệp",  wardCode: "25246", wardName: "Bình Tân",    phone: "0251 456 789" },
  { id: "b5",  name: "HTX Rau sạch Lộc Ninh",             type: "Hợp tác xã",    wardCode: "25270", wardName: "Lộc Ninh",    phone: "0251 567 890" },
  { id: "b6",  name: "Cty TNHH Nông sản Lộc Tấn",        type: "Doanh nghiệp",  wardCode: "25279", wardName: "Lộc Tấn",     phone: "0251 678 901" },
  { id: "b7",  name: "HTX Cây ăn trái Long Hà",           type: "Hợp tác xã",    wardCode: "25255", wardName: "Long Hà",     phone: "0251 789 012" },
  { id: "b8",  name: "Trang trại Tân Triều Organic",      type: "Trang trại",    wardCode: "26188", wardName: "Tân Triều",   phone: "0251 890 123" },
  { id: "b9",  name: "Cty CP Nông sản Hưng Thịnh",        type: "Doanh nghiệp",  wardCode: "26281", wardName: "Hưng Thịnh",  phone: "0251 901 234" },
  { id: "b10", name: "HTX Bưởi Vĩnh Cửu",                 type: "Hợp tác xã",    wardCode: "26170", wardName: "Trị An",      phone: "0251 012 345" },
  { id: "b11", name: "Cty TNHH Chế biến Biên Hòa",        type: "Doanh nghiệp",  wardCode: "26068", wardName: "Biên Hòa",    phone: "0251 111 222" },
  { id: "b12", name: "HTX Xoài Đầu Giây",                  type: "Hợp tác xã",    wardCode: "26326", wardName: "Dầu Giây",    phone: "0251 222 333" },
  { id: "b13", name: "Trang trại Nhơn Trạch Green",        type: "Trang trại",    wardCode: "26485", wardName: "Nhơn Trạch",  phone: "0251 333 444" },
  { id: "b14", name: "Cty CP Nông nghiệp Cam Mỹ",          type: "Doanh nghiệp",  wardCode: "26341", wardName: "Cẩm Mỹ",     phone: "0251 444 555" },
  { id: "b15", name: "HTX Thanh long Xuân Lộc",             type: "Hợp tác xã",    wardCode: "26104", wardName: "Xuân Lập",   phone: "0251 555 666" },
];

const PRODUCTS: Product[] = [
  { id: "p1",  name: "Xoài Cát Hòa Lộc",         category: "Trái cây",   wardCode: "25195", wardName: "Bình Phước",  cert: "VietGAP" },
  { id: "p2",  name: "Bưởi Tân Triều",             category: "Trái cây",   wardCode: "26188", wardName: "Tân Triều",   cert: "VietGAP" },
  { id: "p3",  name: "Chuối tiêu hồng",            category: "Trái cây",   wardCode: "25210", wardName: "Đồng Xoài",   cert: "GlobalGAP" },
  { id: "p4",  name: "Rau muống hữu cơ",           category: "Rau củ",     wardCode: "25217", wardName: "Phước Long",  cert: "Hữu cơ" },
  { id: "p5",  name: "Cà chua bi VietGAP",         category: "Rau củ",     wardCode: "25246", wardName: "Bình Tân",    cert: "VietGAP" },
  { id: "p6",  name: "Tiêu đen Lộc Ninh",          category: "Gia vị",     wardCode: "25270", wardName: "Lộc Ninh",    cert: "OCOP 4★" },
  { id: "p7",  name: "Điều rang muối Long Hà",      category: "Hạt",        wardCode: "25255", wardName: "Long Hà",     cert: "ISO 22000" },
  { id: "p8",  name: "Nấm linh chi Lộc Tấn",       category: "Nấm",        wardCode: "25279", wardName: "Lộc Tấn",     cert: "VietGAP" },
  { id: "p9",  name: "Mật ong rừng Trị An",         category: "Mật ong",    wardCode: "26170", wardName: "Trị An",      cert: "OCOP 3★" },
  { id: "p10", name: "Thanh long ruột đỏ",          category: "Trái cây",   wardCode: "26104", wardName: "Xuân Lập",    cert: "GlobalGAP" },
  { id: "p11", name: "Sầu riêng Ri6 Hưng Thịnh",   category: "Trái cây",   wardCode: "26281", wardName: "Hưng Thịnh",  cert: "VietGAP" },
  { id: "p12", name: "Xoài Đài Loan Dầu Giây",      category: "Trái cây",   wardCode: "26326", wardName: "Dầu Giây",    cert: "VietGAP" },
  { id: "p13", name: "Rau thủy canh Nhơn Trạch",    category: "Rau củ",     wardCode: "26485", wardName: "Nhơn Trạch",  cert: "Hữu cơ" },
  { id: "p14", name: "Cam sành Cẩm Mỹ",             category: "Trái cây",   wardCode: "26341", wardName: "Cẩm Mỹ",     cert: "OCOP 4★" },
  { id: "p15", name: "Tôm thẻ chân trắng Biên Hòa", category: "Thủy sản",  wardCode: "26068", wardName: "Biên Hòa",   cert: "ASC" },
];

// ─── Ward list extracted from mock data (unique) ──────────────────────────────
const ALL_WARDS = Array.from(
  new Map(
    [...BUSINESSES, ...PRODUCTS].map((item) => [
      item.wardCode,
      { code: item.wardCode, name: item.wardName },
    ])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name, "vi"));

// ─── Cert badge color ─────────────────────────────────────────────────────────
function certColor(cert: string) {
  if (cert.includes("GlobalGAP")) return "bg-green-100 text-green-700";
  if (cert.includes("VietGAP"))   return "bg-blue-100  text-blue-700";
  if (cert.includes("OCOP"))      return "bg-orange-100 text-orange-700";
  if (cert.includes("ISO"))       return "bg-purple-100 text-purple-700";
  if (cert.includes("Hữu cơ"))   return "bg-lime-100   text-lime-700";
  return "bg-gray-100 text-gray-600";
}

// ─── MapSection ───────────────────────────────────────────────────────────────
export default function MapSection() {
  const mapRef      = useRef<HTMLDivElement>(null);
  const leafletMap  = useRef<any>(null);
  const geoLayer    = useRef<any>(null);

  const [activeTab,     setActiveTab]     = useState<"business" | "product">("business");
  const [selectedWard,  setSelectedWard]  = useState<{ code: string; name: string } | null>(null);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const [mapDataReady,  setMapDataReady]  = useState(false);

  // Filtered lists
  const filteredBiz  = selectedWard
    ? BUSINESSES.filter((b) => b.wardCode === selectedWard.code)
    : BUSINESSES;
  const filteredProd = selectedWard
    ? PRODUCTS.filter((p) => p.wardCode === selectedWard.code)
    : PRODUCTS;

  const markerRef   = useRef<any>(null);
  const wardCodesRef = useRef<Set<string>>(new Set());
  const provinceBoundsRef = useRef<any>(null);

  // ── Initialise Leaflet once ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    let disposed = false;
    const controller = new AbortController();

    import("leaflet").then((L) => {
      if (disposed || !mapRef.current || leafletMap.current) return;

      // Fix default marker icon path broken by bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center:             [11.05, 107.17],
        zoom:               9,
        minZoom:            8,
        maxZoom:            13,
        zoomControl:        true,
        attributionControl: false,
      });

      // No tile layer — white background, province only
      leafletMap.current = map;

      // ── Helper: place / replace marker and fly to it ──────────────────────
      function placeMarker(latlng: any, wardName?: string) {
        if (markerRef.current) {
          markerRef.current.remove();
        }
        const marker = L.marker(latlng, {
          title: wardName ?? "Vị trí đã chọn",
        }).addTo(map);
        if (wardName) {
          marker.bindPopup(
            `<div style="font-size:13px;font-weight:600;color:#2740BA">${wardName}</div>
             <div style="font-size:11px;color:#666;margin-top:2px">${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}</div>`,
            { closeButton: false }
          ).openPopup();
        }
        markerRef.current = marker;
        map.flyTo(latlng, Math.max(map.getZoom(), 13), { animate: true, duration: 0.8 });
      }

      // ── Map click: place marker only inside Đồng Nai wards ───────────────
      map.on("click", (e: any) => {
        // Check if click is within any ward feature
        let insideDongNai = false;
        if (geoLayer.current) {
          geoLayer.current.eachLayer((l: any) => {
            if (insideDongNai) return;
            if (l.getBounds && l.getBounds().contains(e.latlng)) {
              // Rough bbox check — good enough for restriction UX
              insideDongNai = true;
            }
          });
        }
        if (!insideDongNai) return;
        placeMarker(e.latlng);
      });

      // Load GeoJSON (BASE_PATH is now "/")
      fetch(import.meta.env.BASE_URL + "geojson/dongnai_wards.geojson", {
        signal: controller.signal,
      })
        .then((r) => r.json())
        .then((data) => {
          if (disposed || !mapRef.current || leafletMap.current !== map) return;

          const layer = L.geoJSON(data, {
            style: styleFeature(null),
            onEachFeature: (feature, layerItem) => {
              const props = feature.properties as any;
              // Collect ward codes for containment check
              if (props.code) wardCodesRef.current.add(props.code);

              layerItem.on({
                mouseover(e: any) {
                  e.target.setStyle({ fillOpacity: 0.55, weight: 2 });
                },
                mouseout(e: any) {
                  geoLayer.current?.resetStyle(e.target);
                },
                click(e: any) {
                  L.DomEvent.stopPropagation(e);
                  const ward = { code: props.code, name: props.name };
                  setSelectedWard((prev) =>
                    prev?.code === ward.code ? null : ward
                  );
                  // Place marker at exact click coordinates and fly there
                  placeMarker(e.latlng, props.fullName ?? props.name);
                },
              });
              layerItem.bindTooltip(props.fullName ?? props.name, {
                sticky: true,
                className: "leaflet-tooltip-custom",
              });
            },
          }).addTo(map);
          geoLayer.current = layer;
          provinceBoundsRef.current = layer.getBounds();
          setMapDataReady(true);
          // Fit map tightly to Đồng Nai after GeoJSON loads
          map.fitBounds(provinceBoundsRef.current, { padding: [16, 16] });
        })
        .catch((error) => {
          if (error?.name !== "AbortError") {
            console.error("Unable to load Đồng Nai map data", error);
          }
        });
    });

    return () => {
      disposed = true;
      controller.abort();
      leafletMap.current?.remove();
      leafletMap.current = null;
    };
  }, []);

  // ── Re-style and move the map when a ward is selected ────────────────────────
  useEffect(() => {
    const map = leafletMap.current;
    const layerGroup = geoLayer.current;
    if (!map || !layerGroup || !mapDataReady) return;

    layerGroup.setStyle((feature: any) =>
      styleFeature(selectedWard?.code ?? null)(feature)
    );

    if (!selectedWard) {
      if (provinceBoundsRef.current?.isValid?.()) {
        map.flyToBounds(provinceBoundsRef.current, {
          padding: [16, 16],
          animate: true,
          duration: 0.8,
        });
      }
      return;
    }

    let selectedLayer: any = null;
    layerGroup.eachLayer((layer: any) => {
      const code = layer.feature?.properties?.code;
      if (String(code) === String(selectedWard.code)) {
        selectedLayer = layer;
      }
    });

    const bounds = selectedLayer?.getBounds?.();
    if (bounds?.isValid?.()) {
      map.flyToBounds(bounds, {
        padding: [40, 40],
        maxZoom: 12,
        animate: true,
        duration: 0.8,
      });
    }
  }, [selectedWard, mapDataReady]);

  return (
    <section className="py-16 px-4 lg:px-10 bg-[#F5F7FA]">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-[#2740BA] uppercase tracking-widest">
            Bản đồ
          </span>
          <h2 className="text-[#2740BA] text-3xl lg:text-4xl font-extrabold text-slate-800 uppercase mt-1">
            Doanh nghiệp &amp; Sản phẩm{" "}
            Đồng Nai
          </h2>
        
        </div>

        {/* Ward dropdown */}
        <div className="relative md:ml-auto min-w-[220px]">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-slate-700 hover:border-[#2740BA] transition-colors"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2740BA]" />
              {selectedWard ? selectedWard.name : "Tất cả phường/xã"}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
              <button
                onClick={() => { setSelectedWard(null); setDropdownOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 font-medium"
              >
                Tất cả phường/xã
              </button>
              {ALL_WARDS.map((w) => (
                <button
                  key={w.code}
                  onClick={() => { setSelectedWard(w); setDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                    selectedWard?.code === w.code
                      ? "bg-blue-50 text-[#2740BA] font-semibold"
                      : "text-slate-700"
                  }`}
                >
                  {w.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map + Panel */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 h-[560px]">

        {/* ── Map 60% ── */}
        <div className="lg:w-[60%] h-full rounded-2xl overflow-hidden shadow-md border border-gray-200 relative" style={{ zIndex: 0, isolation: "isolate" }}>
          <div ref={mapRef} className="w-full h-full" />

          {/* Selected ward chip */}
          {selectedWard && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[999] bg-[#2740BA] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              {selectedWard.name}
              <button onClick={() => setSelectedWard(null)}>
                <X className="w-3.5 h-3.5 hover:opacity-70" />
              </button>
            </div>
          )}
        </div>

        {/* ── Panel 40% ── */}
        <div className="lg:w-[40%] h-full bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {(["business", "product"] as const).map((tab) => {
              const label = tab === "business" ? "Doanh nghiệp" : "Sản phẩm";
              const count = tab === "business" ? filteredBiz.length : filteredProd.length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-[#2740BA] text-[#2740BA] bg-blue-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "business"
                    ? <Building2 className="w-4 h-4" />
                    : <Package className="w-4 h-4" />}
                  {label}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === tab ? "bg-[#2740BA] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter label */}
          {selectedWard && (
            <div className="px-4 py-2 bg-blue-50 text-xs text-[#2740BA] font-medium flex items-center gap-1.5 border-b border-blue-100">
              <MapPin className="w-3 h-3" />
              Đang lọc: <strong>{selectedWard.name}</strong>
              <button
                onClick={() => setSelectedWard(null)}
                className="ml-auto text-blue-400 hover:text-[#2740BA]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {activeTab === "business" ? (
              filteredBiz.length === 0 ? (
                <EmptyState label="doanh nghiệp" />
              ) : (
                filteredBiz.map((b) => (
                  <Link key={b.id} href={`/doanh-nghiep/${b.id}`}>
                    <div className="px-4 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-[#2740BA] transition-colors">{b.name}</p>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#2740BA] shrink-0 mt-0.5 transition-colors" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-blue-100 text-[#2740BA] font-bold px-2 py-0.5 rounded-full">
                          {b.type}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{b.wardName}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{b.phone}</p>
                    </div>
                  </Link>
                ))
              )
            ) : (
              filteredProd.length === 0 ? (
                <EmptyState label="sản phẩm" />
              ) : (
                filteredProd.map((p) => (
                  <Link key={p.id} href={`/san-pham/${PRODUCT_CATALOG_ID[p.id] ?? p.id}`}>
                    <div className="px-4 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-[#2740BA] transition-colors">{p.name}</p>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#2740BA] shrink-0 mt-0.5 transition-colors" />
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${certColor(p.cert)}`}>
                          {p.cert}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                          <MapPin className="w-3 h-3" />{p.wardName}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-gray-400 gap-2">
      <MapPin className="w-8 h-8 opacity-30" />
      <p className="text-sm">Không có {label} nào trong vùng này</p>
    </div>
  );
}

// ─── GeoJSON style helpers ────────────────────────────────────────────────────

// Diverse multi-color palette — deep, saturated tones, one per region.
const WARD_PALETTE = [
  "#1565C0", // deep blue
  "#E65100", // deep orange
  "#6A1B9A", // deep purple
  "#2E7D32", // deep green
  "#C62828", // deep red
  "#00838F", // deep cyan
  "#BF360C", // dark deep-orange
  "#283593", // deep indigo
  "#558B2F", // dark lime green
  "#AD1457", // deep pink-red
  "#00695C", // deep teal
  "#F57F17", // dark amber
];

function wardFillColor(code: string | number): string {
  const n = typeof code === "number" ? code : parseInt(String(code), 10);
  const idx = isNaN(n)
    ? String(code).split("").reduce((a, c) => a + c.charCodeAt(0), 0)
    : n;
  return WARD_PALETTE[idx % WARD_PALETTE.length];
}

function styleFeature(selectedCode: string | null) {
  return (feature: any) => {
    const code = feature?.properties?.code ?? feature?.id ?? "";
    const isSelected = selectedCode && String(code) === String(selectedCode);
    return {
      fillColor:   isSelected ? "#2740BA" : wardFillColor(code),
      fillOpacity: isSelected ? 0.9 : 0.66,
      color:       "#ffffff",
      weight:      isSelected ? 2.5 : 1.2,
    };
  };
}
