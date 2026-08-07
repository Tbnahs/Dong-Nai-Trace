import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import { useColors } from '@/hooks/useColors';
import { useAuth, OrgProfile, UploadedDocument } from '@/context/AuthContext';
import { ModalPicker } from '@/components/ModalPicker';
import { DISTRICT_OPTIONS, ORG_TYPE_OPTIONS, SECTOR_OPTIONS } from '@/data/mock';

const CERTIFICATIONS = ['VietGAP', 'OCOP 3 Sao'];

function Field({
  label,
  value,
  editing,
  onChange,
  icon,
  editable = true,
  keyboardType = 'default',
  onScan,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  editable?: boolean;
  keyboardType?: 'default' | 'phone-pad' | 'email-address';
  onScan?: () => void;
}) {
  const colors = useColors();
  return (
    <View style={styles.field}>
      <View style={styles.fieldLabelRow}>
        <Ionicons name={icon} size={14} color={colors.mutedForeground} />
        <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>{label}</Text>
      </View>
      {editing && editable ? (
        <View style={[styles.editInputRow, { borderColor: colors.border, backgroundColor: '#FFF' }]}>
          <TextInput
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
            autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
            style={[styles.editInput, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}
          />
          {onScan && (
            <Pressable
              onPress={onScan}
              accessibilityRole="button"
              accessibilityLabel="Quét mã GCP bằng camera"
              hitSlop={8}
              style={({ pressed }) => [styles.scanButton, { opacity: pressed ? 0.55 : 1 }]}
            >
              <Ionicons name="scan-outline" size={21} color={colors.primary} />
            </Pressable>
          )}
        </View>
      ) : (
        <View style={[styles.readValue, { backgroundColor: colors.muted, borderColor: colors.border }]}>
          <Text style={[styles.readValueText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>
            {value || 'Chưa cập nhật'}
          </Text>
        </View>
      )}
    </View>
  );
}

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const colors = useColors();
  return (
    <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
        <View style={[styles.sectionIcon, { backgroundColor: colors.navyLight }]}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{title}</Text>
          <Text style={[styles.sectionDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{description}</Text>
        </View>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function DocumentCard({
  label,
  document,
  editing,
  onPick,
}: {
  label: string;
  document?: UploadedDocument;
  editing: boolean;
  onPick: () => void;
}) {
  const colors = useColors();
  if (!editing && !document) return null;
  return (
    <View style={[styles.documentCard, { backgroundColor: colors.muted, borderColor: colors.border }]}>
      <Text style={[styles.documentLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{label}</Text>
      {editing ? (
        <Pressable onPress={onPick} style={[styles.uploadButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name={document ? 'document-text-outline' : 'cloud-upload-outline'} size={21} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.uploadButtonText, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]} numberOfLines={1}>
              {document?.name ?? 'Tải file lên'}
            </Text>
            <Text style={[styles.uploadHint, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>PDF, JPG, PNG</Text>
          </View>
          <Ionicons name="chevron-forward" size={17} color={colors.mutedForeground} />
        </Pressable>
      ) : (
        <View style={[styles.documentPreview, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {document?.mimeType?.startsWith('image/') ? (
            <Image source={{ uri: document.uri }} style={styles.documentImage} />
          ) : (
            <Ionicons name="document-text-outline" size={26} color={colors.primary} />
          )}
          <Text style={[styles.documentName, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]} numberOfLines={1}>{document?.name}</Text>
        </View>
      )}
    </View>
  );
}

export default function OrgProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, updateProfile, isLoggedIn } = useAuth();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<OrgProfile | null>(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scannerLocked, setScannerLocked] = useState(false);

  useEffect(() => {
    if (user?.profile) setForm({ ...user.profile });
  }, [user]);

  if (!isLoggedIn || !form) {
    return (
      <View style={[styles.locked, { backgroundColor: colors.background }]}>
        <Ionicons name="lock-closed-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.lockedText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Cần đăng nhập để xem hồ sơ</Text>
        <Pressable onPress={() => router.replace('/(tabs)/account')} style={[styles.loginButton, { backgroundColor: colors.primary }]}>
          <Text style={[styles.loginButtonText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đăng nhập</Text>
        </Pressable>
      </View>
    );
  }

  const set = (key: keyof OrgProfile, value: string) => {
    setForm(current => current ? { ...current, [key]: value } : current);
  };

  const pickDocument = async (key: 'businessLicense' | 'authorizationDocument' | 'certification' | 'businessImage') => {
    const result = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'], copyToCacheDirectory: true });
    const asset = result.assets?.[0];
    if (result.canceled || !asset) return;
    const document: UploadedDocument = { name: asset.name, uri: asset.uri, mimeType: asset.mimeType, size: asset.size };
    setForm(current => current ? { ...current, [key]: document } : current);
  };

  const openGcpScanner = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Quét mã trên điện thoại', 'Mở ứng dụng bằng Expo Go trên điện thoại để sử dụng camera quét mã.');
      return;
    }

    if (!cameraPermission?.granted) {
      if (cameraPermission?.status === 'denied' && !cameraPermission.canAskAgain) {
        Alert.alert(
          'Camera đang bị chặn',
          'Vui lòng cho phép ứng dụng truy cập camera trong phần Cài đặt của thiết bị.',
          [
            { text: 'Để sau', style: 'cancel' },
            { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      const permission = await requestCameraPermission();
      if (!permission.granted) return;
    }

    setScannerLocked(false);
    setScannerVisible(true);
  };

  const handleGcpScanned = ({ data }: { data: string }) => {
    if (scannerLocked || !data.trim()) return;
    setScannerLocked(true);
    set('gcp', data.trim());
    setScannerVisible(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert('Lỗi', 'Tên doanh nghiệp không được trống');
      return;
    }
    await updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F4F6FB' }} contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      {saved && (
        <View style={styles.savedBanner}>
          <Ionicons name="checkmark-circle" size={19} color="#059669" />
          <Text style={[styles.savedText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đã lưu hồ sơ thành công</Text>
        </View>
      )}

      <View style={[styles.profileHeader, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.profileCover} />
        <View style={styles.profileHeaderBody}>
          <View style={styles.avatar}>
            <Text style={[styles.avatarText, { fontFamily: 'BeVietnamPro_700Bold' }]}>{form.name.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{form.name}</Text>
            <View style={styles.badges}>
              <View style={[styles.typeBadge, { backgroundColor: colors.muted, borderColor: colors.border }]}>
                <Ionicons name="briefcase-outline" size={13} color={colors.mutedForeground} />
                <Text style={[styles.badgeText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>{form.type}</Text>
              </View>
              <View style={styles.approvedBadge}>
                <Ionicons name="checkmark-circle" size={13} color="#059669" />
                <Text style={[styles.badgeText, { color: '#047857', fontFamily: 'BeVietnamPro_700Bold' }]}>Đã duyệt</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerActions}>
            {!editing ? (
              <Pressable onPress={() => setEditing(true)} style={[styles.editButton, { borderColor: colors.border }]}>
                <Ionicons name="create-outline" size={17} color={colors.primary} />
                <Text style={[styles.editButtonText, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>Cập nhật hồ sơ</Text>
              </Pressable>
            ) : (
              <View style={styles.editActions}>
                <Pressable onPress={() => { if (user) setForm({ ...user.profile }); setEditing(false); }} style={styles.cancelButton}>
                  <Ionicons name="close" size={17} color={colors.mutedForeground} />
                  <Text style={[styles.cancelText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>Hủy</Text>
                </Pressable>
                <Pressable onPress={handleSave} style={[styles.saveButton, { backgroundColor: colors.accent }]}>
                  <Ionicons name="save-outline" size={17} color="#FFF" />
                  <Text style={[styles.saveText, { fontFamily: 'BeVietnamPro_700Bold' }]}>Lưu thay đổi</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>

      <Section icon="document-text-outline" title="Thông tin pháp lý" description="Dữ liệu đăng ký kinh doanh chính thức">
        <View style={styles.fieldsGrid}>
          <Field label="Tên doanh nghiệp / tổ chức" value={form.name} editing={editing} onChange={value => set('name', value)} icon="business-outline" />
          <Field label="Mã số thuế" value={form.taxCode} editing={false} onChange={() => {}} icon="document-text-outline" />
          <Field
            label="Mã GCP"
            value={form.gcp ?? ''}
            editing={editing}
            onChange={value => set('gcp', value)}
            icon="finger-print-outline"
            keyboardType="phone-pad"
            onScan={openGcpScanner}
          />
          {editing ? (
            <ModalPicker label="Loại hình" value={form.type} options={ORG_TYPE_OPTIONS} onChange={value => set('type', value)} />
          ) : (
            <Field label="Loại hình" value={form.type} editing={false} onChange={() => {}} icon="briefcase-outline" />
          )}
          <Field label="Ngành nghề" value={form.industry} editing={editing} onChange={value => set('industry', value)} icon="shield-checkmark-outline" />
        </View>
      </Section>

      <Section icon="location-outline" title="Thông tin liên hệ" description="Địa chỉ trụ sở và phương thức liên lạc">
        <View style={styles.fieldsGrid}>
          <Field label="Địa chỉ" value={form.address} editing={editing} onChange={value => set('address', value)} icon="location-outline" />
          {editing ? (
            <ModalPicker label="Huyện / Thị xã" value={form.district} options={DISTRICT_OPTIONS} onChange={value => set('district', value)} />
          ) : (
            <Field label="Huyện / Thị xã" value={form.district} editing={false} onChange={() => {}} icon="map-outline" />
          )}
          <Field label="Số điện thoại" value={form.phone} editing={editing} onChange={value => set('phone', value)} icon="call-outline" keyboardType="phone-pad" />
          <Field label="Email" value={form.email} editing={editing} onChange={value => set('email', value)} icon="mail-outline" keyboardType="email-address" />
        </View>
      </Section>

      <Section icon="person-outline" title="Người đại diện" description="Thông tin liên hệ và định danh người đại diện">
        <View style={styles.fieldsGrid}>
          <Field label="Họ và tên người đại diện" value={form.representative} editing={editing} onChange={value => set('representative', value)} icon="person-outline" />
          <Field label="Số điện thoại liên hệ" value={form.representativePhone} editing={editing} onChange={value => set('representativePhone', value)} icon="call-outline" keyboardType="phone-pad" />
          <Field label="Email đăng nhập" value={form.representativeEmail} editing={editing} onChange={value => set('representativeEmail', value)} icon="mail-outline" keyboardType="email-address" />
          <Field label="CCCD / CMND" value={form.cccd} editing={editing} onChange={value => set('cccd', value)} icon="card-outline" keyboardType="phone-pad" />
        </View>
      </Section>

      <View style={styles.bottomGrid}>
        <Section icon="shield-checkmark-outline" title="Chứng nhận" description="Tiêu chuẩn chất lượng">
          <View style={styles.certList}>
            {CERTIFICATIONS.map(cert => (
              <View key={cert} style={[styles.certRow, { backgroundColor: colors.muted, borderColor: colors.border }]}>
                <View style={styles.certName}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={[styles.certText, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{cert}</Text>
                </View>
                <Text style={[styles.validText, { fontFamily: 'BeVietnamPro_700Bold' }]}>HỢP LỆ</Text>
              </View>
            ))}
          </View>
        </Section>

        {(editing || form.businessLicense || form.authorizationDocument || form.certification || form.businessImage) && (
          <Section icon="images-outline" title="Tài liệu đính kèm" description="Bản sao số hóa của hồ sơ gốc">
            <View style={styles.documentsGrid}>
              <DocumentCard label="Giấy phép kinh doanh" document={form.businessLicense} editing={editing} onPick={() => pickDocument('businessLicense')} />
              <DocumentCard label="Giấy ủy quyền" document={form.authorizationDocument} editing={editing} onPick={() => pickDocument('authorizationDocument')} />
              {editing ? (
                <View style={styles.documentCard}>
                  <ModalPicker
                    label="Giấy chứng nhận (nếu có)"
                    value={form.certificationType ?? 'OCOP'}
                    options={['OCOP', 'VietGAP', 'GlobalGAP', 'HACCP', 'ISO 22000', 'Hữu cơ', 'Khác']}
                    onChange={value => set('certificationType', value)}
                  />
                  <DocumentCard label="Tệp giấy chứng nhận" document={form.certification} editing onPick={() => pickDocument('certification')} />
                </View>
              ) : (
                <DocumentCard label={`Giấy chứng nhận · ${form.certificationType ?? 'Đã cấp'}`} document={form.certification} editing={false} onPick={() => pickDocument('certification')} />
              )}
              <DocumentCard label="Hình ảnh doanh nghiệp" document={form.businessImage} editing={editing} onPick={() => pickDocument('businessImage')} />
            </View>
          </Section>
        )}
      </View>

      <Modal
        visible={scannerVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setScannerVisible(false)}
      >
        <View style={styles.scannerContainer}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'upc_a', 'upc_e', 'itf14', 'datamatrix', 'pdf417'] }}
            onBarcodeScanned={scannerLocked ? undefined : handleGcpScanned}
          />
          <View style={[styles.scannerTopBar, { paddingTop: insets.top + 12 }]}>
            <Pressable
              onPress={() => setScannerVisible(false)}
              accessibilityLabel="Đóng camera"
              hitSlop={10}
              style={styles.scannerCloseButton}
            >
              <Ionicons name="close" size={25} color="#FFFFFF" />
            </Pressable>
            <Text style={[styles.scannerTitle, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Quét mã GCP</Text>
            <View style={styles.scannerCloseButton} />
          </View>
          <View style={styles.scannerGuideWrap} pointerEvents="none">
            <View style={styles.scannerGuide}>
              <View style={[styles.scannerCorner, styles.cornerTopLeft]} />
              <View style={[styles.scannerCorner, styles.cornerTopRight]} />
              <View style={[styles.scannerCorner, styles.cornerBottomLeft]} />
              <View style={[styles.scannerCorner, styles.cornerBottomRight]} />
            </View>
            <View style={styles.scannerHint}>
              <Ionicons name="scan-outline" size={16} color="#FFFFFF" />
              <Text style={[styles.scannerHintText, { fontFamily: 'BeVietnamPro_500Medium' }]}>Đưa mã GCP vào khung quét</Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 14, paddingBottom: 100, gap: 14 },
  locked: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  lockedText: { fontSize: 16 },
  loginButton: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10 },
  loginButtonText: { color: '#FFF', fontSize: 15 },
  savedBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', borderWidth: 1, padding: 12, borderRadius: 11 },
  savedText: { color: '#047857', fontSize: 13 },
  profileHeader: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  profileCover: { height: 80, backgroundColor: '#2740BA' },
  profileHeaderBody: { padding: 14, paddingTop: 0, alignItems: 'center' },
  avatar: { width: 78, height: 78, borderRadius: 16, backgroundColor: '#3852D1', borderWidth: 5, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginTop: -39 },
  avatarText: { color: '#FFF', fontSize: 27 },
  profileInfo: { alignItems: 'center', marginTop: 8 },
  profileName: { fontSize: 20, textAlign: 'center' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 7, marginTop: 9 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7, borderWidth: 1 },
  approvedBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7, backgroundColor: '#ECFDF5', borderWidth: 1, borderColor: '#D1FAE5' },
  badgeText: { fontSize: 10 },
  headerActions: { width: '100%', marginTop: 14 },
  editButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 11, borderRadius: 10, borderWidth: 1 },
  editButtonText: { fontSize: 13 },
  editActions: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  cancelButton: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 10 },
  cancelText: { fontSize: 13 },
  saveButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 11, borderRadius: 10 },
  saveText: { color: '#FFF', fontSize: 13 },
  section: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderBottomWidth: 1 },
  sectionIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 16 },
  sectionDescription: { fontSize: 11, marginTop: 2 },
  sectionBody: { padding: 14 },
  fieldsGrid: { gap: 14 },
  field: { gap: 6 },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  fieldLabel: { fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase' },
  editInputRow: { height: 44, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10 },
  editInput: { flex: 1, height: 42, paddingHorizontal: 12, fontSize: 14 },
  scanButton: { width: 38, height: 42, alignItems: 'center', justifyContent: 'center' },
  readValue: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 },
  readValueText: { fontSize: 14 },
  bottomGrid: { gap: 14 },
  certList: { gap: 9 },
  certRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 11, borderWidth: 1 },
  certName: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  certText: { fontSize: 13 },
  validText: { color: '#059669', fontSize: 9, backgroundColor: '#D1FAE5', paddingHorizontal: 7, paddingVertical: 5, borderRadius: 6 },
  documentsGrid: { gap: 10 },
  documentCard: { padding: 11, borderRadius: 11, borderWidth: 1 },
  documentLabel: { fontSize: 13, marginBottom: 8 },
  uploadButton: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 10, borderRadius: 9, borderWidth: 1 },
  uploadButtonText: { fontSize: 12 },
  uploadHint: { fontSize: 10, marginTop: 2 },
  documentPreview: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 10, borderRadius: 9, borderWidth: 1 },
  documentImage: { width: 42, height: 42, borderRadius: 7 },
  documentName: { flex: 1, fontSize: 12 },
  scannerContainer: { flex: 1, backgroundColor: '#000000' },
  scannerTopBar: { position: 'absolute', top: 0, left: 0, right: 0, minHeight: 86, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.42)' },
  scannerCloseButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  scannerTitle: { color: '#FFFFFF', fontSize: 16, marginTop: 7 },
  scannerGuideWrap: { position: 'absolute', top: '35%', left: 0, right: 0, alignItems: 'center' },
  scannerGuide: { width: 270, height: 190, position: 'relative' },
  scannerCorner: { position: 'absolute', width: 30, height: 30, borderColor: '#FFFFFF' },
  cornerTopLeft: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTopRight: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBottomLeft: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },
  scannerHint: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 18, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.58)' },
  scannerHintText: { color: '#FFFFFF', fontSize: 12 },
});