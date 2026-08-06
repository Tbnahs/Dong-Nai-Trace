import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getProduct } from '@/data/mock';

const CERT_COLORS: Record<string, string> = {
  VietGAP: '#16A34A', GlobalGAP: '#0369A1', OCOP: '#D97706', 'Hữu cơ': '#7C3AED', HACCP: '#DC2626', FDA: '#0891B2',
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const product = getProduct(id);

  if (!product) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <Ionicons name="alert-circle-outline" size={52} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không tìm thấy sản phẩm</Text>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.backBtnText, { fontFamily: 'BeVietnamPro_500Medium' }]}>Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
      {/* Hero image */}
      <View style={styles.heroWrapper}>
        <Image source={{ uri: product.image }} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.heroOverlay}>
          <View style={[styles.categoryBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={[styles.categoryText, { fontFamily: 'BeVietnamPro_500Medium' }]}>{product.category}</Text>
          </View>
          <Text style={[styles.heroProductName, { fontFamily: 'BeVietnamPro_700Bold' }]}>{product.name}</Text>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            <View style={styles.codeChip}>
              <Ionicons name="qr-code-outline" size={13} color="rgba(255,255,255,0.9)" />
              <Text style={[styles.codeChipText, { fontFamily: 'BeVietnamPro_400Regular' }]}>{product.traceCode}</Text>
            </View>
            <View style={styles.codeChip}>
              <Ionicons name="barcode-outline" size={13} color="rgba(255,255,255,0.9)" />
              <Text style={[styles.codeChipText, { fontFamily: 'BeVietnamPro_400Regular' }]}>{product.gtin}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Verify badge */}
      <View style={[styles.verifyBanner, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}>
        <View style={[styles.verifyDot, { backgroundColor: '#16A34A' }]} />
        <Text style={[styles.verifyText, { color: '#15803D', fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đã xác thực nguồn gốc</Text>
        <Ionicons name="shield-checkmark" size={18} color="#16A34A" />
      </View>

      <View style={{ padding: 16, gap: 16 }}>
        {/* Basic info */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Thông tin sản phẩm</Text>
          {[
            { icon: 'location-outline', label: 'Xuất xứ', value: product.origin },
            { icon: 'calendar-outline', label: 'Ngày sản xuất', value: product.productionDate },
            { icon: 'time-outline', label: 'Hạn sử dụng', value: product.expiryDate },
            { icon: 'layers-outline', label: 'Số lô', value: product.lotNumber },
            { icon: 'scale-outline', label: 'Quy cách', value: product.weight },
          ].map(row => (
            <View key={row.label} style={[styles.infoRow, { borderBottomColor: colors.border }]}>
              <Ionicons name={row.icon as any} size={16} color={colors.primary} style={{ width: 20 }} />
              <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{row.label}</Text>
              <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Mô tả sản phẩm</Text>
          <Text style={[styles.descText, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>{product.description}</Text>
        </View>

        {/* Certifications */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Chứng nhận & Tiêu chuẩn</Text>
          <View style={styles.certsWrap}>
            {product.certifications.map(c => {
              const col = CERT_COLORS[c.split(' ')[0]] ?? '#64748B';
              return (
                <View key={c} style={[styles.certBadge, { backgroundColor: col + '18', borderColor: col + '50' }]}>
                  <Ionicons name="checkmark-circle" size={14} color={col} />
                  <Text style={[styles.certText, { color: col, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{c}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Producer */}
        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push(`/business/${product.businessId}`); }}
          style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1, overflow: 'hidden' }]}
        >
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Nhà sản xuất</Text>
          <View style={styles.producerRow}>
            <View style={[styles.producerAvatar, { backgroundColor: colors.navyLight, overflow: 'hidden' }]}>
              <Ionicons name="business" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.producerName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{product.businessName}</Text>
              <Text style={[styles.producerOrigin, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{product.district}, {product.province}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </View>
        </Pressable>

        {/* Process timeline */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Hành trình sản phẩm</Text>
          {product.process.map((step, idx) => (
            <View key={idx} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineDot, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.timelineDotNum, { fontFamily: 'BeVietnamPro_700Bold' }]}>{idx + 1}</Text>
                </View>
                {idx < product.process.length - 1 && <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />}
              </View>
              <View style={[styles.timelineContent, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={[styles.timelineStep, { color: colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{step.step}</Text>
                <Text style={[styles.timelineDesc, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>{step.description}</Text>
                <View style={styles.timelineMeta}>
                  <Ionicons name="calendar-outline" size={12} color={colors.mutedForeground} />
                  <Text style={[styles.timelineMetaText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{step.date}</Text>
                  <Ionicons name="location-outline" size={12} color={colors.mutedForeground} />
                  <Text style={[styles.timelineMetaText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{step.location}</Text>
                </View>
              </View>
            </View>
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
  heroWrapper: { height: 240, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, gap: 10, backgroundColor: 'rgba(0,0,0,0.42)' },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  categoryText: { fontSize: 12, color: '#FFF' },
  heroProductName: { fontSize: 24, color: '#FFF', lineHeight: 30 },
  codeChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  codeChipText: { fontSize: 11, color: 'rgba(255,255,255,0.9)' },
  verifyBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, margin: 16, padding: 12, borderRadius: 10, borderWidth: 1 },
  verifyDot: { width: 8, height: 8, borderRadius: 4 },
  verifyText: { flex: 1, fontSize: 14 },
  card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  cardTitle: { fontSize: 15, padding: 14, borderBottomWidth: 1 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1 },
  infoLabel: { fontSize: 13, width: 110 },
  infoValue: { flex: 1, fontSize: 13, textAlign: 'right' },
  descText: { fontSize: 13, lineHeight: 20, padding: 14 },
  certsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 14 },
  certBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  certText: { fontSize: 12 },
  producerRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  producerAvatar: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  producerName: { fontSize: 15 },
  producerOrigin: { fontSize: 12, marginTop: 2 },
  timelineItem: { flexDirection: 'row', paddingHorizontal: 14, paddingTop: 12 },
  timelineLeft: { alignItems: 'center', width: 32 },
  timelineDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  timelineDotNum: { fontSize: 12, color: '#FFF' },
  timelineLine: { width: 2, flex: 1, marginTop: 4, minHeight: 16 },
  timelineContent: { flex: 1, marginLeft: 10, marginBottom: 12, padding: 10, borderRadius: 10, borderWidth: 1 },
  timelineStep: { fontSize: 13, marginBottom: 4 },
  timelineDesc: { fontSize: 12, lineHeight: 18, marginBottom: 6 },
  timelineMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  timelineMetaText: { fontSize: 11 },
});
