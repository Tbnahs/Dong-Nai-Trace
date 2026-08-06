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
} from 'react-native';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAuth, OrgProfile } from '@/context/AuthContext';

const ORG_TYPES = ['Hợp tác xã', 'Doanh nghiệp', 'Hộ kinh doanh', 'Trang trại'];
const INDUSTRIES = ['Nông nghiệp', 'Thủy sản', 'Chăn nuôi', 'Chế biến thực phẩm', 'Khác'];

function Field({ label, value, onChange, placeholder, keyboard = 'default', multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
  keyboard?: 'default' | 'email-address' | 'phone-pad'; multiline?: boolean;
}) {
  const colors = useColors();
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
      <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.muted }, multiline && { height: 80, alignItems: 'flex-start' }]}>
        <TextInput
          style={[styles.inputField, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }, multiline && { height: 76, textAlignVertical: 'top', paddingTop: 10 }]}
          placeholder={placeholder ?? label}
          placeholderTextColor={colors.mutedForeground}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboard}
          autoCapitalize="none"
          multiline={multiline}
        />
      </View>
    </View>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const colors = useColors();
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {options.map(opt => (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.selectChip, { backgroundColor: value === opt ? colors.primary : colors.muted, borderColor: value === opt ? colors.primary : colors.border }]}
          >
            <Text style={[styles.selectChipText, { color: value === opt ? '#FFF' : colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function OrgProfileScreen() {
  const colors = useColors();
  const { user, updateProfile, isLoggedIn } = useAuth();
  const [form, setForm] = useState<OrgProfile>({
    name: '', taxCode: '', type: 'Hợp tác xã', industry: 'Nông nghiệp',
    address: '', district: '', phone: '', email: '',
    representative: '', representativePhone: '', representativeEmail: '', cccd: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      {saved && (
        <View style={[styles.savedBanner, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}>
          <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
          <Text style={[styles.savedText, { color: '#15803D', fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đã lưu hồ sơ thành công</Text>
        </View>
      )}

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thông tin tổ chức</Text>

      <Field label="Tên tổ chức / doanh nghiệp" value={form.name} onChange={set('name')} />
      <Field label="Mã số thuế" value={form.taxCode} onChange={set('taxCode')} placeholder="VD: 3600123456" />
      <SelectField label="Loại hình" value={form.type} options={ORG_TYPES} onChange={set('type')} />
      <SelectField label="Ngành nghề" value={form.industry} options={INDUSTRIES} onChange={set('industry')} />
      <Field label="Địa chỉ" value={form.address} onChange={set('address')} multiline />
      <Field label="Huyện / Thành phố" value={form.district} onChange={set('district')} placeholder="VD: Long Khánh" />
      <Field label="Số điện thoại" value={form.phone} onChange={set('phone')} keyboard="phone-pad" />
      <Field label="Email" value={form.email} onChange={set('email')} keyboard="email-address" />
      {form.type === 'Hợp tác xã' || form.type === 'Doanh nghiệp' ? (
        <Field label="Mã GCP (tùy chọn)" value={form.gcp ?? ''} onChange={set('gcp')} placeholder="VD: 8934673" />
      ) : null}

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', marginTop: 8 }]}>Đại diện pháp lý</Text>

      <Field label="Họ và tên đại diện" value={form.representative} onChange={set('representative')} />
      <Field label="Điện thoại đại diện" value={form.representativePhone} onChange={set('representativePhone')} keyboard="phone-pad" />
      <Field label="Email đại diện" value={form.representativeEmail} onChange={set('representativeEmail')} keyboard="email-address" />
      <Field label="CMND / CCCD" value={form.cccd} onChange={set('cccd')} keyboard="phone-pad" />

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lockedText: { fontSize: 16 },
  loginBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10 },
  loginBtnText: { fontSize: 15, color: '#FFF' },
  savedBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 16 },
  savedText: { fontSize: 14 },
  sectionTitle: { fontSize: 16, marginBottom: 14 },
  fieldLabel: { fontSize: 13, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1 },
  inputField: { flex: 1, height: 44, paddingHorizontal: 12, fontSize: 14 },
  selectChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  selectChipText: { fontSize: 13 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, marginTop: 8 },
  saveBtnText: { fontSize: 16, color: '#FFF' },
});
