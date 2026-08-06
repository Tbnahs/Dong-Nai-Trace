import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { NEWS } from '@/data/mock';

const CATEGORIES = ['Tất cả', 'Chính sách', 'Sự kiện', 'Hướng dẫn', 'Thị trường'];

export default function NewsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState('Tất cả');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const featured = NEWS[0];
  const filtered = useMemo(() =>
    NEWS.filter(n => category === 'Tất cả' || n.category === category),
    [category]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Tin tức</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {CATEGORIES.map(c => (
            <Pressable
              key={c}
              onPress={() => setCategory(c)}
              style={[styles.chip, { backgroundColor: category === c ? colors.primary : colors.muted, borderColor: category === c ? colors.primary : colors.border }]}
            >
              <Text style={[styles.chipText, { color: category === c ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered.slice(1)}
        keyExtractor={n => n.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          category === 'Tất cả' ? (
            <Pressable
              onPress={() => router.push(`/news/${featured.id}`)}
              style={({ pressed }) => [styles.featuredCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 }]}
            >
              <View style={styles.featuredImageWrap}>
                <Image source={{ uri: featured.image }} style={styles.featuredImage} resizeMode="cover" />
                <View style={styles.featuredOverlay}>
                  <View style={[styles.featuredBadge, { backgroundColor: '#E8650A' }]}>
                    <Text style={[styles.featuredBadgeText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Nổi bật</Text>
                  </View>
                </View>
              </View>
              <View style={styles.featuredBody}>
                <View style={[styles.catChip, { backgroundColor: colors.navyLight }]}>
                  <Text style={[styles.catChipText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{featured.category}</Text>
                </View>
                <Text style={[styles.featuredTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{featured.title}</Text>
                <Text style={[styles.featuredExcerpt, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={2}>{featured.excerpt}</Text>
                <View style={styles.featuredMeta}>
                  <Text style={[styles.featuredMetaText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{featured.date}</Text>
                  <View style={styles.viewsRow}>
                    <Ionicons name="eye-outline" size={13} color={colors.mutedForeground} />
                    <Text style={[styles.featuredMetaText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{featured.views.toLocaleString()}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={48} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không có tin tức</Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Thử chọn danh mục khác</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/news/${item.id}`)}
            style={({ pressed }) => [styles.newsItem, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
          >
            <Image source={{ uri: item.image }} style={styles.newsItemImg} resizeMode="cover" />
            <View style={{ flex: 1 }}>
              <View style={[styles.catChip, { backgroundColor: colors.navyLight, alignSelf: 'flex-start' }]}>
                <Text style={[styles.catChipText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{item.category}</Text>
              </View>
              <Text style={[styles.newsItemTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={2}>{item.title}</Text>
              <View style={styles.newsItemMeta}>
                <Text style={[styles.newsItemDate, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.date}</Text>
                <View style={styles.viewsRow}>
                  <Ionicons name="eye-outline" size={12} color={colors.mutedForeground} />
                  <Text style={[styles.newsItemDate, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.views.toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1, paddingBottom: 4 },
  headerTitle: { fontSize: 28, paddingHorizontal: 16, marginBottom: 12 },
  filterRow: { paddingHorizontal: 16, gap: 8, paddingBottom: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 12 },
  featuredCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginTop: 16, marginBottom: 12 },
  featuredImageWrap: { height: 180, position: 'relative' },
  featuredImage: { width: '100%', height: '100%' },
  featuredOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: 'rgba(0,0,0,0.3)' },
  featuredBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  featuredBadgeText: { fontSize: 11, color: '#FFF' },
  featuredBody: { padding: 14, gap: 6 },
  catChip: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  catChipText: { fontSize: 11 },
  featuredTitle: { fontSize: 16, lineHeight: 22 },
  featuredExcerpt: { fontSize: 13, lineHeight: 19 },
  featuredMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  featuredMetaText: { fontSize: 12 },
  viewsRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  newsItem: { flexDirection: 'row', alignItems: 'flex-start', borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginBottom: 10 },
  newsItemImg: { width: 80, height: 80 },
  newsItemTitle: { fontSize: 13, lineHeight: 19, marginTop: 4, paddingRight: 4 },
  newsItemMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, paddingRight: 4 },
  newsItemDate: { fontSize: 11 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 8 },
  emptyTitle: { fontSize: 16 },
  emptyDesc: { fontSize: 13 },
  newsItemBody: { flex: 1, padding: 10, gap: 4 },
});
