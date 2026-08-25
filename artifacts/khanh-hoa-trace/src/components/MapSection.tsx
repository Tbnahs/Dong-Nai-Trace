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

const LEGACY_BUSINESSES: Business[] = [
  { id: "b1",  name: "HTX Yến sào Nha Trang",            type: "Hợp tác xã",    wardCode: "23.3306", wardName: "Nha Trang",   phone: "0258 352 1234" },
  { id: "b2",  name: "Công ty Hải sản Cam Ranh",         type: "Doanh nghiệp",  wardCode: "23.1259", wardName: "Cam Ranh",    phone: "0258 385 2345" },
  { id: "b3",  name: "HTX Nông nghiệp Diên Khánh",       type: "Hợp tác xã",    wardCode: "23.1068", wardName: "Diên Khánh",  phone: "0258 376 3456" },
  { id: "b4",  name: "Trang trại Xoài Cam Lâm",          type: "Trang trại",    wardCode: "23.1263", wardName: "Cam Lâm",     phone: "0258 398 4567" },
  { id: "b5",  name: "HTX Tỏi sạch Vạn Ninh",             type: "Hợp tác xã",    wardCode: "23.1015", wardName: "Vạn Ninh",    phone: "0258 384 5678" },
  { id: "b6",  name: "Công ty Chế biến Thủy sản Ninh Hòa", type: "Doanh nghiệp", wardCode: "23.1031", wardName: "Ninh Hòa", phone: "0258 363 6789" },
  { id: "b7",  name: "HTX Nông sản Khánh Vĩnh",            type: "Hợp tác xã",    wardCode: "23.1066", wardName: "Khánh Vĩnh",  phone: "0258 379 7890" },
  { id: "b8",  name: "Trang trại Dược liệu Khánh Sơn",     type: "Trang trại",    wardCode: "23.1075", wardName: "Khánh Sơn",   phone: "0258 386 8901" },
  { id: "b9",  name: "HTX Nho sạch Ninh Phước",            type: "Hợp tác xã",    wardCode: "23.1090", wardName: "Ninh Phước",  phone: "0259 388 9012" },
  { id: "b10", name: "Cơ sở Nước mắm Thuận Nam",           type: "Cơ sở sản xuất", wardCode: "23.1096", wardName: "Thuận Nam", phone: "0259 378 0123" },
  { id: "b11", name: "HTX Muối sạch Ninh Hải",             type: "Hợp tác xã",    wardCode: "23.1088", wardName: "Ninh Hải",    phone: "0259 387 1234" },
  { id: "b12", name: "Làng nghề Gốm Bàu Trúc",             type: "Làng nghề",     wardCode: "23.1277", wardName: "Ninh Chu",    phone: "0259 385 2345" },
  { id: "b13", name: "HTX Dê núi Bác Ái",                  type: "Hợp tác xã",    wardCode: "23.1271", wardName: "Bác Ái",      phone: "0259 382 3456" },
  { id: "b14", name: "Công ty Nông sản Thuận Bắc",          type: "Doanh nghiệp",  wardCode: "23.1279", wardName: "Thuận Bắc",   phone: "0259 386 4567" },
  { id: "b15", name: "Trang trại Rau sạch Ninh Sơn",        type: "Trang trại",    wardCode: "23.1273", wardName: "Ninh Sơn",    phone: "0259 385 5678" },
];

