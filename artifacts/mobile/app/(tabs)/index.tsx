import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
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
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
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

const CATEGORY_LIST = [
  { name: 'Nông sản & Rau củ', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=240&fit=crop' },
  { name: 'Phân bón & Vật tư nông nghiệp', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=240&fit=crop' },
  { name: 'Thủy sản', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=240&fit=crop' },
  { name: 'Thịt & Chăn nuôi', img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=240&fit=crop' },
  { name: 'Thực phẩm chế biến', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=240&fit=crop' },
  { name: 'Dược liệu', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=240&fit=crop' },
  { name: 'Thủ công mỹ nghệ', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=240&fit=crop' },
  { name: 'Công nghiệp chế biến', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=240&fit=crop' },
];

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

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
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
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filteredMapBiz  = selectedMapWard ? MAP_BUSINESSES.filter(b => b.wardCode === selectedMapWard.code) : MAP_BUSINESSES;
  const filteredMapProd = selectedMapWard ? MAP_PRODUCTS.filter(p => p.wardCode === selectedMapWard.code) : MAP_PRODUCTS;

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
      router.push(`/product/${found.id}`);
    } else {
      setNotFound(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

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
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Alert.alert(
              'Ngôn ngữ / Language',
              '',
              [
                { text: '🇻🇳  Tiếng Việt', onPress: () => {} },
                { text: '🇬🇧  English', onPress: () => {} },
                { text: 'Đóng', style: 'cancel' },
              ]
            );
          }}
          style={styles.headerIcon}
          hitSlop={8}
        >
          <Feather name="globe" size={19} color={colors.primary} />
        </Pressable>
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
              <Ionicons name="barcode-outline" size={21} color={colors.primary} />
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
                <Ionicons name="barcode-outline" size={20} color={colors.primary} />
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

        {/* Map: 2×2 OSM tile composite centred on Đồng Nai (zoom 9, tiles 407-408 / 239-240) */}
        <View style={styles.mapImageWrap}>
          {/* row 1 */}
          <View style={styles.mapTileRow}>
            <Image source={{ uri: 'https://a.tile.openstreetmap.org/9/407/239.png' }} style={styles.mapTile} />
            <Image source={{ uri: 'https://b.tile.openstreetmap.org/9/408/239.png' }} style={styles.mapTile} />
          </View>
          {/* row 2 */}
          <View style={styles.mapTileRow}>
            <Image source={{ uri: 'https://c.tile.openstreetmap.org/9/407/240.png' }} style={styles.mapTile} />
            <Image source={{ uri: 'https://a.tile.openstreetmap.org/9/408/240.png' }} style={styles.mapTile} />
          </View>
          {/* translucent blue tint so it reads as "province map" */}
          <View style={styles.mapTint} />
          {/* centre pin */}
          <View style={styles.mapPinWrap} pointerEvents="none">
            <Ionicons name="location" size={30} color="#2740BA" />
            <Text style={styles.mapPinLabel}>Đồng Nai</Text>
          </View>
          {selectedMapWard && (
            <View style={[styles.mapChip, { backgroundColor: colors.primary }]}>
              <Ionicons name="location" size={12} color="#FFF" />
              <Text style={styles.mapChipText}>{selectedMapWard.name}</Text>
              <Pressable onPress={() => setSelectedMapWard(null)} hitSlop={8}>
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
              <Pressable onPress={() => setSelectedMapWard(null)} hitSlop={8} style={{ marginLeft: 'auto' }}>
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
            ) : filteredMapBiz.map(b => (
              <View key={b.id} style={[styles.mapListItem, { borderBottomColor: colors.border }]}>
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
              </View>
            ))
          ) : (
            filteredMapProd.length === 0 ? (
              <View style={styles.mapEmpty}>
                <Ionicons name="location-outline" size={28} color="#CBD5E1" />
                <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>Không có sản phẩm nào trong vùng này</Text>
              </View>
            ) : filteredMapProd.map(p => {
              const cs = mapCertStyle(p.cert);
              return (
                <View key={p.id} style={[styles.mapListItem, { borderBottomColor: colors.border }]}>
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
                </View>
              );
            })
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
                onPress={() => { setSelectedMapWard(null); setWardModalVisible(false); }}
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
                  onPress={() => { setSelectedMapWard(w); setWardModalVisible(false); }}
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

      {/* DANH MỤC NGÀNH HÀNG */}
      <View style={[styles.sectionPadded, { marginTop: 28 }]}>
        <View style={[styles.sectionHeader, { paddingHorizontal: 0 }]}>
          <View>
            <Text style={[styles.catSubLabel, { color: colors.mutedForeground }]}>DANH MỤC</Text>
            <Text style={[styles.sectionTitle, { color: colors.primary, flex: undefined }]}>Danh mục đáng chú ý</Text>
          </View>
          <Pressable onPress={() => router.push('/(tabs)/search')} hitSlop={8}>
            <Text style={[styles.sectionMore, { color: colors.accent }]}>Xem thêm</Text>
          </Pressable>
        </View>
        <View style={styles.categoryGrid}>
          {CATEGORY_LIST.map((cat, idx) => (
            <Pressable
              key={idx}
              onPress={() => router.push(`/(tabs)/search`)}
              style={({ pressed }) => [styles.categoryCard, { borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
            >
              <Image source={{ uri: cat.img }} style={styles.categoryImage} resizeMode="cover" />
              <View style={[styles.categoryLabel, { backgroundColor: colors.card }]}>
                <Text style={[styles.categoryName, { color: colors.foreground }]} numberOfLines={2}>{cat.name}</Text>
                <Text style={[styles.categoryArrow, { color: colors.accent }]}>→</Text>
              </View>
            </Pressable>
          ))}
        </View>
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
  headerIcon: { padding: 7 },
  hero: { paddingTop: 24, paddingHorizontal: 20, alignItems: 'stretch' },
  heroTitle: { fontSize: 27, lineHeight: 33, fontFamily: 'BeVietnamPro_700Bold', letterSpacing: -0.3 },
  heroDesc: { fontSize: 14, lineHeight: 22, fontFamily: 'BeVietnamPro_400Regular', marginTop: 16 },
  searchArea: { marginTop: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', minHeight: 54, borderRadius: 13, borderWidth: 1, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
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
  catSubLabel: { fontSize: 10, fontFamily: 'BeVietnamPro_700Bold', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  categoryCard: { width: '47.5%', borderRadius: 10, borderWidth: 1, overflow: 'hidden' },
  categoryImage: { width: '100%', height: 90 },
  categoryLabel: { paddingHorizontal: 8, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4 },
  categoryName: { flex: 1, fontSize: 11, fontFamily: 'BeVietnamPro_600SemiBold', lineHeight: 15 },
  categoryArrow: { fontSize: 15, fontFamily: 'BeVietnamPro_700Bold' },
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
  mapImageWrap: { borderRadius: 14, overflow: 'hidden', height: 200, position: 'relative' },
  mapTileRow: { flexDirection: 'row', flex: 1 },
  mapTile: { flex: 1, height: 100 },
  mapTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(39,64,186,0.08)' },
  mapPinWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  mapPinLabel: { fontSize: 11, fontFamily: 'BeVietnamPro_700Bold', color: '#2740BA', backgroundColor: 'rgba(255,255,255,0.85)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 2 },
  mapChip: { position: 'absolute', top: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  mapChipText: { color: '#FFF', fontSize: 12, fontFamily: 'BeVietnamPro_700Bold' },
  mapPanel: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
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
  // Ward modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingBottom: 32, paddingTop: 12 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 16, fontFamily: 'BeVietnamPro_700Bold', marginBottom: 12 },
  wardOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, borderBottomWidth: 1 },
  wardOptionText: { fontSize: 14 },
});
