import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
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
import { LinearGradient } from 'expo-linear-gradient';
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

const CERT_COLORS: Record<string, string> = {
  VietGAP: '#16A34A',
  GlobalGAP: '#0369A1',
  OCOP: '#D97706',
  'Hữu cơ': '#7C3AED',
  HACCP: '#DC2626',
};

function CertBadge({ label }: { label: string }) {
  const color = CERT_COLORS[label.split(' ')[0]] ?? '#64748B';
  return (
    <View style={[styles.certBadge, { backgroundColor: color + '20', borderColor: color + '60' }]}>
      <Text style={[styles.certBadgeText, { color }]}>{label}</Text>
    </View>
  );
}

function ProductCard({ product, onPress }: { product: typeof PRODUCTS[0]; onPress: () => void }) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.productCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}>
      <LinearGradient colors={['#2740BA20', '#E8650A15']} style={styles.productCardImage}>
        <Ionicons name="leaf-outline" size={32} color="#2740BA" />
      </LinearGradient>
      <View style={styles.productCardBody}>
        <Text style={[styles.productCardName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={2}>{product.name}</Text>
        <Text style={[styles.productCardBusiness, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{product.businessName}</Text>
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
    <Pressable onPress={onPress} style={({ pressed }) => [styles.newsCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}>
      <LinearGradient colors={['#2740BA30', '#7B93FF20']} style={styles.newsCardImage}>
        <Ionicons name="newspaper-outline" size={24} color="#2740BA" />
      </LinearGradient>
      <View style={styles.newsCardBody}>
        <View style={[styles.newsCategoryChip, { backgroundColor: colors.navyLight }]}>
          <Text style={[styles.newsCategoryText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{item.category}</Text>
        </View>
        <Text style={[styles.newsCardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={2}>{item.title}</Text>
        <Text style={[styles.newsCardDate, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.date}</Text>
      </View>
    </Pressable>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  const colors = useColors();
  return (
    <View style={[styles.statCard, { backgroundColor: colors.navyLight }]}>
      <Text style={[styles.statValue, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{label}</Text>
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
    await new Promise(r => setTimeout(r, 400));

    let found = useGtin ? lookupByGTIN(gtin.trim(), lot.trim()) : lookupByTraceCode(traceCode.trim());
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
      {/* Hero */}
      <LinearGradient colors={['#1A2E9E', '#2740BA', '#3B56D4']} style={[styles.hero, { paddingTop: topPad + 16 }]}>
        {/* Header row */}
        <View style={styles.heroHeader}>
          <View>
            <Text style={[styles.heroLogoText, { fontFamily: 'BeVietnamPro_700Bold' }]}>Đồng Nai Trace</Text>
            <Text style={[styles.heroSubtitle, { fontFamily: 'BeVietnamPro_400Regular' }]}>Hệ thống truy xuất nguồn gốc</Text>
          </View>
          <Pressable onPress={() => router.push('/contact')} style={styles.heroIconBtn}>
            <Ionicons name="help-circle-outline" size={26} color="rgba(255,255,255,0.85)" />
          </Pressable>
        </View>

        {/* Hero text */}
        <View style={styles.heroBadge}>
          <Ionicons name="shield-checkmark" size={14} color="#E8650A" />
          <Text style={[styles.heroBadgeText, { fontFamily: 'BeVietnamPro_500Medium' }]}>Công nghệ Blockchain</Text>
        </View>
        <Text style={[styles.heroTitle, { fontFamily: 'BeVietnamPro_700Bold' }]}>Tra cứu nguồn gốc{'\n'}sản phẩm nông nghiệp</Text>
        <Text style={[styles.heroDesc, { fontFamily: 'BeVietnamPro_400Regular' }]}>Nhập mã QR hoặc mã GTIN để xem thông tin đầy đủ về nguồn gốc, quy trình sản xuất và chứng nhận của sản phẩm.</Text>

        {/* Search card */}
        <View style={[styles.searchCard, { backgroundColor: colors.background }]}>
          {/* Toggle */}
          <View style={[styles.toggleRow, { backgroundColor: colors.muted, borderRadius: 8 }]}>
            <Pressable onPress={() => { setUseGtin(false); setNotFound(false); }} style={[styles.toggleBtn, !useGtin && { backgroundColor: colors.primary, borderRadius: 7 }]}>
              <Text style={[styles.toggleBtnText, { color: !useGtin ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>Mã truy xuất</Text>
            </Pressable>
            <Pressable onPress={() => { setUseGtin(true); setNotFound(false); }} style={[styles.toggleBtn, useGtin && { backgroundColor: colors.primary, borderRadius: 7 }]}>
              <Text style={[styles.toggleBtnText, { color: useGtin ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>GTIN / Lô hàng</Text>
            </Pressable>
          </View>

          {!useGtin ? (
            <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.muted }]}>
              <Ionicons name="qr-code-outline" size={20} color={colors.mutedForeground} style={{ marginLeft: 12 }} />
              <TextInput
                style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                placeholder="VD: DNRM-2024-001"
                placeholderTextColor={colors.mutedForeground}
                value={traceCode}
                onChangeText={t => { setTraceCode(t); setNotFound(false); }}
                autoCapitalize="characters"
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
              {traceCode.length > 0 && (
                <Pressable onPress={() => { setTraceCode(''); setNotFound(false); }} style={{ padding: 8 }}>
                  <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
                </Pressable>
              )}
            </View>
          ) : (
            <View style={{ gap: 8 }}>
              <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.muted }]}>
                <Ionicons name="barcode-outline" size={20} color={colors.mutedForeground} style={{ marginLeft: 12 }} />
                <TextInput
                  style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                  placeholder="Mã GTIN (VD: 8934673000016)"
                  placeholderTextColor={colors.mutedForeground}
                  value={gtin}
                  onChangeText={t => { setGtin(t); setNotFound(false); }}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.muted }]}>
                <Ionicons name="layers-outline" size={20} color={colors.mutedForeground} style={{ marginLeft: 12 }} />
                <TextInput
                  style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                  placeholder="Số lô hàng (VD: LOT-2024-001)"
                  placeholderTextColor={colors.mutedForeground}
                  value={lot}
                  onChangeText={t => { setLot(t); setNotFound(false); }}
                  autoCapitalize="characters"
                />
              </View>
            </View>
          )}

          {notFound && (
            <View style={[styles.notFoundBox, { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }]}>
              <Ionicons name="alert-circle-outline" size={16} color="#EF4444" />
              <Text style={[styles.notFoundText, { color: '#DC2626', fontFamily: 'BeVietnamPro_400Regular' }]}>Không tìm thấy sản phẩm. Vui lòng kiểm tra lại mã tra cứu.</Text>
            </View>
          )}

          <Pressable onPress={handleSearch} style={({ pressed }) => [styles.searchBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]} disabled={searching}>
            {searching
              ? <ActivityIndicator color="#FFF" size="small" />
              : <>
                  <Ionicons name="search" size={18} color="#FFF" />
                  <Text style={[styles.searchBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Tra cứu</Text>
                </>
            }
          </Pressable>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsSection}>
        <StatCard value={STATS.products.toLocaleString()} label="Sản phẩm" icon="cube" />
        <StatCard value={STATS.businesses.toString()} label="Doanh nghiệp" icon="business" />
        <StatCard value={STATS.districts.toString()} label="Huyện/TP" icon="location" />
      </View>

      {/* Featured products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Sản phẩm nổi bật</Text>
          <Pressable onPress={() => router.push('/(tabs)/search')}>
            <Text style={[styles.sectionMore, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>Xem tất cả</Text>
          </Pressable>
        </View>
        <FlatList
          data={PRODUCTS}
          keyExtractor={p => p.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
          )}
        />
      </View>

      {/* Latest news */}
      <View style={[styles.section, { paddingHorizontal: 16 }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Tin tức mới nhất</Text>
          <Pressable onPress={() => router.push('/(tabs)/news')}>
            <Text style={[styles.sectionMore, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>Xem tất cả</Text>
          </Pressable>
        </View>
        {NEWS.slice(0, 3).map(item => (
          <NewsCard key={item.id} item={item} onPress={() => router.push(`/news/${item.id}`)} />
        ))}
      </View>

      {/* Businesses */}
      <View style={[styles.section, { paddingHorizontal: 16 }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Doanh nghiệp tiêu biểu</Text>
          <Pressable onPress={() => router.push('/(tabs)/search')}>
            <Text style={[styles.sectionMore, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>Xem tất cả</Text>
          </Pressable>
        </View>
        {BUSINESSES.slice(0, 3).map(b => (
          <Pressable
            key={b.id}
            onPress={() => router.push(`/business/${b.id}`)}
            style={({ pressed }) => [styles.bizRow, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
          >
            <View style={[styles.bizAvatar, { backgroundColor: colors.navyLight }]}>
              <Text style={[styles.bizAvatarText, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>{b.shortName.slice(0, 2).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bizName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={1}>{b.name}</Text>
              <Text style={[styles.bizMeta, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{b.type} · {b.district} · {b.productCount} sản phẩm</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingHorizontal: 20, paddingBottom: 24 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  heroLogoText: { fontSize: 20, color: '#FFF', letterSpacing: 0.3 },
  heroSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  heroIconBtn: { padding: 4 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 },
  heroBadgeText: { fontSize: 12, color: '#E8650A' },
  heroTitle: { fontSize: 26, color: '#FFF', lineHeight: 34, marginBottom: 10 },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 20, marginBottom: 20 },
  searchCard: { borderRadius: 16, padding: 16, gap: 10, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  toggleRow: { flexDirection: 'row', padding: 3 },
  toggleBtn: { flex: 1, paddingVertical: 7, alignItems: 'center' },
  toggleBtnText: { fontSize: 13 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1 },
  input: { flex: 1, height: 44, paddingHorizontal: 10, fontSize: 14 },
  notFoundBox: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 8, borderWidth: 1 },
  notFoundText: { flex: 1, fontSize: 13, lineHeight: 18 },
  searchBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 13, borderRadius: 10 },
  searchBtnText: { fontSize: 15, color: '#FFF' },
  statsSection: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 20, gap: 10 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: 12 },
  statValue: { fontSize: 20 },
  statLabel: { fontSize: 11, marginTop: 2 },
  section: { marginTop: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionAccent: { width: 3, height: 18, borderRadius: 2 },
  sectionTitle: { flex: 1, fontSize: 16 },
  sectionMore: { fontSize: 13 },
  productCard: { width: 160, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  productCardImage: { height: 100, alignItems: 'center', justifyContent: 'center' },
  productCardBody: { padding: 10, gap: 4 },
  productCardName: { fontSize: 13, lineHeight: 18 },
  productCardBusiness: { fontSize: 11 },
  productCardCerts: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 2 },
  certBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1 },
  certBadgeText: { fontSize: 10 },
  newsCard: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginBottom: 10 },
  newsCardImage: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  newsCardBody: { flex: 1, padding: 10, gap: 4, justifyContent: 'center' },
  newsCategoryChip: { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  newsCategoryText: { fontSize: 10 },
  newsCardTitle: { fontSize: 13, lineHeight: 18 },
  newsCardDate: { fontSize: 11 },
  bizRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 8, gap: 10 },
  bizAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  bizAvatarText: { fontSize: 14 },
  bizName: { fontSize: 14 },
  bizMeta: { fontSize: 12, marginTop: 2 },
});