const LEGACY_PRODUCTS: Product[] = [
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

const BUSINESSES: Business[] = [
  { id: "b1", name: "HTX Yến sào Nha Trang", type: "Hợp tác xã", wardCode: "23.3306", wardName: "Nha Trang", phone: "0258 352 1234" },
  { id: "b2", name: "Công ty Hải sản Cam Ranh", type: "Doanh nghiệp", wardCode: "23.1259", wardName: "Cam Ranh", phone: "0258 385 2345" },
  { id: "b3", name: "HTX Nông nghiệp Diên Khánh", type: "Hợp tác xã", wardCode: "23.1068", wardName: "Diên Khánh", phone: "0258 376 3456" },
  { id: "b4", name: "Trang trại Xoài Cam Lâm", type: "Trang trại", wardCode: "23.1263", wardName: "Cam Lâm", phone: "0258 398 4567" },
  { id: "b5", name: "HTX Tỏi sạch Vạn Ninh", type: "Hợp tác xã", wardCode: "23.1015", wardName: "Vạn Ninh", phone: "0258 384 5678" },
  { id: "b6", name: "Công ty Chế biến Thủy sản Ninh Hòa", type: "Doanh nghiệp", wardCode: "23.1031", wardName: "Ninh Hòa", phone: "0258 363 6789" },
  { id: "b7", name: "HTX Nông sản Khánh Vĩnh", type: "Hợp tác xã", wardCode: "23.1066", wardName: "Khánh Vĩnh", phone: "0258 379 7890" },
  { id: "b8", name: "Trang trại Dược liệu Khánh Sơn", type: "Trang trại", wardCode: "23.1075", wardName: "Khánh Sơn", phone: "0258 386 8901" },
  { id: "b9", name: "HTX Nho sạch Ninh Phước", type: "Hợp tác xã", wardCode: "23.1090", wardName: "Ninh Phước", phone: "0259 388 9012" },
  { id: "b10", name: "Cơ sở Nước mắm Thuận Nam", type: "Cơ sở sản xuất", wardCode: "23.1096", wardName: "Thuận Nam", phone: "0259 378 0123" },
  { id: "b11", name: "HTX Muối sạch Ninh Hải", type: "Hợp tác xã", wardCode: "23.1088", wardName: "Ninh Hải", phone: "0259 387 1234" },
  { id: "b12", name: "Làng nghề Gốm Bàu Trúc", type: "Làng nghề", wardCode: "23.1277", wardName: "Ninh Chu", phone: "0259 385 2345" },
  { id: "b13", name: "HTX Dê núi Bác Ái", type: "Hợp tác xã", wardCode: "23.1271", wardName: "Bác Ái", phone: "0259 382 3456" },
  { id: "b14", name: "Công ty Nông sản Thuận Bắc", type: "Doanh nghiệp", wardCode: "23.1279", wardName: "Thuận Bắc", phone: "0259 386 4567" },
  { id: "b15", name: "Trang trại Rau sạch Ninh Sơn", type: "Trang trại", wardCode: "23.1273", wardName: "Ninh Sơn", phone: "0259 385 5678" },
];

const PRODUCTS: Product[] = [
  { id: "p1", name: "Yến sào Khánh Hòa", category: "Đặc sản", wardCode: "23.3306", wardName: "Nha Trang", cert: "OCOP 5★" },
  { id: "p2", name: "Tôm hùm xanh Cam Ranh", category: "Thủy sản", wardCode: "23.1259", wardName: "Cam Ranh", cert: "VietGAP" },
  { id: "p3", name: "Xoài Úc Cam Lâm", category: "Trái cây", wardCode: "23.1263", wardName: "Cam Lâm", cert: "VietGAP" },
  { id: "p4", name: "Rau an toàn Diên Khánh", category: "Rau củ", wardCode: "23.1068", wardName: "Diên Khánh", cert: "VietGAP" },
  { id: "p5", name: "Tỏi trắng Vạn Ninh", category: "Gia vị", wardCode: "23.1015", wardName: "Vạn Ninh", cert: "OCOP 4★" },
  { id: "p6", name: "Nước mắm truyền thống Ninh Hòa", category: "Thực phẩm chế biến", wardCode: "23.1031", wardName: "Ninh Hòa", cert: "HACCP" },
  { id: "p7", name: "Mật ong rừng Khánh Vĩnh", category: "Đặc sản", wardCode: "23.1066", wardName: "Khánh Vĩnh", cert: "OCOP 3★" },
  { id: "p8", name: "Dược liệu Khánh Sơn", category: "Dược liệu", wardCode: "23.1075", wardName: "Khánh Sơn", cert: "GACP" },
  { id: "p9", name: "Nho xanh Ninh Phước", category: "Trái cây", wardCode: "23.1090", wardName: "Ninh Phước", cert: "VietGAP" },
  { id: "p10", name: "Muối tinh khiết Ninh Hải", category: "Thực phẩm", wardCode: "23.1088", wardName: "Ninh Hải", cert: "OCOP 4★" },
  { id: "p11", name: "Nước mắm cá cơm Thuận Nam", category: "Thực phẩm chế biến", wardCode: "23.1096", wardName: "Thuận Nam", cert: "HACCP" },
  { id: "p12", name: "Gốm thủ công Bàu Trúc", category: "Thủ công mỹ nghệ", wardCode: "23.1277", wardName: "Ninh Chu", cert: "OCOP 4★" },
  { id: "p13", name: "Thịt dê núi Bác Ái", category: "Thịt & Chăn nuôi", wardCode: "23.1271", wardName: "Bác Ái", cert: "VietGAP" },
  { id: "p14", name: "Nho khô Thuận Bắc", category: "Thực phẩm chế biến", wardCode: "23.1279", wardName: "Thuận Bắc", cert: "OCOP 4★" },
  { id: "p15", name: "Rau hữu cơ Ninh Sơn", category: "Rau củ", wardCode: "23.1273", wardName: "Ninh Sơn", cert: "VietGAP" },
];

// ─── Ward list extracted from Khánh Hòa map data ─────────────────────────────
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
  const placeMarkerRef = useRef<((latlng: any, wardName?: string) => void) | null>(null);

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
        center:             [12.25, 109.15],
        zoom:               8,
        minZoom:            7,
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
      placeMarkerRef.current = placeMarker;

      // ── Map click: place marker only inside Khánh Hòa wards ───────────────
      map.on("click", (e: any) => {
        // Check if click is within any ward feature
        let insideKhanhHoa = false;
        if (geoLayer.current) {
          geoLayer.current.eachLayer((l: any) => {
            if (insideKhanhHoa) return;
            if (l.getBounds && l.getBounds().contains(e.latlng)) {
              // Rough bbox check — good enough for restriction UX
              insideKhanhHoa = true;
            }
          });
        }
        if (!insideKhanhHoa) return;
        placeMarker(e.latlng);
      });

      // Load GeoJSON (BASE_PATH is now "/")
      fetch(import.meta.env.BASE_URL + "geojson/khanhhoa_wards.geojson", {
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
                 permanent: true,
                 direction: "center",
                 sticky: true,
                 className: "leaflet-tooltip-custom",
               });
            },
          }).addTo(map);
          geoLayer.current = layer;
          provinceBoundsRef.current = layer.getBounds();
          setMapDataReady(true);
          // Fit map tightly to Khánh Hòa after GeoJSON loads
          map.fitBounds(provinceBoundsRef.current, { padding: [16, 16] });
        })
        .catch((error) => {
          if (error?.name !== "AbortError") {
            console.error("Unable to load Khánh Hòa map data", error);
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
      const center = bounds.getCenter();
      placeMarkerRef.current?.(center, selectedWard.name);
    }
  }, [selectedWard, mapDataReady]);

  return (
    <section className="py-16 px-4 md:px-6 lg:px-10 bg-[#F5F7FA]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto mb-8 flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-[#2740BA] uppercase tracking-widest">
            Bản đồ
          </span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold uppercase mt-1 text-[#2740ba]">
            Doanh nghiệp &amp; Sản phẩm{" "}
            Khánh Hòa
          </h2>
        
        </div>

        {/* Ward dropdown */}
        <div className="relative md:ml-auto w-full md:w-auto md:min-w-[200px]">
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
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-4">

        {/* ── Map 60% ── */}
        <div className="lg:w-[60%] h-[300px] lg:h-[560px] rounded-2xl overflow-hidden shadow-md border border-gray-200 relative" style={{ zIndex: 0, isolation: "isolate" }}>
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
        <div className="lg:w-[40%] h-[400px] lg:h-[560px] bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
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

// Diverse multi-color palette — one distinct color per region.
const WARD_PALETTE = [
  "#2196F3", // blue
  "#FF9800", // orange
  "#9C27B0", // purple
  "#4CAF50", // green
  "#F44336", // red
  "#00BCD4", // cyan
  "#FF5722", // deep orange
  "#3F51B5", // indigo
  "#8BC34A", // light green
  "#E91E63", // pink-red
  "#009688", // teal
  "#FFC107", // amber
  "#1565C0", // dark blue
  "#EF6C00", // dark orange
  "#6A1B9A", // dark purple
  "#2E7D32", // dark green
  "#C62828", // dark red
  "#00838F", // dark cyan
  "#D84315", // dark deep orange
  "#283593", // dark indigo
  "#558B2F", // dark lime
  "#AD1457", // dark pink
  "#00695C", // dark teal
  "#F9A825", // dark amber
];

function wardFillColor(code: string | number): string {
  const value = String(code);
  const hash = Array.from(value).reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );
  return WARD_PALETTE[hash % WARD_PALETTE.length];
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
