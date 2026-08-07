import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth, OrgProfile } from '@/context/AuthContext';
import { ModalPicker } from '@/components/ModalPicker';
import { ORG_TYPE_OPTIONS, SECTOR_OPTIONS, DISTRICT_OPTIONS } from '@/data/mock';

function Field({ label, value, onChange, placeholder, keyboard = 'default', multiline = false, editable = true }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
  keyboard?: 'default' | 'email-address' | 'phone-pad'; multiline?: boolean; editable?: boolean;
}) {
  const colors = useColors();
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
      <View style={[styles.inputWrap, { borderColor: editable ? colors.border : colors.border, backgroundColor: editable ? colors.muted : '#F8FAFC' }, multiline && { height: 80, alignItems: 'flex-start' }]}>
        <TextInput
          style={[styles.inputField, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }, multiline && { height: 76, textAlignVertical: 'top', paddingTop: 10 }]}
          placeholder={placeholder ?? label}
          placeholderTextColor={colors.mutedForeground}
          value={value}
          onChangeText={onChange}
          editable={editable}
          keyboardType={keyboard}
          autoCapitalize="none"
          multiline={multiline}
        />
      </View>
    </View>
  );
}

export default function OrgProfileScreen() {
  const colors = useColors();
  const { user, updateProfile, isLoggedIn } = useAuth();
  const [form, setForm] = useState<OrgProfile>({
    name: '', taxCode: '', type: 'Doanh nghiệp', industry: 'Nông sản & Rau củ',
    address: '', district: '', phone: '', email: '',
    representative: '', representativePhone: '', representativeEmail: '', cccd: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'id'>('info');

  const pickDocument = async (key: 'businessLicense' | 'authorizationDocument' | 'certification' | 'businessImage') => {
    const result = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'], copyToCacheDirectory: true });
    if (result.canceled || !result.assets?.[0]) return;
    const asset = result.assets[0];
    setForm(current => ({ ...current, [key]: {
      name: asset.name,
      uri: asset.uri,
      mimeType: asset.mimeType,
      size: asset.size,
    } }));
    setSaved(false);
  };

  const documentRows: Array<{ key: 'businessLicense' | 'authorizationDocument' | 'certification' | 'businessImage'; label: string }> = [
    { key: 'businessLicense', label: 'Giấy phép kinh doanh' },
    { key: 'authorizationDocument', label: 'Giấy ủy quyền' },
    { key: 'certification', label: `Giấy chứng nhận${form.certificationType ? ` · ${form.certificationType}` : ''}` },
    { key: 'businessImage', label: 'Hình ảnh doanh nghiệp' },
  ];

  useEffect(() => {
    if (user?.profile) setForm(user.profile);
  }, [user]);

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, gap: 12 }}>
        <Ionicons name="lock-closed-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.lockedText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Cần đăng nhập để xem hồ sơ</Text>
        <Pressable onPress={() => router.replace('/(tabs)/account')} style={[styles.loginBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.loginBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đăng nhập</Text>
        </Pressable>
      </View>
    );
  }

  const set = (key: keyof OrgProfile) => (val: string) => { setForm(f => ({ ...f, [key]: val })); setSaved(false); };

  const handleSave = async () => {
    if (!form.name.trim()) { Alert.alert('Lỗi', 'Tên tổ chức không được trống'); return; }
    setSaving(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await updateProfile(form);
    setSaving(false);
    setSaved(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.approvalBanner, { backgroundColor: '#FFFBEB', borderColor: '#FCD34D' }]}>
        <View style={styles.approvalIcon}>
          <Ionicons name="alert-circle-outline" size={20} color="#D97706" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.approvalTitle, { color: '#92400E', fontFamily: 'BeVietnamPro_700Bold' }]}>Hồ sơ chưa được duyệt</Text>
          <Text style={[styles.approvalDesc, { color: '#B45309', fontFamily: 'BeVietnamPro_400Regular' }]}>Hồ sơ đang được Sở KH&CN Đồng Nai thẩm định. Thời gian xử lý: 3–5 ngày làm việc.</Text>
        </View>
        <Text style={[styles.approvalBadge, { fontFamily: 'BeVietnamPro_700Bold' }]}>Chờ duyệt</Text>
      </View>

      {saved && (
        <View style={[styles.savedBanner, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}>
          <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
          <Text style={[styles.savedText, { color: '#15803D', fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đã lưu hồ sơ thành công</Text>
        </View>
      )}

      <View style={[styles.tabRow, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => setActiveTab('info')} style={[styles.tabButton, activeTab === 'info' && { borderBottomColor: colors.primary }]}>
          <Text style={[styles.tabText, { color: activeTab === 'info' ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Thông tin pháp lý</Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('id')} style={[styles.tabButton, activeTab === 'id' && { borderBottomColor: colors.primary }]}>
          <Text style={[styles.tabText, { color: activeTab === 'id' ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Mã định danh</Text>
        </Pressable>
      </View>

      {activeTab === 'info' ? (
      <>
      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thông tin tổ chức</Text>

      <Field label="Tên tổ chức / doanh nghiệp" value={form.name} onChange={set('name')} />
      <Field label="Mã số thuế" value={form.taxCode} onChange={set('taxCode')} placeholder="VD: 3600123456" editable={false} />
      <Text style={[styles.fieldHint, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>MST không thể thay đổi. Liên hệ Sở KH&CN nếu cần.</Text>

      {/* Loại hình — dropdown matching portal orgType <select> */}
      <View style={{ marginBottom: 14 }}>
        <ModalPicker
          label="Loại hình tổ chức"
          value={form.type}
          options={ORG_TYPE_OPTIONS}
          onChange={set('type')}
        />
      </View>

      {/* Ngành nghề — dropdown matching portal sector <select> */}
      <View style={{ marginBottom: 14 }}>
        <ModalPicker
          label="Ngành nghề"
          value={form.industry}
          options={SECTOR_OPTIONS}
          onChange={set('industry')}
        />
      </View>

      <Field label="Địa chỉ" value={form.address} onChange={set('address')} multiline />

      {/* Huyện/Thành phố — dropdown matching portal district <select> */}
      <View style={{ marginBottom: 14 }}>
        <ModalPicker
          label="Huyện / Thành phố"
          value={form.district}
          options={DISTRICT_OPTIONS}
          placeholder="Chọn huyện / thành phố..."
          onChange={set('district')}
        />
      </View>

      <Field label="Số điện thoại" value={form.phone} onChange={set('phone')} keyboard="phone-pad" />
      <Field label="Email" value={form.email} onChange={set('email')} keyboard="email-address" />
      {(form.type === 'Doanh nghiệp' || form.type === 'Hợp tác xã (HTX)') && (
        <Field label="Mã GCP (tùy chọn)" value={form.gcp ?? ''} onChange={set('gcp')} placeholder="VD: 8934673" />
      )}

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', marginTop: 8 }]}>Đại diện pháp lý</Text>

      <Field label="Họ và tên đại diện" value={form.representative} onChange={set('representative')} />
      <Field label="Điện thoại đại diện" value={form.representativePhone} onChange={set('representativePhone')} keyboard="phone-pad" />
      <Field label="Email đại diện" value={form.representativeEmail} onChange={set('representativeEmail')} keyboard="email-address" />
      <Field label="CMND / CCCD" value={form.cccd} onChange={set('cccd')} keyboard="phone-pad" />

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', marginTop: 8 }]}>Tài liệu đính kèm</Text>
      <Text style={[styles.documentHint, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Hồ sơ số hóa dùng để xác minh doanh nghiệp.</Text>
      {documentRows.map(row => {
        const doc = form[row.key];
        return (
          <Pressable key={row.key} onPress={() => pickDocument(row.key)} style={[styles.documentRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {row.key === 'businessImage' && doc?.uri
              ? <Image source={{ uri: doc.uri }} style={styles.documentThumb} />
              : <Ionicons name={doc ? 'document-text-outline' : 'cloud-upload-outline'} size={22} color={doc ? colors.primary : colors.mutedForeground} />}
            <View style={{ flex: 1 }}>
              <Text style={[styles.documentLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{row.label}</Text>
              <Text style={[styles.documentName, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{doc?.name ?? 'Chưa có tệp · Nhấn để tải lên'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
          </Pressable>
        );
      })}

      <Pressable
        onPress={handleSave}
        disabled={saving}
        style={({ pressed }) => [styles.saveBtn, { backgroundColor: colors.primary, opacity: pressed || saving ? 0.8 : 1 }]}
      >
        {saving
          ? <ActivityIndicator color="#FFF" />
          : <>
              <Ionicons name="save-outline" size={18} color="#FFF" />
              <Text style={[styles.saveBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Lưu hồ sơ</Text>
            </>
        }
      </Pressable>
      </>
      ) : (
        <View style={[styles.identityCard, { backgroundColor: '#FFFBEB', borderColor: '#FCD34D' }]}>
          <View style={styles.identityIcon}>
            <Ionicons name="finger-print-outline" size={34} color="#D97706" />
          </View>
          <Text style={[styles.identityTitle, { color: '#92400E', fontFamily: 'BeVietnamPro_700Bold' }]}>Chờ cấp mã định danh</Text>
          <Text style={[styles.identityDesc, { color: '#B45309', fontFamily: 'BeVietnamPro_400Regular' }]}>Mã định danh chính thức sẽ được cấp sau khi hồ sơ được Sở Khoa học & Công nghệ phê duyệt.</Text>
          <Pressable disabled style={styles.disabledIdentityBtn}>
            <Text style={[styles.disabledIdentityText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Yêu cầu cấp mã</Text>
          </Pressable>
          <Text style={[styles.identityHint, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Nút này sẽ khả dụng khi hồ sơ được duyệt.</Text>
          <View style={[styles.identityIncludes, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.identityIncludesTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Mã định danh sẽ bao gồm</Text>
            {['QR Code chính thức gắn với sản phẩm', 'File QR có thể tải về và in ấn', 'Mã số định danh duy nhất trên hệ thống'].map(item => (
              <View key={item} style={styles.identityRow}>
                <Ionicons name="checkmark-circle-outline" size={18} color={colors.mutedForeground} />
                <Text style={[styles.identityRowText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lockedText: { fontSize: 16 },
  loginBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10 },
  loginBtnText: { fontSize: 15, color: '#FFF' },
  savedBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 16 },
  savedText: { fontSize: 14 },
  approvalBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 16 },
  approvalIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center' },
  approvalTitle: { fontSize: 13 },
  approvalDesc: { fontSize: 11, lineHeight: 16, marginTop: 2 },
  approvalBadge: { color: '#FFF', backgroundColor: '#F59E0B', fontSize: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, marginBottom: 18 },
  tabButton: { paddingVertical: 11, paddingHorizontal: 14, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabText: { fontSize: 13 },
  sectionTitle: { fontSize: 16, marginBottom: 14 },
  fieldHint: { fontSize: 11, marginTop: -8, marginBottom: 14 },
  fieldLabel: { fontSize: 13, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1 },
  inputField: { flex: 1, height: 44, paddingHorizontal: 12, fontSize: 14 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, marginTop: 8 },
  saveBtnText: { fontSize: 16, color: '#FFF' },
  documentHint: { fontSize: 12, marginTop: -8, marginBottom: 10 },
  documentRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 8 },
  documentThumb: { width: 42, height: 42, borderRadius: 8 },
  documentLabel: { fontSize: 13 },
  documentName: { fontSize: 11, marginTop: 3 },
  identityCard: { borderRadius: 14, borderWidth: 1, padding: 18, alignItems: 'center' },
  identityIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  identityTitle: { fontSize: 18, marginBottom: 8 },
  identityDesc: { fontSize: 13, lineHeight: 20, textAlign: 'center' },
  disabledIdentityBtn: { marginTop: 16, paddingHorizontal: 20, paddingVertical: 11, borderRadius: 10, backgroundColor: '#D1D5DB' },
  disabledIdentityText: { fontSize: 13, color: '#6B7280' },
  identityHint: { fontSize: 11, fontStyle: 'italic', marginTop: 8 },
  identityIncludes: { alignSelf: 'stretch', marginTop: 18, padding: 14, borderRadius: 12, borderWidth: 1, gap: 10 },
  identityIncludesTitle: { fontSize: 13, marginBottom: 2 },
  identityRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  identityRowText: { flex: 1, fontSize: 12 },
});
