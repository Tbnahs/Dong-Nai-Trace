import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getProduct, getBusiness } from '@/data/mock';

const CERT_COLORS: Record<string, string> = {
  VietGAP: '#16A34A', GlobalGAP: '#0369A1', OCOP: '#D97706',
  'Hữu cơ': '#7C3AED', HACCP: '#DC2626', FDA: '#0891B2',
  'ISO 22000': '#0891B2', ASC: '#0E7490', VSATTP: '#64748B',
};

type Tab = 'journey' | 'info' | 'org';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const product = getProduct(id);
  const business = product ? getBusiness(product.businessId) : null;
  const [activeTab, setActiveTab] = useState<Tab>('journey');
  const [selectedLot, setSelectedLot] = useState(product?.lotNumber ?? '');

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

  const primaryCert = product.certifications[0] ?? '';
  const certColor = Object.entries(CERT_COLORS).find(([k]) => primaryCert.includes(k))?.[1] ?? '#64748B';

  const TABS: { key: Tab; icon: string; label: string }[] = [
    { key: 'journey', icon: 'git-branch-outline', label: 'Hành trình' },
    { key: 'info',    icon: 'information-circle-outline', label: 'Thông tin' },
    { key: 'org',     icon: 'business-outline', label: 'Doanh nghiệp' },
  ];

  const handleShare = async () => {
    try {
      await Share.share({ message: `Sản phẩm: ${product.name}\nMã TXNG: ${product.traceCode}` });
    } catch (_) {}
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Hero image ── */}
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

      {/* ── Verify badge ── */}
      <View style={[styles.verifyBanner, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}>
        <View style={[styles.verifyDot, { backgroundColor: '#16A34A' }]} />
        <Text style={[styles.verifyText, { color: '#15803D', fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đã xác thực nguồn gốc</Text>
        <Ionicons name="shield-checkmark" size={18} color="#16A34A" />
      </View>

      <View style={{ paddingHorizontal: 16, gap: 14 }}>
        {/* ── Cert + name + description ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={{ padding: 14 }}>
            {primaryCert ? (
              <View style={[styles.certPill, { backgroundColor: certColor + '18', borderColor: certColor + '50' }]}>
                <View style={[styles.certPillDot, { backgroundColor: certColor }]} />
                <Text style={[styles.certPillText, { color: certColor, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{primaryCert}</Text>
              </View>
            ) : null}
            <Text style={[styles.productTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{product.name}</Text>
            <Text style={[styles.traceLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
              Mã truy xuất: <Text style={[styles.traceCode, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>{product.traceCode}</Text>
            </Text>
            <Text style={[styles.descText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular', marginTop: 8 }]}>{product.description}</Text>
          </View>

          {/* Quick stats row */}
          <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
            {[
              { icon: 'location-outline', label: 'Nguồn gốc', value: product.origin },
              { icon: 'layers-outline',   label: 'Quy cách',  value: product.weight },
              { icon: 'calendar-outline', label: 'Cập nhật',  value: product.productionDate },
              { icon: 'time-outline',     label: 'Hạn SD',    value: product.expiryDate },
            ].map(item => (
              <View key={item.label} style={styles.statCell}>
                <Ionicons name={item.icon as any} size={14} color={colors.mutedForeground} />
                <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.label}</Text>
                <Text style={[styles.statValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={2}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── QR code card (matches Portal) ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={{ padding: 14, alignItems: 'center', gap: 10 }}>
            <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Mã QR truy xuất nguồn gốc</Text>
            <View style={[styles.qrWrapper, { borderColor: colors.border }]}>
              <Image
                source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(product.traceCode)}&margin=4` }}
                style={styles.qrImage}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.qrHint, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Quét mã để xem thông tin truy xuất</Text>
            <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
              <Pressable
                onPress={() => Alert.alert('Tải QR', 'Tính năng tải QR sẽ sớm ra mắt.')}
                style={({ pressed }) => [styles.qrBtn, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
              >
                <Ionicons name="download-outline" size={16} color={colors.foreground} />
                <Text style={[styles.qrBtnText, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Tải QR</Text>
              </Pressable>
              <Pressable
                onPress={handleShare}
                style={({ pressed }) => [styles.qrBtn, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
              >
                <Ionicons name="share-outline" size={16} color={colors.foreground} />
                <Text style={[styles.qrBtnText, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Chia sẻ</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ── Tabs (Hành trình / Thông tin / Doanh nghiệp) ── */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Tab header */}
          <View style={[styles.tabRow, { borderBottomColor: colors.border }]}>
            {TABS.map(tab => {
              const active = activeTab === tab.key;
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setActiveTab(tab.key); }}
                  style={[styles.tabBtn, active && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
                >
                  <Ionicons name={tab.icon as any} size={15} color={active ? colors.primary : colors.mutedForeground} />
                  <Text style={[styles.tabBtnText, { color: active ? colors.primary : colors.mutedForeground, fontFamily: active ? 'BeVietnamPro_600SemiBold' : 'BeVietnamPro_400Regular' }]}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {activeTab === 'journey' && (
            <View style={[styles.lotPicker, { borderBottomColor: colors.border }]}>
              <Text style={[styles.lotLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Lô / mẻ</Text>
              <Pressable
                onPress={() => setSelectedLot(selectedLot === product.lotNumber ? '' : product.lotNumber)}
                style={[styles.lotSelect, { borderColor: colors.border, backgroundColor: colors.background }]}
                accessibilityRole="button"
                accessibilityLabel="Chọn lô hoặc mẻ"
              >
                <Text style={[styles.lotValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>
                  {selectedLot || 'Chưa có thông tin lô / mẻ'}
                </Text>
                <Ionicons name="chevron-down" size={17} color={colors.mutedForeground} />
              </Pressable>
            </View>
          )}

          {/* ── Tab: Hành trình ── */}
          {activeTab === 'journey' && (
            <View style={{ padding: 14 }}>
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
                    {step.images?.length ? (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageStrip}>
                        {step.images.map((image, imageIndex) => (
                          <Image key={`${image}-${imageIndex}`} source={{ uri: image }} style={styles.journeyImage} resizeMode="cover" />
                        ))}
                      </ScrollView>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ── Tab: Thông tin sản phẩm ── */}
          {activeTab === 'info' && (
            <View>
              {[
                { icon: 'location-outline',  label: 'Xuất xứ',        value: product.origin },
                { icon: 'calendar-outline',  label: 'Ngày sản xuất',  value: product.productionDate },
                { icon: 'time-outline',      label: 'Hạn sử dụng',    value: product.expiryDate },
                { icon: 'layers-outline',    label: 'Số lô',           value: product.lotNumber },
                { icon: 'scale-outline',     label: 'Quy cách',        value: product.weight },
                { icon: 'barcode-outline',   label: 'GTIN',            value: product.gtin },
                { icon: 'ribbon-outline',    label: 'Chứng nhận',      value: product.certifications.join(', ') || '—' },
              ].map(row => (
                <View key={row.label} style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                  <Ionicons name={row.icon as any} size={16} color={colors.primary} style={{ width: 20 }} />
                  <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{row.label}</Text>
                  <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{row.value}</Text>
                </View>
              ))}

              {/* Certifications section */}
              {product.certifications.length > 0 && (
                <View style={{ padding: 14 }}>
                  <Text style={[styles.subSectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold', marginBottom: 10 }]}>Chứng nhận & Tiêu chuẩn</Text>
                  <View style={styles.certsWrap}>
                    {product.certifications.map(c => {
                      const col = Object.entries(CERT_COLORS).find(([k]) => c.includes(k))?.[1] ?? '#64748B';
                      return (
                        <View key={c} style={[styles.certBadge, { backgroundColor: col + '18', borderColor: col + '50' }]}>
                          <Ionicons name="checkmark-circle" size={14} color={col} />
                          <Text style={[styles.certText, { color: col, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{c}</Text>
                        </View>
                      );
                    })}
                  </View>
                  {product.certificationDocuments?.map(document => (
                    <View key={document.name} style={[styles.documentCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                      <Image source={{ uri: document.image }} style={styles.documentImage} resizeMode="cover" />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.documentName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{document.name}</Text>
                        <Text style={[styles.documentMeta, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Cấp bởi: {document.issuer}</Text>
                        <Text style={[styles.documentMeta, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Hiệu lực đến {document.expiry}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* ── Tab: Doanh nghiệp ── */}
          {activeTab === 'org' && (
            <View>
              {business ? (
                <>
                  <Pressable
                    onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push(`/business/${product.businessId}`); }}
                    style={({ pressed }) => [styles.orgHero, { backgroundColor: colors.navyLight, opacity: pressed ? 0.85 : 1 }]}
                  >
                    <View style={[styles.orgAvatar, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.orgAvatarText, { fontFamily: 'BeVietnamPro_700Bold' }]}>
                        {business.shortName.slice(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.orgName, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>{business.name}</Text>
                      <Text style={[styles.orgType, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{business.type} · {business.district}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                  </Pressable>

                  {[
                    { icon: 'person-outline',   label: 'Đại diện',   value: business.representative },
                    { icon: 'call-outline',      label: 'Điện thoại', value: business.phone },
                    { icon: 'mail-outline',      label: 'Email',      value: business.email },
                    { icon: 'location-outline',  label: 'Địa chỉ',   value: business.address },
                    { icon: 'receipt-outline',   label: 'MST',        value: business.taxCode },
                    { icon: 'cube-outline',      label: 'Sản phẩm',  value: `${business.productCount} sản phẩm đã đăng ký` },
                  ].map(row => (
                    <View key={row.label} style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                      <Ionicons name={row.icon as any} size={16} color={colors.primary} style={{ width: 20 }} />
                      <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{row.label}</Text>
                      <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]} numberOfLines={2}>{row.value}</Text>
                    </View>
                  ))}

                  {business.certifications.length > 0 && (
                    <View style={{ padding: 14 }}>
                      <Text style={[styles.subSectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold', marginBottom: 10 }]}>Chứng nhận doanh nghiệp</Text>
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
                  )}
                </>
              ) : (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <Ionicons name="business-outline" size={40} color={colors.mutedForeground} />
                  <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular', marginTop: 8 }]}>Không có thông tin doanh nghiệp</Text>
                </View>
              )}
            </View>
          )}
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
  heroProductName: { fontSize: 22, color: '#FFF', lineHeight: 28 },
  codeChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  codeChipText: { fontSize: 11, color: 'rgba(255,255,255,0.9)' },

  verifyBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, margin: 16, marginBottom: 0, padding: 12, borderRadius: 10, borderWidth: 1 },
  verifyDot: { width: 8, height: 8, borderRadius: 4 },
  verifyText: { flex: 1, fontSize: 14 },

  card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginTop: 14 },
  cardTitle: { fontSize: 15, marginBottom: 10 },

  certPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, marginBottom: 8 },
  certPillDot: { width: 6, height: 6, borderRadius: 3 },
  certPillText: { fontSize: 12 },
  productTitle: { fontSize: 22, lineHeight: 28, marginBottom: 4 },
  traceLabel: { fontSize: 13 },
  traceCode: { fontSize: 13 },
  descText: { fontSize: 13, lineHeight: 20 },

  statsRow: { flexDirection: 'row', borderTopWidth: 1 },
  statCell: { flex: 1, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 4, gap: 3 },
  statLabel: { fontSize: 10, textAlign: 'center' },
  statValue: { fontSize: 11, textAlign: 'center' },

  qrWrapper: { padding: 10, borderRadius: 14, borderWidth: 1 },
  qrImage: { width: 160, height: 160 },
  qrHint: { fontSize: 12 },
  qrBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  qrBtnText: { fontSize: 13 },

  tabRow: { flexDirection: 'row', borderBottomWidth: 1 },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabBtnText: { fontSize: 12 },

  timelineItem: { flexDirection: 'row', marginBottom: 4 },
  timelineLeft: { alignItems: 'center', width: 32 },
  timelineDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  timelineDotNum: { fontSize: 12, color: '#FFF' },
  timelineLine: { width: 2, flex: 1, marginTop: 4, minHeight: 16 },
  timelineContent: { flex: 1, marginLeft: 10, marginBottom: 12, padding: 10, borderRadius: 10, borderWidth: 1 },
  timelineStep: { fontSize: 13, marginBottom: 4 },
  timelineDesc: { fontSize: 12, lineHeight: 18, marginBottom: 6 },
  timelineMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  timelineMetaText: { fontSize: 11 },
  imageStrip: { gap: 8, paddingTop: 10 },
  journeyImage: { width: 112, height: 78, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1 },
  infoLabel: { fontSize: 13, width: 100 },
  infoValue: { flex: 1, fontSize: 13, textAlign: 'right' },
  subSectionTitle: { fontSize: 14 },

  certsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  certBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  certText: { fontSize: 12 },
  documentCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, borderWidth: 1, marginTop: 10 },
  documentImage: { width: 92, height: 62, borderRadius: 7 },
  documentName: { fontSize: 13, marginBottom: 3 },
  documentMeta: { fontSize: 11, lineHeight: 16 },

  orgHero: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  orgAvatar: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  orgAvatarText: { fontSize: 16, color: '#FFF' },
  orgName: { fontSize: 15 },
  orgType: { fontSize: 12, marginTop: 2 },
});
