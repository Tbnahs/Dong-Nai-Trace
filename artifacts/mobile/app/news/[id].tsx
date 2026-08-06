import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getNewsItem, NEWS } from '@/data/mock';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const article = getNewsItem(id);
  const related = NEWS.filter(n => n.id !== id).slice(0, 3);

  if (!article) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <Ionicons name="newspaper-outline" size={52} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không tìm thấy bài viết</Text>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.backBtnText, { fontFamily: 'BeVietnamPro_500Medium' }]}>Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
      {/* Hero image */}
      <LinearGradient colors={['#1A2E9E', '#2740BA', '#4A63E0']} style={styles.heroImage}>
        <View style={styles.heroOverlay}>
          <View style={[styles.catBadge, { backgroundColor: colors.accent }]}>
            <Text style={[styles.catBadgeText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>{article.category}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ padding: 16 }}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{article.title}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{article.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="person-outline" size={14} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{article.author}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="eye-outline" size={14} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{article.views.toLocaleString()} lượt xem</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.excerpt, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{article.excerpt}</Text>

        <Text style={[styles.content, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>{article.content}</Text>

        {/* Related news */}
        <View style={{ marginTop: 28 }}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Tin tức liên quan</Text>
          </View>
          {related.map(n => (
            <Pressable
              key={n.id}
              onPress={() => router.replace(`/news/${n.id}`)}
              style={({ pressed }) => [styles.relatedItem, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 }]}
            >
              <LinearGradient colors={['#2740BA25', '#7B93FF15']} style={styles.relatedImg}>
                <Ionicons name="newspaper-outline" size={18} color="#2740BA" />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <View style={[styles.catChip, { backgroundColor: colors.navyLight, alignSelf: 'flex-start' }]}>
                  <Text style={[styles.catChipText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{n.category}</Text>
                </View>
                <Text style={[styles.relatedTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={2}>{n.title}</Text>
                <Text style={[styles.relatedDate, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{n.date}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notFoundText: { fontSize: 18, marginTop: 12, marginBottom: 20 },
  backBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
  backBtnText: { fontSize: 15, color: '#FFF' },
  heroImage: { height: 180, justifyContent: 'flex-end' },
  heroOverlay: { padding: 16 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6 },
  catBadgeText: { fontSize: 12, color: '#FFF' },
  title: { fontSize: 22, lineHeight: 30, marginBottom: 14 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12 },
  divider: { height: 1, marginBottom: 16 },
  excerpt: { fontSize: 15, lineHeight: 24, marginBottom: 16, fontStyle: 'italic' },
  content: { fontSize: 14, lineHeight: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionAccent: { width: 3, height: 18, borderRadius: 2 },
  sectionTitle: { fontSize: 16 },
  relatedItem: { flexDirection: 'row', gap: 10, padding: 10, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  relatedImg: { width: 64, height: 64, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  catChip: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4, marginBottom: 3 },
  catChipText: { fontSize: 10 },
  relatedTitle: { fontSize: 13, lineHeight: 18 },
  relatedDate: { fontSize: 11, marginTop: 4 },
});
