import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { NOTIFICATIONS, type NotificationItem } from '@/data/mock';

const ICONS: Record<NotificationItem['type'], { name: keyof typeof Ionicons.glyphMap; color: string; background: string }> = {
  success: { name: 'checkmark-circle-outline', color: '#059669', background: '#ECFDF5' },
  warning: { name: 'alert-circle-outline', color: '#D97706', background: '#FFFBEB' },
  info: { name: 'information-circle-outline', color: '#2563EB', background: '#EFF6FF' },
  error: { name: 'close-circle-outline', color: '#DC2626', background: '#FEF2F2' },
};

export default function NotificationsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState(NOTIFICATIONS);
  const unread = useMemo(() => items.filter(item => !item.read).length, [items]);

  const markAllRead = () => setItems(current => current.map(item => ({ ...item, read: true })));
  const markRead = (id: string) => setItems(current => current.map(item => item.id === id ? { ...item, read: true } : item));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.softBackground }]}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backButton} accessibilityLabel="Quay lại">
          <Ionicons name="arrow-back" size={21} color={colors.foreground} />
        </Pressable>
        <View style={styles.titleWrap}>
          <View style={[styles.titleIcon, { backgroundColor: colors.navyLight }]}>
            <Ionicons name="notifications-outline" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thông báo</Text>
            {unread > 0 && <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{unread} chưa đọc</Text>}
          </View>
        </View>
        {unread > 0 ? (
          <Pressable onPress={markAllRead} hitSlop={8}>
            <Text style={[styles.markAll, { color: colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đã đọc hết</Text>
          </Pressable>
        ) : <View style={styles.markAllPlaceholder} />}
      </View>

      <View style={styles.list}>
        {items.map(item => {
          const icon = ICONS[item.type];
          return (
            <Pressable
              key={item.id}
              onPress={() => markRead(item.id)}
              style={({ pressed }) => [
                styles.notificationCard,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
                !item.read && { borderColor: `${colors.primary}45` },
              ]}
            >
              <View style={[styles.notificationIcon, { backgroundColor: icon.background }]}>
                <Ionicons name={icon.name} size={21} color={icon.color} />
              </View>
              <View style={styles.notificationBody}>
                <View style={styles.notificationTitleRow}>
                  <Text style={[styles.notificationTitle, { color: colors.foreground, fontFamily: item.read ? 'BeVietnamPro_500Medium' : 'BeVietnamPro_700Bold' }]}>{item.title}</Text>
                  {!item.read && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
                </View>
                <Text style={[styles.notificationText, { color: colors.mutedForeground }]}>{item.body}</Text>
                <Text style={[styles.notificationDate, { color: colors.mutedForeground }]}>{item.date}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 10 },
  backButton: { padding: 4 },
  titleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  titleIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18 },
  subtitle: { fontSize: 11, marginTop: 1 },
  markAll: { fontSize: 11 },
  markAllPlaceholder: { width: 4 },
  list: { paddingHorizontal: 16, paddingTop: 18, gap: 10 },
  notificationCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 14, borderRadius: 14, borderWidth: 1 },
  notificationIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  notificationBody: { flex: 1 },
  notificationTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  notificationTitle: { flex: 1, fontSize: 13, lineHeight: 19 },
  unreadDot: { width: 7, height: 7, borderRadius: 4, marginTop: 5 },
  notificationText: { fontSize: 12, lineHeight: 18, marginTop: 3 },
  notificationDate: { fontSize: 10, marginTop: 7 },
});