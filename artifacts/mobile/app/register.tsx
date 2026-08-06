import React, { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useAuth, OrgProfile } from '@/context/AuthContext';

const STEPS = ['Tổ chức', 'Đại diện', 'Xác nhận'];

export default function RegisterScreen() {
  const colors = useColors();
  const { register } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<OrgProfile & { password: string; confirmPassword: string }>({
    name: '', taxCode: '', type: 'Hợp tác xã', industry: 'Nông nghiệp',
    address: '', district: '', phone: '', email: '',
    representative: '', representativePhone: '', representativeEmail: '', cccd: '',
    gcp: '', password: '', confirmPassword: '',
  });

  const set = (key: keyof typeof form) => (val: string) => setForm(f => ({ ...f, [key]: val }));

  function Field({ label, fieldKey, keyboard = 'default', secure = false, placeholder }: {
    label: string; fieldKey: keyof typeof form;
    keyboard?: 'default' | 'email-address' | 'phone-pad'; secure?: boolean; placeholder?: string;
  }) {
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
        <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.muted }]}>
          <TextInput
            style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
            value={form[fieldKey] as string}
            onChangeText={set(fieldKey)}
            keyboardType={keyboard}
            autoCapitalize="none"
            secureTextEntry={secure}
            placeholder={placeholder ?? label}
            placeholderTextColor={colors.mutedForeground}
          />
        </View>
      </View>
    );
  }

  function SelectRow({ label, fieldKey, options }: { label: string; fieldKey: keyof typeof form; options: string[] }) {
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {options.map(opt => (
            <Pressable key={opt} onPress={() => set(fieldKey)(opt)} style={[styles.chip, { backgroundColor: form[fieldKey] === opt ? colors.primary : colors.muted, borderColor: form[fieldKey] === opt ? colors.primary : colors.border }]}>
              <Text style={[styles.chipText, { color: form[fieldKey] === opt ? '#FFF' : colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{opt}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  const validateStep = () => {
    if (step === 0) {
      if (!form.name.trim()) { Alert.alert('Lỗi', 'Vui lòng nhập tên tổ chức'); return false; }
      if (!form.email.trim()) { Alert.alert('Lỗi', 'Vui lòng nhập email'); return false; }
    }
    if (step === 1) {
      if (!form.representative.trim()) { Alert.alert('Lỗi', 'Vui lòng nhập tên đại diện'); return false; }
    }
    if (step === 2) {
      if (!form.password.trim() || form.password.length < 6) { Alert.alert('Lỗi', 'Mật khẩu ít nhất 6 ký tự'); return false; }
      if (form.password !== form.confirmPassword) { Alert.alert('Lỗi', 'Mật khẩu không khớp'); return false; }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    if (step < 2) { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setStep(s => s + 1); return; }
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await register({ name: form.name, taxCode: form.taxCode, type: form.type, industry: form.industry, address: form.address, district: form.district, phone: form.phone, email: form.email, representative: form.representative, representativePhone: form.representativePhone, representativeEmail: form.representativeEmail, cccd: form.cccd, gcp: form.gcp }, form.password);
    setLoading(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace('/(tabs)/account');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
      {/* Step indicator */}
      <LinearGradient colors={['#1A2E9E', '#2740BA']} style={styles.stepHeader}>
        <Text style={[styles.stepTitle, { fontFamily: 'BeVietnamPro_700Bold' }]}>Đăng ký tham gia TXNG</Text>
        <View style={styles.stepRow}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <View style={styles.stepItem}>
                <View style={[styles.stepDot, { backgroundColor: i <= step ? '#FFF' : 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.5)' }]}>
                  {i < step
                    ? <Ionicons name="checkmark" size={14} color="#2740BA" />
                    : <Text style={[styles.stepNum, { color: i === step ? '#2740BA' : 'rgba(255,255,255,0.7)', fontFamily: 'BeVietnamPro_700Bold' }]}>{i + 1}</Text>
                  }
                </View>
                <Text style={[styles.stepLabel, { color: i === step ? '#FFF' : 'rgba(255,255,255,0.6)', fontFamily: 'BeVietnamPro_500Medium' }]}>{s}</Text>
              </View>
              {i < STEPS.length - 1 && <View style={[styles.stepLine, { backgroundColor: i < step ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }]} />}
            </React.Fragment>
          ))}
        </View>
      </LinearGradient>

      <View style={{ padding: 16 }}>
        {step === 0 && (
          <>
            <Field label="Tên tổ chức / doanh nghiệp" fieldKey="name" />
            <Field label="Mã số thuế" fieldKey="taxCode" placeholder="VD: 3600123456" keyboard="phone-pad" />
            <SelectRow label="Loại hình" fieldKey="type" options={['Hợp tác xã', 'Doanh nghiệp', 'Hộ kinh doanh', 'Trang trại']} />
            <SelectRow label="Ngành nghề" fieldKey="industry" options={['Nông nghiệp', 'Thủy sản', 'Chăn nuôi', 'Chế biến']} />
            <Field label="Địa chỉ" fieldKey="address" />
            <Field label="Huyện / Thành phố" fieldKey="district" placeholder="VD: Long Khánh" />
            <Field label="Số điện thoại" fieldKey="phone" keyboard="phone-pad" />
            <Field label="Email đăng nhập" fieldKey="email" keyboard="email-address" placeholder="email@doanhnghiep.vn" />
          </>
        )}
        {step === 1 && (
          <>
            <Field label="Họ và tên đại diện" fieldKey="representative" />
            <Field label="Điện thoại đại diện" fieldKey="representativePhone" keyboard="phone-pad" />
            <Field label="Email đại diện" fieldKey="representativeEmail" keyboard="email-address" />
            <Field label="CMND / CCCD" fieldKey="cccd" keyboard="phone-pad" />
            <Field label="Mã GCP (tùy chọn)" fieldKey="gcp" placeholder="VD: 8934673" keyboard="phone-pad" />
          </>
        )}
        {step === 2 && (
          <>
            <View style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.reviewTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Xác nhận thông tin</Text>
              {[
                { label: 'Tổ chức', value: form.name },
                { label: 'Loại hình', value: form.type },
                { label: 'Email', value: form.email },
                { label: 'Đại diện', value: form.representative },
              ].map(row => (
                <View key={row.label} style={[styles.reviewRow, { borderBottomColor: colors.border }]}>
                  <Text style={[styles.reviewLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{row.label}</Text>
                  <Text style={[styles.reviewValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{row.value}</Text>
                </View>
              ))}
            </View>
            <View style={{ gap: 12, marginTop: 8 }}>
              <Field label="Mật khẩu" fieldKey="password" secure placeholder="Ít nhất 6 ký tự" />
              <Field label="Xác nhận mật khẩu" fieldKey="confirmPassword" secure placeholder="Nhập lại mật khẩu" />
            </View>
          </>
        )}

        <View style={styles.navRow}>
          {step > 0 && (
            <Pressable onPress={() => setStep(s => s - 1)} style={[styles.prevBtn, { borderColor: colors.border }]}>
              <Ionicons name="chevron-back" size={18} color={colors.primary} />
              <Text style={[styles.prevBtnText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>Quay lại</Text>
            </Pressable>
          )}
          <Pressable
            onPress={handleNext}
            disabled={loading}
            style={({ pressed }) => [styles.nextBtn, { backgroundColor: colors.primary, opacity: pressed || loading ? 0.8 : 1 }]}
          >
            {loading
              ? <ActivityIndicator color="#FFF" size="small" />
              : <>
                  <Text style={[styles.nextBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>
                    {step < 2 ? 'Tiếp theo' : 'Hoàn tất đăng ký'}
                  </Text>
                  {step < 2 && <Ionicons name="chevron-forward" size={18} color="#FFF" />}
                </>
            }
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stepHeader: { padding: 24, paddingBottom: 28 },
  stepTitle: { fontSize: 18, color: '#FFF', marginBottom: 20, textAlign: 'center' },
  stepRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  stepItem: { alignItems: 'center', gap: 5 },
  stepDot: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  stepNum: { fontSize: 13 },
  stepLabel: { fontSize: 11 },
  stepLine: { flex: 1, height: 1, marginHorizontal: 6, marginBottom: 14 },
  fieldLabel: { fontSize: 13, marginBottom: 6 },
  inputWrap: { borderRadius: 10, borderWidth: 1 },
  input: { height: 44, paddingHorizontal: 12, fontSize: 14 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13 },
  reviewCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  reviewTitle: { fontSize: 15, padding: 14, paddingBottom: 10 },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1 },
  reviewLabel: { fontSize: 13 },
  reviewValue: { fontSize: 13, flex: 1, textAlign: 'right' },
  navRow: { flexDirection: 'row', gap: 10, marginTop: 24 },
  prevBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 16, paddingVertical: 13, borderRadius: 10, borderWidth: 1 },
  prevBtnText: { fontSize: 14 },
  nextBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 14, borderRadius: 10 },
  nextBtnText: { fontSize: 15, color: '#FFF' },
});
