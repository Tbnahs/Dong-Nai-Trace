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
import { getBusiness, getBusinessProducts } from '@/data/mock';

const CERT_COLORS: Record<string, string> = {
  VietGAP: '#16A34A', GlobalGAP: '#0369A1', OCOP: '#D97706', 'Hữu cơ': '#7C3AED', HACCP: '#DC2626', ISO: '#0891B2', FDA: '#0891B2',
};

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const business = getBusiness(id);
  const products = business ? getBusinessProducts(id) : [];

  if (!business) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <Ionicons name="business-outline" size={52} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không tìm thấy doanh nghiệp</Text>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.backBtnText, { fontFamily: 'BeVietnamPro_500Medium' }]}>Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
      {/* Hero with real image */}
      <View style={styles.heroWrapper}>
        <Image source={{ uri: business.image }} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.heroOverlay}>
          <View style={[styles.bizAvatar, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={[styles.bizAvatarText, { fontFamily: 'BeVietnamPro_700Bold' }]}>{business.shortName.slice(0, 2).toUpperCase()}</Text>
          </View>
          <Text style={[styles.bizName, { fontFamily: 'BeVietnamPro_700Bold' }]}>{business.name}</Text>
          <View style={[styles.typeBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={[styles.typeText, { fontFamily: 'BeVietnamPro_500Medium' }]}>{business.type}</Text>
          </View>
          <View style={styles.districtRow}>
            <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.8)" />
            <Text style={[styles.districtText, { fontFamily: 'BeVietnamPro_400Regular' }]}>{business.district}, Đồng Nai</Text>
          </View>
        </View>
      </View>

      <View style={{ padding: 16, gap: 16 }}>
        {/* Stats */}
        <View style={[styles.statsRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>{business.productCount}</Text>
            <Text style={[styles.statLbl, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Sản phẩm</Text>
          </View>
          <View style={[styles.statDiv, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statVal, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>{business.certifications.length}</Text>
            <Text style={[styles.statLbl, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Chứng nhận</Text>
          </View>
          <View style={[styles.statDiv, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <View style={[styles.verifiedDot, { backgroundColor: '#16A34A' }]} />
            <Text style={[styles.statLbl, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Đã duyệt</Text>
          </View>
        </View>

        {/* About */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Giới thiệu</Text>
          <Text style={[styles.descText, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>{business.description}</Text>
        </View>

        {/* Contact info */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Thông tin liên hệ</Text>
          {[
            { icon: 'person-outline', label: 'Đại diện', value: business.representative },
            { icon: 'call-outline', label: 'Điện thoại', value: business.phone },
            { icon: 'mail-outline', label: 'Email', value: business.email },
            { icon: 'location-outline', label: 'Địa chỉ', value: business.address },
            { icon: 'receipt-outline', label: 'Mã số thuế', value: business.taxCode },
          ].map(row => (
            <View key={row.label} style={[styles.infoRow, { borderBottomColor: colors.border }]}>
              <View style={[styles.iconWrap, { backgroundColor: colors.navyLight }]}>
                <Ionicons name={row.icon as any} size={15} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{row.label}</Text>
                <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{row.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Certifications */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>Chứng nhận & Tiêu chuẩn</Text>
          <View style={styles.certsWrap}>
            {business.certifications.map(c => {
              const col = Object.entries(CERT_COLORS).find(([k]) => c.includes(k))?.[1] ?? '#64748B';
              return (
                <View key={c} style={[styles.certBadge, { backgroundColor: col + '18', borderColor: col + '50' }]}>
                  <Ionicons name="ribbon-outline" size={14} color={col} />
                  <Text style={[styles.certText, { color: col, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{c}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Products */}
        {products.length > 0 && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', borderBottomColor: colors.border }]}>
              Sản phẩm ({products.length})
            </Text>
            {products.map((p, idx) => (
              <Pressable
                key={p.id}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push(`/product/${p.id}`); }}
                style={({ pressed }) => [
                  styles.productRow,
                  { borderBottomColor: colors.border, borderBottomWidth: idx < products.length - 1 ? 1 : 0, opacity: pressed ? 0.75 : 1 },
                ]}
              >
                <Image source={{ uri: p.image }} style={styles.productImg} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.productName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{p.name}</Text>
                  <Text style={[styles.productCode, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{p.traceCode} · {p.category}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  notFoundText: { fontSize: 18, marginTop: 12, marginBottom: 20 },
  backBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
  backBtnText: { fontSize: 15, color: '#FFF' },
  heroWrapper: { height: 260, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 22, gap: 8, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center' },
  bizAvatar: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  bizAvatarText: { fontSize: 22, color: '#FFF' },
  bizName: { fontSize: 20, color: '#FFF', textAlign: 'center', lineHeight: 26 },
  typeBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  typeText: { fontSize: 12, color: '#FFF' },
  districtRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  districtText: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  statsRow: { flexDirection: 'row', borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statVal: { fontSize: 18 },
  statLbl: { fontSize: 11, marginTop: 2 },
  statDiv: { width: 1 },
  verifiedDot: { width: 12, height: 12, borderRadius: 6, marginBottom: 2 },
  card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  cardTitle: { fontSize: 15, padding: 14, borderBottomWidth: 1 },
  descText: { fontSize: 13, lineHeight: 20, padding: 14 },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, gap: 10 },
  iconWrap: { width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: 11, marginBottom: 2 },
  infoValue: { fontSize: 13 },
  certsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 14 },
  certBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  certText: { fontSize: 12 },
  productRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  productImg: { width: 48, height: 48, borderRadius: 10 },
  productName: { fontSize: 13 },
  productCode: { fontSize: 11, marginTop: 2 },
});
