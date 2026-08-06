import React, { useMemo, useState } from 'react';
import {
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
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ModalPicker } from '@/components/ModalPicker';
import {
  BUSINESSES,
  BUSINESS_TYPES,
  CATEGORIES,
  CERTIFICATIONS,
  DISTRICTS,
  PRODUCTS,
} from '@/data/mock';

type Tab = 'products' | 'businesses';

export default function SearchScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('products');
  const [district, setDistrict] = useState('Tất cả');
  const [category, setCategory] = useState('Tất cả');
  const [bizType, setBizType] = useState('Tất cả');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.traceCode.toLowerCase().includes(query.toLowerCase()) || p.businessName.toLowerCase().includes(query.toLowerCase());
      const matchesDistrict = district === 'Tất cả' || p.district === district;
      const matchesCategory = category === 'Tất cả' || p.category === category;
      return matchesQuery && matchesDistrict && matchesCategory;
    });
  }, [query, district, category]);

  const filteredBusinesses = useMemo(() => {
    return BUSINESSES.filter(b => {
      const matchesQuery = !query || b.name.toLowerCase().includes(query.toLowerCase()) || b.district.toLowerCase().includes(query.toLowerCase());
      const matchesDistrict = district === 'Tất cả' || b.district === district;
      const matchesType = bizType === 'Tất cả' || b.type === bizType;
      return matchesQuery && matchesDistrict && matchesType;
    });
  }, [query, district, bizType]);

  function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
    return (
      <Pressable onPress={onPress} style={[styles.chip, { backgroundColor: active ? colors.primary : colors.muted, borderColor: active ? colors.primary : colors.border }]}>
        <Text style={[styles.chipText, { color: active ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Tra cứu</Text>
        <View style={[styles.searchBar, { backgroundColor: colors.muted, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={18} color={colors.mutedForeground} style={{ marginLeft: 12 }} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
            placeholder="Tên sản phẩm, doanh nghiệp..."
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} style={{ padding: 10 }}>
              <Ionicons name="close-circle" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>

        {/* Tabs */}
        <View style={[styles.tabRow, { borderColor: colors.border }]}>
          <Pressable onPress={() => setTab('products')} style={[styles.tabBtn, tab === 'products' && [styles.tabBtnActive, { borderBottomColor: colors.primary }]]}>
            <Text style={[styles.tabBtnText, { color: tab === 'products' ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>
              Sản phẩm ({filteredProducts.length})
            </Text>
          </Pressable>
          <Pressable onPress={() => setTab('businesses')} style={[styles.tabBtn, tab === 'businesses' && [styles.tabBtnActive, { borderBottomColor: colors.primary }]]}>
            <Text style={[styles.tabBtnText, { color: tab === 'businesses' ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>
              Doanh nghiệp ({filteredBusinesses.length})
            </Text>
          </Pressable>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {DISTRICTS.map(d => <FilterChip key={d} label={d} active={district === d} onPress={() => setDistrict(d)} />)}
        </ScrollView>
        {tab === 'products' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {CATEGORIES.map(c => <FilterChip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />)}
          </ScrollView>
        )}
        {tab === 'businesses' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {BUSINESS_TYPES.map(t => <FilterChip key={t} label={t} active={bizType === t} onPress={() => setBizType(t)} />)}
          </ScrollView>
        )}
      </View>

      {/* Results */}
      {tab === 'products' ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={p => p.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 10 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={colors.mutedForeground} />
              <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không tìm thấy sản phẩm</Text>
              <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/product/${item.id}`)}
              style={({ pressed }) => [styles.productItem, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
            >
              <Image source={{ uri: item.image }} style={styles.productItemImg} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.productItemName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.productItemBiz, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{item.businessName}</Text>
                <View style={styles.productItemMeta}>
                  <View style={[styles.districtBadge, { backgroundColor: colors.navyLight }]}>
                    <Text style={[styles.districtBadgeText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{item.district}</Text>
                  </View>
                  <View style={[styles.districtBadge, { backgroundColor: colors.orangeLight }]}>
                    <Text style={[styles.districtBadgeText, { color: colors.accent, fontFamily: 'BeVietnamPro_500Medium' }]}>{item.category}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                  {item.certifications.slice(0, 3).map(c => (
                    <View key={c} style={[styles.certChip, { backgroundColor: colors.muted }]}>
                      <Text style={[styles.certChipText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{c}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
            </Pressable>
          )}
        />
      ) : (
        <FlatList
          data={filteredBusinesses}
          keyExtractor={b => b.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 10 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="business-outline" size={48} color={colors.mutedForeground} />
              <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không tìm thấy doanh nghiệp</Text>
              <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/business/${item.id}`)}
              style={({ pressed }) => [styles.bizItem, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
            >
              <Image source={{ uri: item.image }} style={styles.bizAvatar} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.bizName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.bizMeta, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.type} · {item.district}</Text>
                <View style={{ flexDirection: 'row', gap: 4, marginTop: 4 }}>
                  {item.certifications.slice(0, 2).map(c => (
                    <View key={c} style={[styles.certChip, { backgroundColor: colors.muted }]}>
                      <Text style={[styles.certChipText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{c}</Text>
                    </View>
                  ))}
                  <View style={[styles.certChip, { backgroundColor: colors.navyLight }]}>
                    <Text style={[styles.certChipText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{item.productCount} SP</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1, paddingBottom: 4 },
  headerTitle: { fontSize: 28, paddingHorizontal: 16, marginBottom: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  searchInput: { flex: 1, height: 44, paddingHorizontal: 10, fontSize: 14 },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, marginHorizontal: 16 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabBtnActive: {},
  tabBtnText: { fontSize: 14 },
  filterRow: { paddingHorizontal: 16, gap: 8, paddingVertical: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 8 },
  emptyTitle: { fontSize: 16 },
  emptyDesc: { fontSize: 13, textAlign: 'center' },
  productItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, overflow: 'hidden', gap: 0 },
  productItemImg: { width: 70, height: 70 },
  productItemName: { fontSize: 14, marginLeft: 12, marginTop: 6 },
  productItemBiz: { fontSize: 12, marginTop: 2, marginLeft: 12 },
  productItemMeta: { flexDirection: 'row', gap: 6, marginTop: 4, marginLeft: 12 },
  districtBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  districtBadgeText: { fontSize: 11 },
  certChip: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  certChipText: { fontSize: 11 },
  bizItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, overflow: 'hidden', gap: 0 },
  bizAvatar: { width: 60, height: 60 },
  bizName: { fontSize: 14, marginLeft: 12, marginTop: 6 },
  bizMeta: { fontSize: 12, marginTop: 2, marginLeft: 12 },
  bizCerts: { flexDirection: 'row', gap: 4, marginTop: 4, marginLeft: 12 },
});
