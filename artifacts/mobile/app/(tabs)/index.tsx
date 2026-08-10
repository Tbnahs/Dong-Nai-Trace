import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import WebView from 'react-native-webview';
import { useAuth } from '@/context/AuthContext';
import {
  BUSINESSES,
  NEWS,
  PRODUCTS,
  STATS,
  lookupByGTIN,
  lookupByTraceCode,
} from '@/data/mock';

const HERO_GUIDE = require('@/assets/images/hero-guide.png');

const CERT_COLORS: Record<string, string> = {
  VietGAP: '#16A34A',
  GlobalGAP: '#0369A1',
  OCOP: '#D97706',
  'Hữu cơ': '#7C3AED',
  HACCP: '#DC2626',
};

// ─── Map section data (matches portal MapSection) ────────────────────────────
const MAP_BUSINESSES = [
  { id: 'b1',  name: 'HTX Nông nghiệp Bình Phước',      type: 'Hợp tác xã',   wardCode: '25195', wardName: 'Bình Phước',  phone: '0251 123 456' },
  { id: 'b2',  name: 'Cty TNHH Xuất khẩu Đồng Xoài',   type: 'Doanh nghiệp', wardCode: '25210', wardName: 'Đồng Xoài',  phone: '0251 234 567' },
  { id: 'b3',  name: 'Trang trại Phước Long Xanh',       type: 'Trang trại',   wardCode: '25217', wardName: 'Phước Long', phone: '0251 345 678' },
  { id: 'b4',  name: 'Cty CP Nông sản Bình Tân',         type: 'Doanh nghiệp', wardCode: '25246', wardName: 'Bình Tân',   phone: '0251 456 789' },
  { id: 'b5',  name: 'HTX Rau sạch Lộc Ninh',            type: 'Hợp tác xã',   wardCode: '25270', wardName: 'Lộc Ninh',  phone: '0251 567 890' },
  { id: 'b6',  name: 'Cty TNHH Nông sản Lộc Tấn',       type: 'Doanh nghiệp', wardCode: '25279', wardName: 'Lộc Tấn',   phone: '0251 678 901' },
  { id: 'b7',  name: 'HTX Cây ăn trái Long Hà',          type: 'Hợp tác xã',   wardCode: '25255', wardName: 'Long Hà',   phone: '0251 789 012' },
  { id: 'b8',  name: 'Trang trại Tân Triều Organic',     type: 'Trang trại',   wardCode: '26188', wardName: 'Tân Triều', phone: '0251 890 123' },
  { id: 'b9',  name: 'Cty CP Nông sản Hưng Thịnh',       type: 'Doanh nghiệp', wardCode: '26281', wardName: 'Hưng Thịnh',phone: '0251 901 234' },
  { id: 'b10', name: 'HTX Bưởi Vĩnh Cửu',                type: 'Hợp tác xã',   wardCode: '26170', wardName: 'Trị An',    phone: '0251 012 345' },
  { id: 'b11', name: 'Cty TNHH Chế biến Biên Hòa',       type: 'Doanh nghiệp', wardCode: '26068', wardName: 'Biên Hòa',  phone: '0251 111 222' },
  { id: 'b12', name: 'HTX Xoài Đầu Giây',                 type: 'Hợp tác xã',   wardCode: '26326', wardName: 'Dầu Giây', phone: '0251 222 333' },
  { id: 'b13', name: 'Trang trại Nhơn Trạch Green',       type: 'Trang trại',   wardCode: '26485', wardName: 'Nhơn Trạch',phone: '0251 333 444' },
  { id: 'b14', name: 'Cty CP Nông nghiệp Cam Mỹ',         type: 'Doanh nghiệp', wardCode: '26341', wardName: 'Cẩm Mỹ',   phone: '0251 444 555' },
  { id: 'b15', name: 'HTX Thanh long Xuân Lộc',            type: 'Hợp tác xã',   wardCode: '26104', wardName: 'Xuân Lập', phone: '0251 555 666' },
];

const MAP_PRODUCTS = [
  { id: 'p1',  name: 'Xoài Cát Hòa Lộc',         category: 'Trái cây',  wardCode: '25195', wardName: 'Bình Phước', cert: 'VietGAP' },
  { id: 'p2',  name: 'Bưởi Tân Triều',             category: 'Trái cây',  wardCode: '26188', wardName: 'Tân Triều',  cert: 'VietGAP' },
  { id: 'p3',  name: 'Chuối tiêu hồng',            category: 'Trái cây',  wardCode: '25210', wardName: 'Đồng Xoài', cert: 'GlobalGAP' },
  { id: 'p4',  name: 'Rau muống hữu cơ',           category: 'Rau củ',    wardCode: '25217', wardName: 'Phước Long', cert: 'Hữu cơ' },
  { id: 'p5',  name: 'Cà chua bi VietGAP',         category: 'Rau củ',    wardCode: '25246', wardName: 'Bình Tân',   cert: 'VietGAP' },
  { id: 'p6',  name: 'Tiêu đen Lộc Ninh',          category: 'Gia vị',    wardCode: '25270', wardName: 'Lộc Ninh',  cert: 'OCOP 4★' },
  { id: 'p7',  name: 'Điều rang muối Long Hà',      category: 'Hạt',       wardCode: '25255', wardName: 'Long Hà',   cert: 'ISO 22000' },
  { id: 'p8',  name: 'Nấm linh chi Lộc Tấn',       category: 'Nấm',       wardCode: '25279', wardName: 'Lộc Tấn',   cert: 'VietGAP' },
  { id: 'p9',  name: 'Mật ong rừng Trị An',         category: 'Mật ong',   wardCode: '26170', wardName: 'Trị An',    cert: 'OCOP 3★' },
  { id: 'p10', name: 'Thanh long ruột đỏ',          category: 'Trái cây',  wardCode: '26104', wardName: 'Xuân Lập',  cert: 'GlobalGAP' },
  { id: 'p11', name: 'Sầu riêng Ri6 Hưng Thịnh',   category: 'Trái cây',  wardCode: '26281', wardName: 'Hưng Thịnh',cert: 'VietGAP' },
  { id: 'p12', name: 'Xoài Đài Loan Dầu Giây',      category: 'Trái cây',  wardCode: '26326', wardName: 'Dầu Giây', cert: 'VietGAP' },
  { id: 'p13', name: 'Rau thủy canh Nhơn Trạch',    category: 'Rau củ',    wardCode: '26485', wardName: 'Nhơn Trạch',cert: 'Hữu cơ' },
  { id: 'p14', name: 'Cam sành Cẩm Mỹ',             category: 'Trái cây',  wardCode: '26341', wardName: 'Cẩm Mỹ',   cert: 'OCOP 4★' },
  { id: 'p15', name: 'Tôm thẻ chân trắng Biên Hòa', category: 'Thủy sản', wardCode: '26068', wardName: 'Biên Hòa',  cert: 'ASC' },
];

