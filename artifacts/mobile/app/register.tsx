import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth, OrgProfile, UploadedDocument } from '@/context/AuthContext';
import { ModalPicker } from '@/components/ModalPicker';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { ORG_TYPE_OPTIONS, DISTRICT_OPTIONS } from '@/data/mock';

const STEPS = ['Thông tin doanh nghiệp', 'Người đại diện', 'Xác nhận'];
type RegistrationForm = OrgProfile & { password: string; confirmPassword: string };
type RegistrationErrors = Partial<Record<keyof RegistrationForm, string>>;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { register } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [form, setForm] = useState<RegistrationForm>({
    name: '', taxCode: '', type: ORG_TYPE_OPTIONS[0], industry: '',
    address: '', district: DISTRICT_OPTIONS[0] ?? '', phone: '', email: '',
    representative: '', representativePhone: '', representativeEmail: '', cccd: '',
    gcp: '', password: '', confirmPassword: '', certificationType: 'OCOP',
  });

  const set = (key: keyof RegistrationForm) => (val: string) => {
    setForm(current => ({ ...current, [key]: val }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };

  const pickDocument = async (key: 'businessLicense' | 'authorizationDocument' | 'certification' | 'businessImage') => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled || !result.assets?.[0]) return;
    const asset = result.assets[0];
    const document: UploadedDocument = {
      name: asset.name,
      uri: asset.uri,
      mimeType: asset.mimeType,
      size: asset.size,
    };
    setForm(current => ({ ...current, [key]: document }));
  };

  function UploadZone({ label, hint, fieldKey }: {
    label: string;
    hint: string;
    fieldKey: 'businessLicense' | 'authorizationDocument' | 'certification' | 'businessImage';
  }) {
    const document = form[fieldKey];
    return (
      <View style={{ marginBottom: 14 }}>
        <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
        <Pressable
          onPress={() => pickDocument(fieldKey)}
          style={({ pressed }) => [styles.uploadZone, { borderColor: document ? colors.primary : colors.border, backgroundColor: document ? colors.navyLight : colors.muted, opacity: pressed ? 0.8 : 1 }]}
        >
          {document?.mimeType?.startsWith('image/') ? (
            <Image source={{ uri: document.uri }} style={styles.uploadPreview} resizeMode="cover" />
          ) : (
            <Ionicons name={document ? 'document-text-outline' : 'cloud-upload-outline'} size={28} color={document ? colors.primary : colors.mutedForeground} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={[styles.uploadName, { color: document ? colors.primary : colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={1}>
              {document?.name ?? 'Chọn ảnh hoặc tệp'}
            </Text>
            <Text style={[styles.uploadHint, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{document ? 'Nhấn để thay đổi tệp' : hint}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
        </Pressable>
      </View>
    );
  }

  function Field({ label, fieldKey, keyboard = 'default', secure = false, placeholder, required = false }: {
    label: string; fieldKey: keyof RegistrationForm;
    keyboard?: 'default' | 'email-address' | 'phone-pad'; secure?: boolean; placeholder?: string; required?: boolean;
    error?: string; visible?: boolean; onToggleVisibility?: () => void;
  }) {
    const error = errors[fieldKey];
    const visible = fieldKey === 'password' ? passwordVisible : confirmPasswordVisible;
    const onToggleVisibility = fieldKey === 'password'
      ? () => setPasswordVisible(current => !current)
      : () => setConfirmPasswordVisible(current => !current);
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>
          {label}{required && <Text style={{ color: '#EF4444' }}> *</Text>}
        </Text>
        <View style={[styles.inputWrap, { borderColor: error ? colors.destructive : colors.border, backgroundColor: colors.muted }]}>
          <TextInput
            style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular', paddingRight: secure ? 46 : 12 }]}
            value={form[fieldKey] as string}
            onChangeText={set(fieldKey)}
            keyboardType={keyboard}
            autoCapitalize="none"
            secureTextEntry={secure && !visible}
            placeholder={placeholder ?? label}
            placeholderTextColor={colors.mutedForeground}
          />
          {secure && (
            <Pressable
              onPress={onToggleVisibility}
              accessibilityRole="button"
              accessibilityLabel={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              hitSlop={8}
              style={styles.passwordToggle}
            >
              <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={19} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
        {error ? <Text style={[styles.fieldError, { color: colors.destructive }]}>{error}</Text> : null}
      </View>
    );
  }

  const validateStep = () => {
    const nextErrors: RegistrationErrors = {};
    if (step === 0) {
      if (!form.name.trim()) nextErrors.name = 'Vui lòng nhập tên doanh nghiệp';
      if (!form.taxCode.trim()) nextErrors.taxCode = 'Vui lòng nhập mã số thuế';
      if (!form.industry.trim()) nextErrors.industry = 'Vui lòng nhập ngành nghề';
      if (!form.address.trim()) nextErrors.address = 'Vui lòng nhập địa chỉ';
      if (!form.phone.trim()) nextErrors.phone = 'Vui lòng nhập số điện thoại';
      if (!form.email.trim()) nextErrors.email = 'Vui lòng nhập email';
      else if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = 'Email không hợp lệ';
    }
    if (step === 1) {
      if (!form.representative.trim()) nextErrors.representative = 'Vui lòng nhập họ và tên';
      if (!form.representativePhone.trim()) nextErrors.representativePhone = 'Vui lòng nhập số điện thoại';
      if (!form.representativeEmail.trim()) nextErrors.representativeEmail = 'Vui lòng nhập email';
      else if (!EMAIL_PATTERN.test(form.representativeEmail.trim())) nextErrors.representativeEmail = 'Email không hợp lệ';
      if (!form.password) nextErrors.password = 'Vui lòng tạo mật khẩu';
      else if (form.password.length < 8) nextErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      if (!form.confirmPassword) nextErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      else if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step < 1) {
      setStep(current => current + 1);
      return;
    }
    setSubmitted(true);
  };

  const confirmRegistration = async () => {
    setLoading(true);
    setSubmitError('');
    const { password, confirmPassword: _confirmPassword, ...profile } = form;
    try {
      await register(profile, password);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)/account');
    } catch {
      setSubmitError('Chưa thể lưu hồ sơ. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      keyboardShouldPersistTaps="handled"
      bottomOffset={24}
    >
      <View style={styles.brandHeader}>
        <Image
          source={require('@/assets/images/logo-skhcn.png')}
          style={styles.brandLogo}
          accessibilityLabel="Logo Truy Xuất Đồng Nai"
        />
        <Text style={[styles.brandName, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>
          Truy Xuất Đồng Nai
        </Text>
      </View>

      {/* Step indicator */}
      {!submitted && <LinearGradient colors={['#1A2E9E', '#2740BA']} style={styles.stepHeader}>
        <Text style={[styles.stepTitle, { fontFamily: 'BeVietnamPro_700Bold' }]}>Đăng ký tài khoản doanh nghiệp</Text>
        <Text style={[styles.stepDescription, { fontFamily: 'BeVietnamPro_400Regular' }]}>
          Cung cấp thông tin để tham gia hệ thống truy xuất
        </Text>
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
      </LinearGradient>}

      <View style={{ padding: 16 }}>
        {submitted ? (
          <View style={styles.successWrap}>
            <View style={[styles.successIcon, { backgroundColor: colors.success + '18' }]}>
              <Ionicons name="checkmark-circle" size={42} color={colors.success} />
            </View>
            <Text style={[styles.successTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Hồ sơ đã được gửi!</Text>
            <Text style={[styles.successDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
              Sở KH&CN sẽ xét duyệt trong 3–5 ngày làm việc.
            </Text>
            <View style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: colors.border, width: '100%' }]}>
              <Text style={[styles.reviewTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thông tin tài khoản đăng nhập</Text>
              <View style={[styles.reviewRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.reviewLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Tài khoản (Email)</Text>
                <Text style={[styles.reviewValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{form.representativeEmail}</Text>
              </View>
              <View style={[styles.reviewRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.reviewLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Mật khẩu</Text>
                <Text style={[styles.reviewValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{passwordVisible ? form.password : '•'.repeat(form.password.length)}</Text>
                <Pressable onPress={() => setPasswordVisible(value => !value)} accessibilityRole="button" accessibilityLabel={passwordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                  <Ionicons name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size={19} color={colors.primary} />
                </Pressable>
              </View>
            </View>
            <View style={[styles.notice, { backgroundColor: colors.orangeLight, borderColor: colors.accent + '55' }]}>
              <Ionicons name="information-circle-outline" size={17} color={colors.accent} />
              <Text style={[styles.noticeText, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>
                Lưu lại thông tin tài khoản ngay bây giờ. Mật khẩu không được lưu trong hồ sơ.
              </Text>
            </View>
            {submitError ? <Text style={[styles.fieldError, { color: colors.destructive }]}>{submitError}</Text> : null}
            <Pressable
              onPress={confirmRegistration}
              disabled={loading}
              style={({ pressed }) => [styles.confirmButton, { backgroundColor: colors.primary, opacity: pressed || loading ? 0.8 : 1 }]}
            >
              {loading ? <ActivityIndicator color="#FFF" size="small" /> : <>
                <Ionicons name="log-in-outline" size={18} color="#FFF" />
                <Text style={[styles.nextBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Xác nhận &amp; Đăng nhập</Text>
              </>}
            </Pressable>
          </View>
        ) : (<>
        {step === 0 && (
          <>
            <Field label="Tên doanh nghiệp / tổ chức" fieldKey="name" required />
            <Field label="Mã số thuế" fieldKey="taxCode" placeholder="VD: 3602123456" required />

            {/* Loại hình — dropdown matching portal <select> */}
            <ModalPicker
              label="Loại hình *"
              value={form.type}
              options={ORG_TYPE_OPTIONS}
              onChange={set('type')}
            />

            <Field label="Ngành nghề" fieldKey="industry" placeholder="VD: Rau củ quả" required />

            <Field label="Địa chỉ" fieldKey="address" required />

            {/* Huyện/Thành phố — dropdown matching portal district <select> */}
            <ModalPicker
              label="Huyện / Thị xã *"
              value={form.district}
              options={DISTRICT_OPTIONS}
              placeholder="Chọn huyện / thị xã..."
              onChange={set('district')}
            />

            <Field label="Số điện thoại" fieldKey="phone" keyboard="phone-pad" required />
            <Field label="Email" fieldKey="email" keyboard="email-address" placeholder="email@gmail.com" required />
            <Field label="Mã GCP" fieldKey="gcp" placeholder="VD: 8934673" keyboard="phone-pad" />
            <View style={[styles.uploadCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.uploadTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Hồ sơ pháp lý</Text>
              <Text style={[styles.uploadDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Tải lên ảnh hoặc PDF để hồ sơ được xác minh nhanh hơn.</Text>
              <UploadZone fieldKey="businessLicense" label="Giấy phép kinh doanh (bản scan)" hint="PDF, JPG hoặc PNG" />
              <UploadZone fieldKey="authorizationDocument" label="Giấy ủy quyền (nếu có)" hint="PDF, JPG hoặc PNG" />
              <View style={[styles.optionalBox, { borderColor: colors.border, backgroundColor: colors.muted }]}>
                <Text style={[styles.uploadTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Giấy chứng nhận (nếu có)</Text>
                <ModalPicker
                  label="Loại giấy chứng nhận"
                  value={form.certificationType ?? ''}
                  options={['OCOP', 'VietGAP', 'GlobalGAP', 'HACCP', 'ISO 22000', 'Hữu cơ', 'Khác']}
                  placeholder="Chọn loại giấy chứng nhận..."
                  onChange={set('certificationType')}
                />
                <UploadZone fieldKey="certification" label="Tệp giấy chứng nhận" hint="PDF, JPG hoặc PNG" />
              </View>
              <UploadZone fieldKey="businessImage" label="Hình ảnh doanh nghiệp" hint="JPG hoặc PNG" />
            </View>
          </>
        )}
        {step === 1 && (
          <>
            <Field label="Họ và tên người đại diện" fieldKey="representative" required />
            <Field label="Số điện thoại liên hệ" fieldKey="representativePhone" keyboard="phone-pad" required />
            <Field label="Email đăng nhập" fieldKey="representativeEmail" keyboard="email-address" required />
            <Field label="CMND / CCCD" fieldKey="cccd" keyboard="phone-pad" />
            <View style={{ gap: 12, marginTop: 8 }}>
              <Field label="Mật khẩu" fieldKey="password" secure placeholder="Ít nhất 8 ký tự" required />
              <Field label="Xác nhận mật khẩu" fieldKey="confirmPassword" secure placeholder="Nhập lại mật khẩu" required />
              <Text style={[styles.passwordHint, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
                Email và mật khẩu này sẽ dùng để đăng nhập sau khi hồ sơ được phê duyệt.
              </Text>
            </View>
            <View style={[styles.uploadCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <UploadZone fieldKey="authorizationDocument" label="Giấy ủy quyền (nếu có)" hint="PDF, JPG hoặc PNG" />
            </View>
          </>
        )}

        {!submitted && <View style={styles.navRow}>
          <Pressable onPress={() => step > 0 ? setStep(current => current - 1) : router.back()} style={[styles.prevBtn, { borderColor: colors.border }]}>
            <Ionicons name="chevron-back" size={18} color={colors.primary} />
            <Text style={[styles.prevBtnText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>{step > 0 ? 'Quay lại' : 'Đăng nhập'}</Text>
          </Pressable>
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [styles.nextBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
          >
            <Text style={[styles.nextBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>
              {step === 1 ? 'Hoàn tất đăng ký' : 'Tiếp tục'}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#FFF" />
          </Pressable>
        </View>}
        </>)}
      </View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  brandHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 16 },
  brandLogo: { width: 56, height: 56 },
  brandName: { fontSize: 18 },
  stepHeader: { padding: 24, paddingBottom: 28 },
  stepTitle: { fontSize: 18, color: '#FFF', marginBottom: 5, textAlign: 'center' },
  stepDescription: { fontSize: 12, lineHeight: 18, color: 'rgba(255,255,255,0.82)', marginBottom: 20, textAlign: 'center' },
  stepRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  stepItem: { alignItems: 'center', gap: 5 },
  stepDot: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  stepNum: { fontSize: 13 },
  stepLabel: { fontSize: 11 },
  stepLine: { flex: 1, height: 1, marginHorizontal: 6, marginBottom: 14 },
  fieldLabel: { fontSize: 13, marginBottom: 6 },
  inputWrap: { borderRadius: 10, borderWidth: 1 },
  input: { flex: 1, height: 44, paddingHorizontal: 12, fontSize: 14 },
  passwordToggle: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  fieldError: { fontSize: 12, marginTop: 5 },
  passwordHint: { fontSize: 11, lineHeight: 17, marginTop: -6 },
  uploadCard: { borderRadius: 14, borderWidth: 1, padding: 14, marginTop: 4 },
  optionalBox: { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 12 },
  uploadTitle: { fontSize: 15 },
  uploadDescription: { fontSize: 12, lineHeight: 18, marginTop: 4, marginBottom: 14 },
  uploadZone: { minHeight: 68, borderRadius: 10, borderWidth: 1.5, borderStyle: 'dashed', padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  uploadPreview: { width: 46, height: 46, borderRadius: 8 },
  uploadName: { fontSize: 13 },
  uploadHint: { fontSize: 11, marginTop: 3 },
  reviewCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  reviewTitle: { fontSize: 15, padding: 14, paddingBottom: 10 },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1 },
  reviewLabel: { fontSize: 13 },
  reviewValue: { fontSize: 13, flex: 1, textAlign: 'right' },
  successWrap: { alignItems: 'center', paddingTop: 16, paddingBottom: 12 },
  successIcon: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  successTitle: { fontSize: 21, textAlign: 'center' },
  successDescription: { fontSize: 13, textAlign: 'center', lineHeight: 19, marginTop: 6, marginBottom: 20 },
  notice: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderWidth: 1, borderRadius: 10, marginTop: 2, marginBottom: 18 },
  noticeText: { flex: 1, fontSize: 11, lineHeight: 17 },
  confirmButton: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 14, borderRadius: 10 },
  navRow: { flexDirection: 'row', gap: 10, marginTop: 24 },
  prevBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 16, paddingVertical: 13, borderRadius: 10, borderWidth: 1 },
  prevBtnText: { fontSize: 14 },
  nextBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 14, borderRadius: 10 },
  nextBtnText: { fontSize: 15, color: '#FFF' },
});
