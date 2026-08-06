import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/context/AuthContext';

function MenuItem({ icon, label, onPress, danger = false }: { icon: string; label: string; onPress: () => void; danger?: boolean }) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.menuItem, { borderColor: colors.border, opacity: pressed ? 0.75 : 1 }]}>
      <View style={[styles.menuIcon, { backgroundColor: danger ? '#FEE2E2' : colors.navyLight }]}>
        <Ionicons name={icon as any} size={20} color={danger ? '#EF4444' : colors.primary} />
      </View>
      <Text style={[styles.menuLabel, { color: danger ? '#EF4444' : colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
      {!danger && <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />}
    </Pressable>
  );
}

function LoginView() {
  const colors = useColors();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    setLoading(true);
    setError('');
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const ok = await login(email.trim(), password);
    setLoading(false);
    if (!ok) {
      setError('Email hoặc mật khẩu không đúng');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Hero */}
      <LinearGradient colors={['#1A2E9E', '#2740BA']} style={styles.loginHero}>
        <View style={[styles.logoCircle, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
          <Ionicons name="shield-checkmark" size={40} color="#FFF" />
        </View>
        <Text style={[styles.loginTitle, { fontFamily: 'BeVietnamPro_700Bold' }]}>Đồng Nai Trace</Text>
        <Text style={[styles.loginSubtitle, { fontFamily: 'BeVietnamPro_400Regular' }]}>Hệ thống truy xuất nguồn gốc tỉnh Đồng Nai</Text>
      </LinearGradient>

      <View style={[styles.loginCard, { backgroundColor: colors.background }]}>
        <Text style={[styles.loginCardTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Đăng nhập</Text>
        <Text style={[styles.loginCardDesc, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Dành cho doanh nghiệp và tổ chức tham gia chương trình TXNG</Text>

        <View style={{ gap: 12, marginTop: 20 }}>
          <View>
            <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Email</Text>
            <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.muted }]}>
              <Ionicons name="mail-outline" size={18} color={colors.mutedForeground} style={{ marginLeft: 12 }} />
              <TextInput
                style={[styles.inputField, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                placeholder="email@doanhnghiep.vn"
                placeholderTextColor={colors.mutedForeground}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>
          <View>
            <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Mật khẩu</Text>
            <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.muted }]}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.mutedForeground} style={{ marginLeft: 12 }} />
              <TextInput
                style={[styles.inputField, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                placeholder="••••••••"
                placeholderTextColor={colors.mutedForeground}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPwd}
              />
              <Pressable onPress={() => setShowPwd(v => !v)} style={{ padding: 12 }}>
                <Ionicons name={showPwd ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.mutedForeground} />
              </Pressable>
            </View>
          </View>
          {error ? (
            <View style={[styles.errorBox, { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }]}>
              <Ionicons name="alert-circle-outline" size={15} color="#EF4444" />
              <Text style={[styles.errorText, { color: '#DC2626', fontFamily: 'BeVietnamPro_400Regular' }]}>{error}</Text>
            </View>
          ) : null}
        </View>

        <View style={[styles.demoHint, { backgroundColor: colors.navyLight, borderColor: colors.primary + '40' }]}>
          <Ionicons name="information-circle-outline" size={15} color={colors.primary} />
          <Text style={[styles.demoHintText, { color: colors.primary, fontFamily: 'BeVietnamPro_400Regular' }]}>
            Demo: <Text style={{ fontFamily: 'BeVietnamPro_600SemiBold' }}>admin@htx.vn</Text> / <Text style={{ fontFamily: 'BeVietnamPro_600SemiBold' }}>demo123</Text>
          </Text>
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) => [styles.loginBtn, { backgroundColor: colors.primary, opacity: pressed || loading ? 0.8 : 1, marginTop: 16 }]}
        >
          {loading
            ? <ActivityIndicator color="#FFF" />
            : <Text style={[styles.loginBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đăng nhập</Text>
          }
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>hoặc</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>

        <Pressable
          onPress={() => router.push('/register')}
          style={({ pressed }) => [styles.registerBtn, { borderColor: colors.primary, opacity: pressed ? 0.75 : 1 }]}
        >
          <Text style={[styles.registerBtnText, { color: colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đăng ký tham gia TXNG</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function ProfileView() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Profile header */}
      <LinearGradient colors={['#1A2E9E', '#2740BA']} style={[styles.profileHero, { paddingTop: topPad + 20 }]}>
        <View style={styles.avatarCircle}>
          <Text style={[styles.avatarText, { fontFamily: 'BeVietnamPro_700Bold' }]}>{user?.initials ?? 'U'}</Text>
        </View>
        <Text style={[styles.profileName, { fontFamily: 'BeVietnamPro_700Bold' }]}>{user?.name}</Text>
        <View style={styles.profileTypeBadge}>
          <Text style={[styles.profileTypeText, { fontFamily: 'BeVietnamPro_500Medium' }]}>{user?.type}</Text>
        </View>
        <Text style={[styles.profileEmail, { fontFamily: 'BeVietnamPro_400Regular' }]}>{user?.email}</Text>
      </LinearGradient>

      {/* Quick stats */}
      <View style={[styles.statsRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Sản phẩm</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>3</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Chứng nhận</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#16A34A', fontFamily: 'BeVietnamPro_700Bold' }]}>Đã duyệt</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Trạng thái</Text>
        </View>
      </View>

      {/* Menu */}
      <View style={[styles.menuSection, { backgroundColor: colors.background }]}>
        <Text style={[styles.menuSectionTitle, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>QUẢN LÝ</Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MenuItem icon="business-outline" label="Hồ sơ tổ chức" onPress={() => router.push('/org-profile')} />
          <MenuItem icon="cube-outline" label="Quản lý sản phẩm" onPress={() => router.push('/products-profile')} />
        </View>
      </View>

      <View style={[styles.menuSection, { backgroundColor: colors.background }]}>
        <Text style={[styles.menuSectionTitle, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>HỖ TRỢ</Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MenuItem icon="call-outline" label="Liên hệ & Hỗ trợ" onPress={() => router.push('/contact')} />
          <MenuItem icon="help-circle-outline" label="Hướng dẫn sử dụng" onPress={() => {}} />
        </View>
      </View>

      <View style={[styles.menuSection, { backgroundColor: colors.background }]}>
        <View style={[styles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MenuItem icon="log-out-outline" label="Đăng xuất" onPress={handleLogout} danger />
        </View>
      </View>
    </ScrollView>
  );
}

export default function AccountScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isLoggedIn, isLoading } = useAuth();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, paddingTop: topPad }}>
        <LoginView />
      </View>
    );
  }

  return <ProfileView />;
}

const styles = StyleSheet.create({
  loginHero: { alignItems: 'center', paddingTop: 60, paddingBottom: 36, paddingHorizontal: 24 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  loginTitle: { fontSize: 24, color: '#FFF', marginBottom: 6 },
  loginSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 20 },
  loginCard: { margin: 16, padding: 20, borderRadius: 16 },
  loginCardTitle: { fontSize: 22 },
  loginCardDesc: { fontSize: 13, lineHeight: 19, marginTop: 4 },
  fieldLabel: { fontSize: 13, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 1 },
  inputField: { flex: 1, height: 46, paddingHorizontal: 10, fontSize: 14 },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 8, borderWidth: 1 },
  errorText: { flex: 1, fontSize: 13 },
  demoHint: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 8, borderWidth: 1, marginTop: 4 },
  demoHintText: { fontSize: 12, flex: 1 },
  loginBtn: { paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  loginBtnText: { fontSize: 16, color: '#FFF' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 16 },
  divider: { flex: 1, height: 1 },
  dividerText: { fontSize: 13 },
  registerBtn: { paddingVertical: 13, borderRadius: 10, alignItems: 'center', borderWidth: 1.5 },
  registerBtnText: { fontSize: 15 },
  profileHero: { alignItems: 'center', paddingBottom: 28, paddingHorizontal: 24 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarText: { fontSize: 28, color: '#FFF' },
  profileName: { fontSize: 20, color: '#FFF', textAlign: 'center', marginBottom: 6 },
  profileTypeBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginBottom: 6 },
  profileTypeText: { fontSize: 12, color: '#FFF' },
  profileEmail: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 16, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statValue: { fontSize: 16 },
  statLabel: { fontSize: 11, marginTop: 2 },
  statDivider: { width: 1 },
  menuSection: { marginTop: 20, paddingHorizontal: 16 },
  menuSectionTitle: { fontSize: 11, letterSpacing: 0.8, marginBottom: 8, marginLeft: 4 },
  menuGroup: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 14, gap: 12, borderBottomWidth: 1 },
  menuIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15 },
});