// Map catalogue short IDs → detail screen IDs (now using b1-b12, sp001-sp012)
const MAP_BUSINESS_DETAIL_IDS: Record<string, string> = {
  b1: 'b1',  b2: 'b2',  b3: 'b3',  b4: 'b4',  b5: 'b5',
  b6: 'b6',  b7: 'b7',  b8: 'b8',  b9: 'b9',  b10: 'b10',
  b11: 'b11', b12: 'b12', b13: 'b1', b14: 'b2', b15: 'b3',
};

const MAP_PRODUCT_DETAIL_IDS: Record<string, string> = {
  p1:  'sp001', p2:  'sp002', p3:  'sp003', p4:  'sp004', p5:  'sp005',
  p6:  'sp006', p7:  'sp007', p8:  'sp008', p9:  'sp009', p10: 'sp010',
  p11: 'sp011', p12: 'sp012', p13: 'sp001', p14: 'sp002', p15: 'sp003',
};

const MAP_WARDS = Array.from(
  new Map(
    [...MAP_BUSINESSES, ...MAP_PRODUCTS].map(item => [item.wardCode, { code: item.wardCode, name: item.wardName }])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name, 'vi'));

const CERT_COLOR_MAP: Record<string, { bg: string; text: string }> = {
  GlobalGAP: { bg: '#DCFCE7', text: '#15803D' },
  VietGAP:   { bg: '#DBEAFE', text: '#1D4ED8' },
  OCOP:      { bg: '#FFEDD5', text: '#C2410C' },
  ISO:       { bg: '#F3E8FF', text: '#7E22CE' },
  'Hữu cơ': { bg: '#ECFCCB', text: '#3F6212' },
  ASC:       { bg: '#CFFAFE', text: '#0E7490' },
};
function mapCertStyle(cert: string) {
  const key = Object.keys(CERT_COLOR_MAP).find(k => cert.includes(k));
  return key ? CERT_COLOR_MAP[key] : { bg: '#F1F5F9', text: '#64748B' };
}

function CertBadge({ label }: { label: string }) {
  const colors = useColors();
  const color = CERT_COLORS[label.split(' ')[0]] ?? colors.mutedForeground;
  return (
    <View style={[styles.certBadge, { backgroundColor: `${color}18`, borderColor: `${color}55` }]}>
      <Text style={[styles.certBadgeText, { color }]}>{label}</Text>
    </View>
  );
}

function ProductCard({ product, onPress }: { product: typeof PRODUCTS[0]; onPress: () => void }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.productCard,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 },
      ]}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.productCardImage}
        resizeMode="cover"
      />
      <View style={styles.productCardBody}>
        <Text style={[styles.productCardName, { color: colors.foreground }]} numberOfLines={2}>{product.name}</Text>
        <Text style={[styles.productCardBusiness, { color: colors.mutedForeground }]} numberOfLines={1}>{product.businessName}</Text>
        <View style={styles.productCardCerts}>
          {product.certifications.slice(0, 2).map(c => <CertBadge key={c} label={c} />)}
        </View>
      </View>
    </Pressable>
  );
}

function NewsCard({ item, onPress }: { item: typeof NEWS[0]; onPress: () => void }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.newsCard,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.newsCardImage} resizeMode="cover" />
      <View style={styles.newsCardBody}>
        <View style={[styles.newsCategoryChip, { backgroundColor: colors.orangeLight }]}>
          <Text style={[styles.newsCategoryText, { color: colors.accent }]}>{item.category}</Text>
        </View>
        <Text style={[styles.newsCardTitle, { color: colors.foreground }]} numberOfLines={2}>{item.title}</Text>
        <Text style={[styles.newsCardDate, { color: colors.mutedForeground }]}>{item.date}</Text>
      </View>
    </Pressable>
  );
}

function SectionHeading({ title, onMore }: { title: string; onMore: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
      <Text style={[styles.sectionTitle, { color: colors.primary }]}>{title}</Text>
      <Pressable onPress={onMore} hitSlop={8}>
        <Text style={[styles.sectionMore, { color: colors.accent }]}>Xem tất cả</Text>
      </Pressable>
    </View>
  );
}

const MAP_PAGE_SIZE = 5;

// The map is rendered inside an iframe/WebView, so it must use the API's
// absolute URL instead of a path that resolves against the inline document.
// Mobile and portal must use the same ward boundaries. The artifact workflow
// injects EXPO_PUBLIC_DOMAIN with the Replit dev/deployment domain, where the
// API is routed at /api.
const API_DOMAIN = (
  process.env.EXPO_PUBLIC_API_DOMAIN?.trim() ||
  process.env.EXPO_PUBLIC_DOMAIN?.trim()
);
const GEOJSON_URL = API_DOMAIN
  ? `https://${API_DOMAIN}/api/geojson/wards`
  : '';

