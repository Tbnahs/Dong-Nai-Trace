import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { ModalPicker } from '@/components/ModalPicker';
import {
  BUSINESS_TYPES,
  BUSINESSES,
  CATEGORIES,
  CERTIFICATIONS,
  DISTRICTS,
  PRODUCTS,
  lookupByGTIN,
  lookupByTraceCode,
} from '@/data/mock';

type ResultTab = 'products' | 'businesses';
type SearchType = 'trace' | 'gtin';
type SortType = 'newest' | 'name' | 'district';

const PRODUCT_CATEGORIES = CATEGORIES.filter(item => item !== 'Phân bón & Vật tư nông nghiệp');

export default function SearchScreen() {
  const colors = useColors();
  const [tab, setTab] = useState<ResultTab>('products');
  const [searchType, setSearchType] = useState<SearchType>('gtin');
  const [traceCode, setTraceCode] = useState('');
  const [gtin, setGtin] = useState('');
  const [lot, setLot] = useState('');
  const [query, setQuery] = useState('');
  const [inputQuery, setInputQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [district, setDistrict] = useState('Tất cả');
  const [certification, setCertification] = useState('Tất cả');
  const [businessType, setBusinessType] = useState('Tất cả');
  const [sort, setSort] = useState<SortType>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = PRODUCTS.filter(product => {
      const matchesQuery = !normalized
        || `${product.name} ${product.businessName} ${product.category} ${product.traceCode}`.toLowerCase().includes(normalized);
      return matchesQuery
        && (category === 'Tất cả' || product.category === category)
        && (district === 'Tất cả' || product.district === district)
        && (certification === 'Tất cả' || product.certifications.includes(certification));
    });
    return sortResults(result, sort, product => product.name, product => product.district);
  }, [query, category, district, certification, sort]);

  const filteredBusinesses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = BUSINESSES.filter(business => {
      const matchesQuery = !normalized
        || `${business.name} ${business.type} ${business.district}`.toLowerCase().includes(normalized);
      return matchesQuery
        && (district === 'Tất cả' || business.district === district)
        && (certification === 'Tất cả' || business.certifications.includes(certification))
        && (businessType === 'Tất cả' || business.type === businessType);
    });
    return sortResults(result, sort, business => business.name, business => business.district);
  }, [query, district, certification, businessType, sort]);

  const activeFilterCount = [category, district, certification, businessType].filter(value => value !== 'Tất cả').length;
  const results = tab === 'products' ? filteredProducts : filteredBusinesses;

  const clearFilters = () => {
    setCategory('Tất cả');
    setDistrict('Tất cả');
    setCertification('Tất cả');
    setBusinessType('Tất cả');
  };

  const runLookup = () => {
    const product = searchType === 'trace'
      ? lookupByTraceCode(traceCode)
      : lookupByGTIN(gtin, lot || undefined);

    if (product) {
      router.push(`/product/${product.id}`);
      return;
    }

    const entered = searchType === 'trace' ? traceCode.trim() : `${gtin} ${lot}`.trim();
    setQuery(entered);
    setInputQuery(entered);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.softBackground }]}>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={[styles.lookupHeader, { backgroundColor: colors.primary }]}>
              <Text style={[styles.eyebrow, { fontFamily: 'BeVietnamPro_700Bold' }]}>ĐỒNG NAI TRACE</Text>
              <Text style={[styles.lookupTitle, { fontFamily: 'BeVietnamPro_700Bold' }]}>Tra cứu nguồn gốc</Text>
              <Text style={[styles.lookupDescription, { fontFamily: 'BeVietnamPro_400Regular' }]}>
                Nhập mã truy xuất hoặc mã GTIN và số lô để kiểm tra thông tin sản phẩm.
              </Text>

              {searchType === 'trace' ? (
                <LookupInput
                  icon="barcode-outline"
                  placeholder="Nhập mã truy xuất sản phẩm"
                  value={traceCode}
                  onChangeText={setTraceCode}
                  colors={colors}
                />
              ) : (
                <View style={styles.lookupInputs}>
                  <LookupInput icon="barcode-outline" placeholder="Nhập mã GTIN" value={gtin} onChangeText={setGtin} colors={colors} />
                  <LookupInput icon="cube-outline" placeholder="Nhập số lô" value={lot} onChangeText={setLot} colors={colors} />
                </View>
              )}

              <Pressable
                onPress={runLookup}
                style={({ pressed }) => [styles.lookupButton, { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 }]}
                testID="lookup-submit"
              >
                <Ionicons name="search-outline" size={18} color={colors.accentForeground} />
                <Text style={[styles.lookupButtonText, { color: colors.accentForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>Tra cứu</Text>
              </Pressable>

              <View style={styles.radioRow}>
                <RadioOption label="Mã truy xuất sản phẩm" active={searchType === 'trace'} onPress={() => setSearchType('trace')} />
                <RadioOption label="Mã GTIN & Số lô đóng gói" active={searchType === 'gtin'} onPress={() => setSearchType('gtin')} />
              </View>
            </View>

            <View style={styles.pageContent}>
              <View style={[styles.tabSwitcher, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <ResultTabButton
                  icon="cube-outline"
                  label="Sản phẩm"
                  count={filteredProducts.length}
                  active={tab === 'products'}
                  onPress={() => setTab('products')}
                  colors={colors}
                />
                <ResultTabButton
                  icon="business-outline"
                  label="Doanh nghiệp"
                  count={filteredBusinesses.length}
                  active={tab === 'businesses'}
                  onPress={() => setTab('businesses')}
                  colors={colors}
                />
              </View>

              <View style={styles.resultToolbar}>
                <Text style={[styles.resultCount, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
                  Tìm thấy <Text style={{ color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }}>{results.length}</Text>{' '}
                  {tab === 'products' ? 'sản phẩm' : 'doanh nghiệp'}
                </Text>
                <Pressable
                  onPress={() => setFiltersOpen(value => !value)}
                  style={[styles.filterButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <Ionicons name="options-outline" size={16} color={colors.primary} />
                  <Text style={[styles.filterButtonText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Bộ lọc</Text>
                  {activeFilterCount > 0 && <View style={[styles.filterCount, { backgroundColor: colors.accent }]}><Text style={styles.filterCountText}>{activeFilterCount}</Text></View>}
                </Pressable>
              </View>

              {filtersOpen && (
                <View style={[styles.filterPanel, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={styles.filterPanelHeader}>
                    <Text style={[styles.filterTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Bộ lọc</Text>
                    {activeFilterCount > 0 && (
                      <Pressable onPress={clearFilters}>
                        <Text style={[styles.clearText, { color: colors.accent, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Xóa bộ lọc</Text>
                      </Pressable>
                    )}
                  </View>
                  {tab === 'products' ? (
                    <ModalPicker label="Danh mục" value={category} options={PRODUCT_CATEGORIES} onChange={setCategory} />
                  ) : (
                    <ModalPicker label="Loại hình" value={businessType} options={BUSINESS_TYPES} onChange={setBusinessType} />
                  )}
                  <ModalPicker label="Địa bàn" value={district} options={DISTRICTS} onChange={setDistrict} />
                  <ModalPicker label="Chứng nhận" value={certification} options={CERTIFICATIONS} onChange={setCertification} />
                  <ModalPicker
                    label="Sắp xếp"
                    value={sort === 'newest' ? 'Mới nhất' : sort === 'name' ? 'Tên A-Z' : 'Địa bàn'}
                    options={['Mới nhất', 'Tên A-Z', 'Địa bàn']}
                    onChange={value => setSort(value === 'Mới nhất' ? 'newest' : value === 'Tên A-Z' ? 'name' : 'district')}
                  />
                </View>
              )}

              <View style={[styles.keywordRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Ionicons name="search-outline" size={17} color={colors.mutedForeground} />
                <TextInput
                  value={inputQuery}
                  onChangeText={value => { setInputQuery(value); setQuery(value); }}
                  placeholder="Tìm theo tên, danh mục, mã truy xuất..."
                  placeholderTextColor={colors.mutedForeground}
                  style={[styles.keywordInput, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                  returnKeyType="search"
                  onSubmitEditing={() => setQuery(inputQuery)}
                />
                {inputQuery.length > 0 && (
                  <Pressable onPress={() => { setInputQuery(''); setQuery(''); }}>
                    <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
                  </Pressable>
                )}
              </View>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name={tab === 'products' ? 'cube-outline' : 'business-outline'} size={42} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Không tìm thấy {tab === 'products' ? 'sản phẩm' : 'doanh nghiệp'}</Text>
            <Text style={[styles.emptyDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Thử thay đổi từ khóa hoặc xóa bộ lọc.</Text>
            {activeFilterCount > 0 && <Pressable onPress={clearFilters}><Text style={[styles.clearText, { color: colors.accent, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Xóa bộ lọc</Text></Pressable>}
          </View>
        }
        renderItem={({ item }) => tab === 'products'
          ? <ProductResult item={item} colors={colors} onPress={() => router.push(`/product/${item.id}`)} />
          : <BusinessResult item={item} colors={colors} onPress={() => router.push(`/business/${item.id}`)} />}
      />
    </View>
  );
}

function sortResults<T>(items: T[], sort: SortType, name: (item: T) => string, district: (item: T) => string) {
  return [...items].sort((a, b) => sort === 'name'
    ? name(a).localeCompare(name(b), 'vi')
    : sort === 'district'
      ? district(a).localeCompare(district(b), 'vi')
      : 0);
}

function LookupInput({ icon, placeholder, value, onChangeText, colors }: {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={[styles.lookupInput, { backgroundColor: colors.card }]}>
      <Ionicons name={icon} size={19} color={colors.mutedForeground} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        style={[styles.lookupInputText, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
        autoCapitalize="characters"
      />
    </View>
  );
}

function RadioOption({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.radioOption}>
      <View style={[styles.radio, active && styles.radioActive]}>{active && <View style={styles.radioDot} />}</View>
      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
  );
}

function ResultTabButton({ icon, label, count, active, onPress, colors }: {
  icon: keyof typeof Ionicons.glyphMap; label: string; count: number; active: boolean; onPress: () => void; colors: ReturnType<typeof useColors>;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.resultTab, active && { backgroundColor: colors.primary }]}>
      <Ionicons name={icon} size={17} color={active ? colors.primaryForeground : colors.mutedForeground} />
      <Text style={[styles.resultTabText, { color: active ? colors.primaryForeground : colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{label}</Text>
      <Text style={[styles.resultTabCount, { color: active ? colors.primaryForeground : colors.mutedForeground, backgroundColor: active ? 'rgba(255,255,255,0.2)' : colors.muted, fontFamily: 'BeVietnamPro_700Bold' }]}>{count}</Text>
    </Pressable>
  );
}

function ProductResult({ item, colors, onPress }: { item: typeof PRODUCTS[number]; colors: ReturnType<typeof useColors>; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultBody}>
        <View style={styles.resultTitleRow}>
          <Text style={[styles.resultName, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]} numberOfLines={2}>{item.name}</Text>
          <Ionicons name="shield-checkmark" size={18} color={colors.success} />
        </View>
        <Text style={[styles.resultOrg, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{item.businessName}</Text>
        <View style={styles.badgeRow}>
          <Badge text={item.district} color={colors.mutedForeground} background={colors.muted} colors={colors} />
          {item.certifications[0] && <Badge text={item.certifications[0]} color={colors.success} background="#ECFDF5" colors={colors} />}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

function BusinessResult({ item, colors, onPress }: { item: typeof BUSINESSES[number]; colors: ReturnType<typeof useColors>; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultBody}>
        <View style={styles.resultTitleRow}>
          <Text style={[styles.resultName, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]} numberOfLines={2}>{item.name}</Text>
          <Ionicons name="shield-checkmark" size={18} color={colors.success} />
        </View>
        <Text style={[styles.resultOrg, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{item.district} · {item.phone}</Text>
        <View style={styles.badgeRow}>
          <Badge text={item.type} color={colors.primary} background={colors.navyLight} colors={colors} />
          {item.certifications[0] && <Badge text={item.certifications[0]} color={colors.success} background="#ECFDF5" colors={colors} />}
        </View>
      </View>
      <Text style={[styles.productCount, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.productCount} SP</Text>
    </Pressable>
  );
}

function Badge({ text, color, background, colors: _colors }: { text: string; color: string; background: string; colors: ReturnType<typeof useColors> }) {
  return <View style={[styles.badge, { backgroundColor: background }]}><Text style={[styles.badgeText, { color, fontFamily: 'BeVietnamPro_500Medium' }]}>{text}</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingBottom: 110 },
  lookupHeader: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 18 },
  eyebrow: { color: 'rgba(255,255,255,0.7)', fontSize: 11, letterSpacing: 1.3 },
  lookupTitle: { color: '#FFF', fontSize: 25, marginTop: 4 },
  lookupDescription: { color: 'rgba(255,255,255,0.78)', fontSize: 13, lineHeight: 19, marginTop: 7, marginBottom: 15 },
  lookupInputs: { gap: 9 },
  lookupInput: { minHeight: 46, borderRadius: 23, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 15 },
  lookupInputText: { flex: 1, fontSize: 13, paddingVertical: 0 },
  lookupButton: { height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7, marginTop: 10 },
  lookupButtonText: { fontSize: 14 },
  radioRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 13 },
  radioOption: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  radio: { width: 17, height: 17, borderRadius: 9, borderWidth: 2, borderColor: 'rgba(255,255,255,0.65)', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#FFF', backgroundColor: '#FFF' },
  radioDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#2740BA' },
  radioLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 11 },
  pageContent: { padding: 16 },
  tabSwitcher: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, padding: 4, gap: 4 },
  resultTab: { flex: 1, minHeight: 42, borderRadius: 9, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5 },
  resultTabText: { fontSize: 12 },
  resultTabCount: { minWidth: 22, textAlign: 'center', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10, fontSize: 10 },
  resultToolbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 18, marginBottom: 10 },
  resultCount: { fontSize: 12, flex: 1 },
  filterButton: { borderWidth: 1, borderRadius: 9, paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  filterButtonText: { fontSize: 12 },
  filterCount: { minWidth: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  filterCountText: { color: '#FFF', fontSize: 10, fontFamily: 'BeVietnamPro_700Bold' },
  filterPanel: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10 },
  filterPanelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  filterTitle: { fontSize: 16 },
  clearText: { fontSize: 12 },
  keywordRow: { borderWidth: 1, borderRadius: 10, minHeight: 44, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, gap: 7, marginBottom: 4 },
  keywordInput: { flex: 1, fontSize: 12, paddingVertical: 0 },
  resultCard: { marginHorizontal: 16, marginBottom: 10, borderRadius: 13, borderWidth: 1, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  resultImage: { width: 74, height: 74, borderRadius: 9 },
  resultBody: { flex: 1, minWidth: 0 },
  resultTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 5 },
  resultName: { fontSize: 14, lineHeight: 19, flex: 1 },
  resultOrg: { fontSize: 11, marginTop: 4 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 7 },
  badge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  badgeText: { fontSize: 10 },
  productCount: { fontSize: 10, alignSelf: 'flex-end' },
  emptyState: { borderWidth: 1, borderRadius: 13, marginHorizontal: 16, padding: 42, alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 15, textAlign: 'center' },
  emptyDescription: { fontSize: 12, textAlign: 'center' },
});