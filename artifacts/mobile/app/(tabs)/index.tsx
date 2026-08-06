import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
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
  { name: 'Phân bón & Vật tư', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=240&fit=crop' },
  { name: 'Thủy sản', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=240&fit=crop' },
  { name: 'Thịt & Chăn nuôi', img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=240&fit=crop' },
  { name: 'Thực phẩm chế biến', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=240&fit=crop' },
  { name: 'Dược liệu', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=240&fit=crop' },
  { name: 'Thủ công mỹ nghệ', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=240&fit=crop' },
  { name: 'Công nghiệp chế biến', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=240&fit=crop' },
];

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
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

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
        <Pressable onPress={() => router.push('/contact')} style={styles.headerIcon} hitSlop={8}>
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
              <Text style={[styles.radioText, { color: colors.foreground }]}>Mã GTIN &amp; Số lô</Text>
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
});