function buildLeafletHTML(geojsonUrl: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body,#map{width:100%;height:100%;overflow:hidden}
#loading{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(255,255,255,.92);padding:10px 18px;border-radius:8px;font-family:sans-serif;font-size:13px;color:#2740BA;z-index:9999;white-space:nowrap}
.leaflet-tooltip-custom{font-family:-apple-system,sans-serif;font-size:11px;font-weight:500}
</style>
</head>
<body>
<div id="map"></div>
<div id="loading">Đang tải bản đồ...</div>
<script>
var GEOJSON_URL=${JSON.stringify(geojsonUrl)};
var sel=null,geoLayer=null,marker=null,provBounds=null;
var PAL=["#2196F3","#FF9800","#9C27B0","#4CAF50","#F44336","#00BCD4","#FF5722","#3F51B5","#8BC34A","#E91E63","#009688","#FFC107"];
function wColor(c){var n=parseInt(String(c),10);var i=isNaN(n)?String(c).split('').reduce(function(a,x){return a+x.charCodeAt(0)},0):n;return PAL[i%PAL.length]}
function fStyle(selCode){return function(f){var c=(f.properties&&f.properties.code)||f.id||'';var s=selCode&&String(c)===String(selCode);return{fillColor:s?'#2740BA':wColor(c),fillOpacity:s?0.9:0.66,color:'#fff',weight:s?2.5:1.2}}}
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'});
var map=L.map('map',{center:[11.05,107.17],zoom:9,minZoom:8,maxZoom:13,zoomControl:true,attributionControl:false});
function putMarker(ll,nm){if(marker)marker.remove();marker=L.marker(ll,{title:nm||''}).addTo(map);if(nm)marker.bindPopup('<div style="font-size:13px;font-weight:600;color:#2740BA">'+nm+'</div>',{closeButton:false}).openPopup();map.flyTo(ll,Math.max(map.getZoom(),11),{animate:true,duration:0.8})}
function send(d){var s=JSON.stringify(d);if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(s);else if(window.parent)window.parent.postMessage(s,'*')}
  function renderGeoJSON(data){
     document.getElementById('loading').style.display='none';
     geoLayer=L.geoJSON(data,{style:fStyle(null),onEachFeature:function(f,ly){
       var p=f.properties||{};
       ly.on({
         mouseover:function(e){e.target.setStyle({fillOpacity:0.85,weight:2})},
         mouseout:function(e){geoLayer.resetStyle(e.target)},
         click:function(e){
           L.DomEvent.stopPropagation(e);
           var nw=(!sel||String(sel.code)!==String(p.code))?{code:p.code,name:p.name}:null;
           sel=nw;
           geoLayer.setStyle(fStyle(sel?sel.code:null));
           if(sel){putMarker(e.latlng,p.fullName||p.name)}
           else{if(marker){marker.remove();marker=null}if(provBounds)map.flyToBounds(provBounds,{padding:[16,16]})}
           send({type:'wardSelected',ward:sel});
         }
       });
       ly.bindTooltip(p.fullName||p.name,{sticky:true,className:'leaflet-tooltip-custom'});
     }}).addTo(map);
     provBounds=geoLayer.getBounds();map.fitBounds(provBounds,{padding:[16,16]});
  }
  if(GEOJSON_URL){
    fetch(GEOJSON_URL).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}).then(renderGeoJSON).catch(function(){document.getElementById('loading').textContent='Không thể kết nối dữ liệu bản đồ.'});
  }else{
    document.getElementById('loading').textContent='Chưa cấu hình kết nối API bản đồ.';
  }
function onMsg(raw){try{var m=typeof raw==='string'?JSON.parse(raw):raw;if(m.type==='selectWard'){sel=m.ward;if(!geoLayer)return;geoLayer.setStyle(fStyle(sel?sel.code:null));if(!sel){if(marker){marker.remove();marker=null}if(provBounds)map.flyToBounds(provBounds,{padding:[16,16]})}else{geoLayer.eachLayer(function(l){if(l.feature&&String(l.feature.properties.code)===String(sel.code)){var b=l.getBounds&&l.getBounds();if(b&&b.isValid())putMarker(b.getCenter(),sel.name)}})}}}catch(e){}}
document.addEventListener('message',function(e){onMsg(e.data)});
window.addEventListener('message',function(e){onMsg(e.data)});
</script>
</body>
</html>`;
}

const LEAFLET_HTML = buildLeafletHTML(GEOJSON_URL);

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isLoggedIn } = useAuth();
  const [traceCode, setTraceCode] = useState('');
  const [useGtin, setUseGtin] = useState(false);
  const [gtin, setGtin] = useState('');
  const [lot, setLot] = useState('');
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  // Map section state
  const [mapTab, setMapTab] = useState<'business' | 'product'>('business');
  const [selectedMapWard, setSelectedMapWard] = useState<{ code: string; name: string } | null>(null);
  const [wardModalVisible, setWardModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scannerLocked, setScannerLocked] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [bizPage, setBizPage] = useState(1);
  const [prodPage, setProdPage] = useState(1);
  const webViewRef = useRef<any>(null);
  const iframeRef = useRef<any>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  // On web: listen for postMessage from the Leaflet iframe
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handler = (e: MessageEvent) => {
      try {
        const msg = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (msg?.type === 'wardSelected') {
          setSelectedMapWard(msg.ward);
          setBizPage(1);
          setProdPage(1);
        }
      } catch (_) {}
    };
    (window as any).addEventListener('message', handler);
    return () => (window as any).removeEventListener('message', handler);
  }, []);

  const filteredMapBiz  = selectedMapWard ? MAP_BUSINESSES.filter(b => b.wardCode === selectedMapWard.code) : MAP_BUSINESSES;
  const filteredMapProd = selectedMapWard ? MAP_PRODUCTS.filter(p => p.wardCode === selectedMapWard.code) : MAP_PRODUCTS;
  const pagedBiz  = filteredMapBiz.slice(0, bizPage * MAP_PAGE_SIZE);
  const pagedProd = filteredMapProd.slice(0, prodPage * MAP_PAGE_SIZE);
  const hasMoreBiz  = pagedBiz.length < filteredMapBiz.length;
  const hasMoreProd = pagedProd.length < filteredMapProd.length;

  // Notify the map when ward selection changes (WebView on native, iframe on web)
  const syncWardToMap = (ward: { code: string; name: string } | null) => {
    try {
      const msg = JSON.stringify({ type: 'selectWard', ward });
      if (Platform.OS === 'web') {
        iframeRef.current?.contentWindow?.postMessage(msg, '*');
      } else {
        webViewRef.current?.postMessage(msg);
      }
    } catch (_) {}
  };

  const handleSearch = async () => {
    setNotFound(false);
    const query = useGtin ? gtin.trim() : traceCode.trim();
    if (!query) {
      Alert.alert('Thông báo', 'Vui lòng nhập mã tra cứu');
      return;
    }
    setSearching(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise(resolve => setTimeout(resolve, 300));
    const found = useGtin
      ? lookupByGTIN(gtin.trim(), lot.trim())
      : lookupByTraceCode(traceCode.trim());
    setSearching(false);
    if (found) {
      router.push(`/product/${found.id}${useGtin ? '?access=gtin' : ''}`);
    } else {
      setNotFound(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const openScanner = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Quét mã trên điện thoại', 'Mở ứng dụng bằng Expo Go trên điện thoại để sử dụng camera quét mã.');
      return;
    }

    if (!cameraPermission?.granted) {
      if (cameraPermission?.status === 'denied' && !cameraPermission.canAskAgain) {
        Alert.alert(
          'Camera đang bị chặn',
          'Vui lòng cho phép ứng dụng truy cập camera trong phần Cài đặt của thiết bị.',
          [
            { text: 'Để sau', style: 'cancel' },
            { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      const permission = await requestCameraPermission();
      if (!permission.granted) return;
    }

    setScannerLocked(false);
    setScannerVisible(true);
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scannerLocked || !data.trim()) return;
    setScannerLocked(true);
    if (useGtin) {
      setGtin(data.trim());
    } else {
      setTraceCode(data.trim());
    }
    setNotFound(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setScannerVisible(false);
  };

  const scanButton = (
    <Pressable
      onPress={openScanner}
      accessibilityRole="button"
      accessibilityLabel="Quét mã QR hoặc mã vạch bằng camera"
      hitSlop={8}
      style={({ pressed }) => [styles.scanButton, { opacity: pressed ? 0.55 : 1 }]}
    >
      <Ionicons name="scan-outline" size={22} color={colors.primary} />
    </Pressable>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* TOP HEADER */}
      <View style={[styles.topHeader, { paddingTop: topPad + 10, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.push('/')} style={styles.brand} hitSlop={6}>
          <Image source={require('@/assets/images/logo-skhcn.png')} style={styles.logo} />
          <View>
            <Text style={[styles.brandName, { color: colors.primary }]}>ĐỒNG NAI TRACE</Text>
            <Text style={[styles.brandTagline, { color: colors.mutedForeground }]}>HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM</Text>
          </View>
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setLanguageModalVisible(true);
            }}
            style={styles.headerIcon}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Ngôn ngữ"
          >
            <Feather name="globe" size={19} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      {/* HERO */}
      <View style={styles.hero}>
        <Text style={[styles.heroTitle, { color: colors.primary }]}>
          TRUY XUẤT NGUỒN GỐC{'\n'}SẢN PHẨM, HÀNG HÓA{'\n'}THÀNH PHỐ ĐỒNG NAI
        </Text>
        <Text style={[styles.heroDesc, { color: colors.mutedForeground }]}>
          Nhờ ứng dụng công nghệ tiên tiến, hệ thống cho phép định danh, truy vết nguồn gốc sản phẩm hàng hóa tại Thành phố Đồng Nai.
        </Text>

        <View style={styles.searchArea}>
          {!useGtin ? (
            <View style={[styles.inputRow, { backgroundColor: colors.background, borderColor: colors.border }]}>
              {scanButton}
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="Nhập mã truy xuất sản phẩm"
                placeholderTextColor={colors.mutedForeground}
                value={traceCode}
                onChangeText={value => { setTraceCode(value); setNotFound(false); }}
                autoCapitalize="characters"
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
            </View>
          ) : (
            <View style={styles.gtinFields}>
              <View style={[styles.inputRow, { backgroundColor: colors.background, borderColor: colors.border }]}>
                {scanButton}
                <TextInput style={[styles.input, { color: colors.foreground }]} placeholder="Nhập mã GTIN" placeholderTextColor={colors.mutedForeground} value={gtin} onChangeText={setGtin} keyboardType="numeric" />
              </View>
              <View style={[styles.inputRow, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Ionicons name="cube-outline" size={20} color={colors.primary} />
                <TextInput style={[styles.input, { color: colors.foreground }]} placeholder="Nhập số lô / mẻ" placeholderTextColor={colors.mutedForeground} value={lot} onChangeText={setLot} />
              </View>
            </View>
          )}

          {notFound && (
            <View style={[styles.notFoundBox, { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }]}>
              <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
              <Text style={[styles.notFoundText, { color: '#DC2626' }]}>Không tìm thấy sản phẩm. Vui lòng kiểm tra lại mã.</Text>
            </View>
          )}

          <Pressable onPress={handleSearch} disabled={searching} style={({ pressed }) => [styles.searchButton, { backgroundColor: colors.accent, opacity: pressed || searching ? 0.82 : 1 }]}>
            {searching ? <ActivityIndicator color={colors.primaryForeground} size="small" /> : <><Text style={styles.searchButtonText}>Tra cứu</Text><Ionicons name="arrow-forward" size={18} color={colors.accentForeground} /></>}
          </Pressable>

          <View style={styles.radioRow}>
            <Pressable onPress={() => { setUseGtin(false); setNotFound(false); }} style={styles.radioOption}>
              <View style={[styles.radio, { borderColor: colors.primary }]}>{!useGtin && <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />}</View>
              <Text style={[styles.radioText, { color: colors.foreground }]}>Mã truy xuất sản phẩm</Text>
            </Pressable>
            <Pressable onPress={() => { setUseGtin(true); setNotFound(false); }} style={styles.radioOption}>
              <View style={[styles.radio, { borderColor: colors.primary }]}>{useGtin && <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />}</View>
              <Text style={[styles.radioText, { color: colors.foreground }]}>Mã GTIN &amp; Số lô đóng gói</Text>
            </Pressable>
          </View>
        </View>

        <Image source={HERO_GUIDE} style={styles.heroImage} resizeMode="contain" />
      </View>

      <Modal
        visible={scannerVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setScannerVisible(false)}
      >
        <View style={styles.scannerContainer}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'upc_a', 'upc_e', 'itf14', 'datamatrix', 'pdf417'] }}
            onBarcodeScanned={scannerLocked ? undefined : handleBarcodeScanned}
          />
          <View style={[styles.scannerTopBar, { paddingTop: insets.top + 12 }]}>
            <Pressable
              onPress={() => setScannerVisible(false)}
              accessibilityLabel="Đóng camera"
              hitSlop={10}
              style={styles.scannerCloseButton}
            >
              <Ionicons name="close" size={25} color="#FFFFFF" />
            </Pressable>
            <Text style={[styles.scannerTitle, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Quét mã tra cứu</Text>
            <View style={styles.scannerCloseButton} />
          </View>
          <View style={styles.scannerGuideWrap} pointerEvents="none">
            <View style={styles.scannerGuide}>
              <View style={[styles.scannerCorner, styles.cornerTopLeft]} />
              <View style={[styles.scannerCorner, styles.cornerTopRight]} />
              <View style={[styles.scannerCorner, styles.cornerBottomLeft]} />
              <View style={[styles.scannerCorner, styles.cornerBottomRight]} />
            </View>
            <View style={styles.scannerHint}>
              <Ionicons name="scan-outline" size={16} color="#FFFFFF" />
              <Text style={[styles.scannerHintText, { fontFamily: 'BeVietnamPro_500Medium' }]}>Đưa mã QR hoặc mã vạch vào khung</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* STATS */}
      <View style={[styles.statsBox, { backgroundColor: colors.softBackground, borderColor: colors.border }]}>
        <View style={styles.statItem}>
          <Ionicons name="cube-outline" size={26} color={colors.accent} />
          <Text style={[styles.statValue, { color: colors.accent }]}>{STATS.products.toLocaleString('vi-VN')}</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>SẢN PHẨM ĐÃ ĐĂNG KÝ</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="business-outline" size={26} color={colors.accent} />
          <Text style={[styles.statValue, { color: colors.accent }]}>{STATS.businesses.toLocaleString('vi-VN')}</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>DOANH NGHIỆP THAM GIA</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="link-outline" size={26} color={colors.accent} />
          <Text style={[styles.statValue, { color: colors.accent }]}>{STATS.districts.toLocaleString('vi-VN')}</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>CẤP MÃ ĐỊNH DANH</Text>
        </View>
      </View>

      {/* BẢN ĐỒ SECTION */}
      <View style={[styles.mapSection, { backgroundColor: '#F5F7FA' }]}>
        {/* Header */}
        <View style={styles.mapHeader}>
          <View>
            <Text style={styles.mapSubLabel}>BẢN ĐỒ</Text>
            <Text style={[styles.mapTitle, { color: colors.primary }]}>Doanh nghiệp &amp; Sản phẩm{'\n'}Đồng Nai</Text>
          </View>
          {/* Ward picker button */}
          <Pressable
            onPress={() => setWardModalVisible(true)}
            style={[styles.wardPickerBtn, { backgroundColor: colors.background, borderColor: colors.border }]}
          >
            <Ionicons name="location-outline" size={14} color={colors.primary} />
            <Text style={[styles.wardPickerText, { color: colors.foreground }]} numberOfLines={1}>
              {selectedMapWard ? selectedMapWard.name : 'Tất cả phường/xã'}
            </Text>
            <Ionicons name="chevron-down" size={13} color={colors.mutedForeground} />
          </Pressable>
        </View>

        {/* Leaflet interactive map — WebView on native, iframe on Expo web */}
        <View style={styles.mapImageWrap}>
          {Platform.OS === 'web'
            ? React.createElement('iframe', {
                ref: iframeRef,
                srcDoc: LEAFLET_HTML,
                style: { width: '100%', height: '100%', border: 'none' },
              })
            : (
              <WebView
                ref={webViewRef}
                source={{ html: LEAFLET_HTML }}
                style={styles.mapWebView}
                scrollEnabled={false}
                onMessage={(e) => {
                  try {
                    const msg = JSON.parse(e.nativeEvent.data);
                    if (msg.type === 'wardSelected') {
                      setSelectedMapWard(msg.ward);
                      setBizPage(1);
                      setProdPage(1);
                    }
                  } catch (_) {}
                }}
              />
            )
          }
          {selectedMapWard && (
            <View style={[styles.mapChip, { backgroundColor: colors.primary }]}>
              <Ionicons name="location" size={12} color="#FFF" />
              <Text style={styles.mapChipText}>{selectedMapWard.name}</Text>
              <Pressable onPress={() => {
                setSelectedMapWard(null);
                setBizPage(1); setProdPage(1);
                syncWardToMap(null);
              }} hitSlop={8}>
                <Ionicons name="close" size={12} color="#FFF" />
              </Pressable>
            </View>
          )}
        </View>

        {/* Panel: tabs + list */}
        <View style={[styles.mapPanel, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Tabs */}
          <View style={[styles.mapTabs, { borderBottomColor: colors.border }]}>
            {(['business', 'product'] as const).map(tab => {
              const label = tab === 'business' ? 'Doanh nghiệp' : 'Sản phẩm';
              const count = tab === 'business' ? filteredMapBiz.length : filteredMapProd.length;
              const active = mapTab === tab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setMapTab(tab)}
                  style={[styles.mapTab, active && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
                >
                  <Ionicons
                    name={tab === 'business' ? 'business-outline' : 'cube-outline'}
                    size={15}
                    color={active ? colors.primary : colors.mutedForeground}
                  />
                  <Text style={[styles.mapTabText, { color: active ? colors.primary : colors.mutedForeground }]}>{label}</Text>
                  <View style={[styles.mapTabBadge, { backgroundColor: active ? colors.primary : '#E2E8F0' }]}>
                    <Text style={[styles.mapTabBadgeText, { color: active ? '#FFF' : colors.mutedForeground }]}>{count}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Filter label */}
          {selectedMapWard && (
            <View style={[styles.mapFilterBar, { backgroundColor: '#EFF6FF', borderBottomColor: '#BFDBFE' }]}>
              <Ionicons name="location-outline" size={12} color={colors.primary} />
              <Text style={[styles.mapFilterText, { color: colors.primary }]}>
                Đang lọc: <Text style={{ fontFamily: 'BeVietnamPro_700Bold' }}>{selectedMapWard.name}</Text>
              </Text>
              <Pressable onPress={() => { setSelectedMapWard(null); setBizPage(1); setProdPage(1); syncWardToMap(null); }} hitSlop={8} style={{ marginLeft: 'auto' }}>
                <Ionicons name="close" size={14} color={colors.primary} />
              </Pressable>
            </View>
          )}

          {/* List */}
          {mapTab === 'business' ? (
            filteredMapBiz.length === 0 ? (
              <View style={styles.mapEmpty}>
                <Ionicons name="location-outline" size={28} color="#CBD5E1" />
                <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>Không có doanh nghiệp nào trong vùng này</Text>
              </View>
            ) : (
              <>
                {pagedBiz.map(b => (
                  <Pressable
                    key={b.id}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      router.push(`/business/${MAP_BUSINESS_DETAIL_IDS[b.id] ?? 'b1'}`);
                    }}
                    style={({ pressed }) => [
                      styles.mapListItem,
                      { borderBottomColor: colors.border, opacity: pressed ? 0.72 : 1 },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.mapListName, { color: colors.foreground }]}>{b.name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                        <View style={[styles.mapListBadge, { backgroundColor: '#DBEAFE' }]}>
                          <Text style={{ fontSize: 10, color: '#1D4ED8', fontFamily: 'BeVietnamPro_700Bold' }}>{b.type}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                          <Ionicons name="location-outline" size={11} color={colors.mutedForeground} />
                          <Text style={{ fontSize: 11, color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }}>{b.wardName}</Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 11, color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular', marginTop: 2 }}>{b.phone}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color="#CBD5E1" />
                  </Pressable>
                ))}
                {hasMoreBiz && (
                  <Pressable onPress={() => setBizPage(p => p + 1)} style={styles.loadMoreBtn}>
                    <Text style={[styles.loadMoreText, { color: colors.primary }]}>Xem thêm ({filteredMapBiz.length - pagedBiz.length})</Text>
                    <Ionicons name="chevron-down" size={14} color={colors.primary} />
                  </Pressable>
                )}
              </>
            )
          ) : (
            filteredMapProd.length === 0 ? (
              <View style={styles.mapEmpty}>
                <Ionicons name="location-outline" size={28} color="#CBD5E1" />
                <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>Không có sản phẩm nào trong vùng này</Text>
              </View>
            ) : (
              <>
                {pagedProd.map(p => {
                  const cs = mapCertStyle(p.cert);
                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        router.push(`/product/${MAP_PRODUCT_DETAIL_IDS[p.id] ?? 'sp001'}`);
                      }}
                      style={({ pressed }) => [
                        styles.mapListItem,
                        { borderBottomColor: colors.border, opacity: pressed ? 0.72 : 1 },
                      ]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.mapListName, { color: colors.foreground }]}>{p.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                          <View style={[styles.mapListBadge, { backgroundColor: '#FFEDD5' }]}>
                            <Text style={{ fontSize: 10, color: '#C2410C', fontFamily: 'BeVietnamPro_700Bold' }}>{p.category}</Text>
                          </View>
                          <View style={[styles.mapListBadge, { backgroundColor: cs.bg }]}>
                            <Text style={{ fontSize: 10, color: cs.text, fontFamily: 'BeVietnamPro_700Bold' }}>{p.cert}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
                            <Ionicons name="location-outline" size={11} color={colors.mutedForeground} />
                            <Text style={{ fontSize: 11, color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }}>{p.wardName}</Text>
                          </View>
                        </View>
                      </View>
                      <Ionicons name="chevron-forward" size={14} color="#CBD5E1" />
                    </Pressable>
                  );
                })}
                {hasMoreProd && (
                  <Pressable onPress={() => setProdPage(p => p + 1)} style={styles.loadMoreBtn}>
                    <Text style={[styles.loadMoreText, { color: colors.primary }]}>Xem thêm ({filteredMapProd.length - pagedProd.length})</Text>
                    <Ionicons name="chevron-down" size={14} color={colors.primary} />
                  </Pressable>
                )}
              </>
            )
          )}
        </View>
      </View>

      {/* Ward picker modal */}
      <Modal
        visible={wardModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setWardModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setWardModalVisible(false)}>
          <Pressable style={[styles.modalSheet, { backgroundColor: colors.card }]} onPress={e => e.stopPropagation()}>
            <View style={[styles.modalHandle, { backgroundColor: colors.border }]} />
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Chọn phường / xã</Text>
            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              {/* "All" option */}
              <Pressable
                onPress={() => { setSelectedMapWard(null); setBizPage(1); setProdPage(1); syncWardToMap(null); setWardModalVisible(false); }}
                style={[styles.wardOption, { borderBottomColor: colors.border, backgroundColor: !selectedMapWard ? '#EFF6FF' : 'transparent' }]}
              >
                <Text style={[styles.wardOptionText, { color: !selectedMapWard ? colors.primary : colors.foreground, fontFamily: !selectedMapWard ? 'BeVietnamPro_700Bold' : 'BeVietnamPro_400Regular' }]}>
                  Tất cả phường/xã
                </Text>
                {!selectedMapWard && <Ionicons name="checkmark" size={16} color={colors.primary} />}
              </Pressable>
              {MAP_WARDS.map(w => (
                <Pressable
                  key={w.code}
                  onPress={() => { setSelectedMapWard(w); setBizPage(1); setProdPage(1); syncWardToMap(w); setWardModalVisible(false); }}
                  style={[styles.wardOption, { borderBottomColor: colors.border, backgroundColor: selectedMapWard?.code === w.code ? '#EFF6FF' : 'transparent' }]}
                >
                  <Text style={[styles.wardOptionText, { color: selectedMapWard?.code === w.code ? colors.primary : colors.foreground, fontFamily: selectedMapWard?.code === w.code ? 'BeVietnamPro_700Bold' : 'BeVietnamPro_400Regular' }]}>
                    {w.name}
                  </Text>
                  {selectedMapWard?.code === w.code && <Ionicons name="checkmark" size={16} color={colors.primary} />}
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Language picker — mirrors the portal globe menu without emoji flags. */}
      <Modal
        visible={languageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <Pressable style={styles.languageOverlay} onPress={() => setLanguageModalVisible(false)}>
          <Pressable
            style={[styles.languageCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.languageHeader}>
              <View>
                <Text style={[styles.languageTitle, { color: colors.foreground }]}>Ngôn ngữ</Text>
                <Text style={[styles.languageSubtitle, { color: colors.mutedForeground }]}>Language</Text>
              </View>
              <Pressable onPress={() => setLanguageModalVisible(false)} hitSlop={10}>
                <Ionicons name="close" size={20} color={colors.mutedForeground} />
              </Pressable>
            </View>
            {[
              { code: 'vi', label: 'Tiếng Việt' },
              { code: 'en', label: 'English' },
              { code: 'zh', label: '中文' },
              { code: 'ko', label: '한국어' },
            ].map(item => (
              <Pressable
                key={item.code}
                onPress={() => {
                  setLanguage(item.code);
                  setLanguageModalVisible(false);
                }}
                style={({ pressed }) => [
                  styles.languageOption,
                  {
                    borderColor: colors.border,
                    backgroundColor: language === item.code ? colors.navyLight : colors.card,
                    opacity: pressed ? 0.72 : 1,
                  },
                ]}
              >
                <Text style={[styles.languageOptionText, { color: language === item.code ? colors.primary : colors.foreground }]}>
                  {item.label}
                </Text>
                {language === item.code && <Ionicons name="checkmark" size={18} color={colors.primary} />}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* SẢN PHẨM NỔI BẬT */}
      <View style={styles.section}>
        <SectionHeading title="Sản phẩm nổi bật" onMore={() => router.push('/(tabs)/search')} />
        <FlatList
          data={PRODUCTS}
          horizontal
          scrollEnabled={PRODUCTS.length > 0}
          showsHorizontalScrollIndicator={false}
          keyExtractor={p => p.id}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />}
        />
      </View>

      {/* TIN TỨC MỚI NHẤT */}
      <View style={styles.sectionPadded}>
        <SectionHeading title="Tin tức mới nhất" onMore={() => router.push('/(tabs)/news')} />
        {NEWS.slice(0, 3).map(item => <NewsCard key={item.id} item={item} onPress={() => router.push(`/news/${item.id}`)} />)}
      </View>

      {/* DOANH NGHIỆP TIÊU BIỂU */}
      <View style={styles.sectionPadded}>
        <SectionHeading title="Doanh nghiệp tiêu biểu" onMore={() => router.push('/(tabs)/search')} />
        {BUSINESSES.slice(0, 3).map(b => (
          <Pressable key={b.id} onPress={() => router.push(`/business/${b.id}`)} style={({ pressed }) => [styles.bizRow, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}>
            <Image source={{ uri: b.image }} style={styles.bizAvatar} resizeMode="cover" />
            <View style={styles.bizCopy}>
              <Text style={[styles.bizName, { color: colors.foreground }]} numberOfLines={1}>{b.name}</Text>
              <Text style={[styles.bizMeta, { color: colors.mutedForeground }]}>{b.type} · {b.district} · {b.productCount} sản phẩm</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
          </Pressable>
        ))}
      </View>

      {/* HƯỚNG DẪN DOANH NGHIỆP */}
      <View style={[styles.sectionPadded, styles.guideSectionWrap]}>
        <View style={[styles.guideCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.guideSectionTitle, { color: colors.primary }]}>Hướng dẫn doanh nghiệp</Text>
          <Text style={[styles.guideSectionSub, { color: colors.mutedForeground }]}>3 bước tham gia chương trình truy xuất nguồn gốc</Text>

          {[
            {
              title: 'Đăng ký hồ sơ pháp lý và thông tin tổ chức',
              desc: 'Cập nhật đầy đủ giấy phép kinh doanh và chứng nhận vệ sinh an toàn thực phẩm.',
            },
            {
              title: 'Khai báo thông tin sản phẩm và tải lên chứng nhận',
              desc: 'Gắn kết thông tin chứng nhận OCOP, VietGAP, GlobalGAP cho từng lô hàng.',
            },
            {
              title: 'Kết nối đơn vị cung cấp giải pháp TXNG để đồng bộ dữ liệu',
              desc: 'Tích hợp API hoặc import dữ liệu tự động từ các giải pháp bên thứ ba vào cổng chung.',
            },
          ].map((step, idx) => (
            <View key={idx} style={styles.guideStep}>
              <View style={[styles.guideStepIcon, { backgroundColor: '#FFF4EC' }]}>
                <Ionicons name="checkmark-circle" size={20} color="#E8650A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.guideStepTitle, { color: colors.foreground }]}>{step.title}</Text>
                <Text style={[styles.guideStepDesc, { color: colors.mutedForeground }]}>{step.desc}</Text>
              </View>
            </View>
          ))}

          <Pressable
            onPress={() => router.push('/register')}
            style={({ pressed }) => [styles.guideBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}
          >
            <Text style={styles.guideBtnText}>Đăng ký tham gia TXNG</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFF" />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9, flex: 1 },
  logo: { width: 39, height: 39 },
  brandName: { fontSize: 15, fontFamily: 'BeVietnamPro_700Bold', letterSpacing: 0.1 },
  brandTagline: { fontSize: 7, fontFamily: 'BeVietnamPro_500Medium', marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  headerIcon: { padding: 7, position: 'relative' },
  notificationDot: { position: 'absolute', right: 4, top: 4, width: 6, height: 6, borderRadius: 3, borderWidth: 1, borderColor: '#FFF' },
  hero: { paddingTop: 24, paddingHorizontal: 20, alignItems: 'stretch' },
  heroTitle: { fontSize: 27, lineHeight: 33, fontFamily: 'BeVietnamPro_700Bold', letterSpacing: -0.3 },
  heroDesc: { fontSize: 14, lineHeight: 22, fontFamily: 'BeVietnamPro_400Regular', marginTop: 16 },
  searchArea: { marginTop: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', minHeight: 54, borderRadius: 13, borderWidth: 1, paddingHorizontal: 15, boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.07)', elevation: 2 },
  scanButton: { width: 30, height: 36, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, height: 52, paddingHorizontal: 11, fontSize: 14, fontFamily: 'BeVietnamPro_400Regular' },
  gtinFields: { gap: 9 },
  notFoundBox: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, marginTop: 10, borderRadius: 9, borderWidth: 1 },
  notFoundText: { flex: 1, fontSize: 12, fontFamily: 'BeVietnamPro_400Regular' },
  searchButton: { minHeight: 54, borderRadius: 13, marginTop: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  searchButtonText: { color: '#FFFFFF', fontSize: 16, fontFamily: 'BeVietnamPro_700Bold' },
  radioRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 16 },
  radioOption: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  radio: { width: 19, height: 19, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 9, height: 9, borderRadius: 5 },
  radioText: { fontSize: 12, fontFamily: 'BeVietnamPro_400Regular' },
  heroImage: { width: '100%', height: 230, marginTop: 10 },
  scannerContainer: { flex: 1, backgroundColor: '#000000' },
  scannerTopBar: { position: 'absolute', top: 0, left: 0, right: 0, minHeight: 86, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.42)' },
  scannerCloseButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  scannerTitle: { color: '#FFFFFF', fontSize: 16, marginTop: 7 },
  scannerGuideWrap: { position: 'absolute', top: '35%', left: 0, right: 0, alignItems: 'center' },
  scannerGuide: { width: 270, height: 190, position: 'relative' },
  scannerCorner: { position: 'absolute', width: 30, height: 30, borderColor: '#FFFFFF' },
  cornerTopLeft: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cornerTopRight: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cornerBottomLeft: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cornerBottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  scannerHint: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 18, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.58)' },
  scannerHintText: { color: '#FFFFFF', fontSize: 12 },
  statsBox: { flexDirection: 'row', marginHorizontal: 16, marginTop: 4, paddingVertical: 20, paddingHorizontal: 7, borderRadius: 20, borderWidth: 1 },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: 22, fontFamily: 'BeVietnamPro_700Bold' },
  statLabel: { fontSize: 8, lineHeight: 12, textAlign: 'center', fontFamily: 'BeVietnamPro_600SemiBold' },
  section: { marginTop: 26 },
  sectionPadded: { marginTop: 27, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, marginBottom: 13 },
  sectionAccent: { width: 4, height: 20, borderRadius: 2 },
  sectionTitle: { flex: 1, fontSize: 17, fontFamily: 'BeVietnamPro_700Bold' },
  sectionMore: { fontSize: 12, fontFamily: 'BeVietnamPro_600SemiBold' },
  horizontalList: { paddingHorizontal: 16, gap: 12 },
  productCard: { width: 170, borderRadius: 13, borderWidth: 1, overflow: 'hidden' },
  productCardImage: { height: 105, width: '100%' },
  productCardBody: { padding: 10, gap: 4 },
  productCardName: { fontSize: 13, lineHeight: 18, fontFamily: 'BeVietnamPro_600SemiBold' },
  productCardBusiness: { fontSize: 11, fontFamily: 'BeVietnamPro_400Regular' },
  productCardCerts: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 2 },
  certBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1 },
  certBadgeText: { fontSize: 9, fontFamily: 'BeVietnamPro_500Medium' },
  newsCard: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginBottom: 10 },
  newsCardImage: { width: 90, height: 90 },
  newsCardBody: { flex: 1, padding: 10, gap: 4, justifyContent: 'center' },
  newsCategoryChip: { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  newsCategoryText: { fontSize: 10, fontFamily: 'BeVietnamPro_500Medium' },
  newsCardTitle: { fontSize: 13, lineHeight: 18, fontFamily: 'BeVietnamPro_600SemiBold' },
  newsCardDate: { fontSize: 11, fontFamily: 'BeVietnamPro_400Regular' },
  bizRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 10, marginBottom: 8, gap: 10, overflow: 'hidden' },
  bizAvatar: { width: 50, height: 50, borderRadius: 10 },
  bizCopy: { flex: 1 },
  bizName: { fontSize: 14, fontFamily: 'BeVietnamPro_600SemiBold' },
  bizMeta: { fontSize: 11, marginTop: 2, fontFamily: 'BeVietnamPro_400Regular' },
  // Categories
  // Enterprise guide
  guideSectionWrap: { marginBottom: 8 },
  guideCard: { borderRadius: 16, borderWidth: 1, padding: 20, gap: 16 },
  guideSectionTitle: { fontSize: 20, fontFamily: 'BeVietnamPro_700Bold', textTransform: 'uppercase' },
  guideSectionSub: { fontSize: 13, fontFamily: 'BeVietnamPro_400Regular', marginTop: -8 },
  guideStep: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  guideStepIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  guideStepTitle: { fontSize: 14, fontFamily: 'BeVietnamPro_700Bold', lineHeight: 20 },
  guideStepDesc: { fontSize: 12, fontFamily: 'BeVietnamPro_400Regular', lineHeight: 18, marginTop: 3 },
  guideBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 10, marginTop: 4 },
  guideBtnText: { fontSize: 15, color: '#FFF', fontFamily: 'BeVietnamPro_700Bold' },
  // Map section
  mapSection: { marginTop: 4, paddingHorizontal: 16, paddingVertical: 20, gap: 14 },
  mapHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  mapSubLabel: { fontSize: 10, fontFamily: 'BeVietnamPro_700Bold', color: '#2740BA', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 },
  mapTitle: { fontSize: 17, fontFamily: 'BeVietnamPro_700Bold', lineHeight: 24, textTransform: 'uppercase' },
  wardPickerBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, borderWidth: 1, maxWidth: 160, flexShrink: 1 },
  wardPickerText: { flex: 1, fontSize: 12, fontFamily: 'BeVietnamPro_500Medium' },
  mapImageWrap: { borderRadius: 14, overflow: 'hidden', height: 300, position: 'relative' },
  mapWebView: { flex: 1, borderRadius: 14 },
  mapChip: { position: 'absolute', top: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  mapChipText: { color: '#FFF', fontSize: 12, fontFamily: 'BeVietnamPro_700Bold' },
  mapPanel: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', minHeight: 400 },
  mapTabs: { flexDirection: 'row', borderBottomWidth: 1 },
  mapTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  mapTabText: { fontSize: 13, fontFamily: 'BeVietnamPro_600SemiBold' },
  mapTabBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 10 },
  mapTabBadgeText: { fontSize: 11, fontFamily: 'BeVietnamPro_700Bold' },
  mapFilterBar: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 1 },
  mapFilterText: { fontSize: 12, fontFamily: 'BeVietnamPro_500Medium', flex: 1 },
  mapListItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, gap: 8 },
  mapListName: { fontSize: 13, fontFamily: 'BeVietnamPro_600SemiBold', lineHeight: 18 },
  mapListBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  mapEmpty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, gap: 8 },
  loadMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  loadMoreText: { fontSize: 13, fontFamily: 'BeVietnamPro_600SemiBold' },
  // Ward modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingBottom: 32, paddingTop: 12 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 16, fontFamily: 'BeVietnamPro_700Bold', marginBottom: 12 },
  wardOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, borderBottomWidth: 1 },
  wardOptionText: { fontSize: 14 },
  languageOverlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.32)', justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 76, paddingHorizontal: 16 },
  languageCard: { width: 220, borderRadius: 14, borderWidth: 1, padding: 12, boxShadow: '0px 8px 18px rgba(15, 23, 42, 0.16)', elevation: 8 },
  languageHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, paddingBottom: 8 },
  languageTitle: { fontSize: 15, fontFamily: 'BeVietnamPro_700Bold' },
  languageSubtitle: { fontSize: 11, fontFamily: 'BeVietnamPro_400Regular', marginTop: 1 },
  languageOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderRadius: 9, paddingHorizontal: 11, paddingVertical: 10, marginTop: 6 },
  languageOptionText: { fontSize: 13, fontFamily: 'BeVietnamPro_500Medium' },
});
