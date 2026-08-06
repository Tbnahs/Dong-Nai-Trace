import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { NOTIFICATIONS, NotificationItem } from '@/data/mock';

const TYPE_ICONS: Record<string, { name: string; color: string; bg: string }> = {
  success: { name: 'checkmark-circle', color: '#16A34A', bg: '#DCFCE7' },
  warning: { name: 'warning', color: '#D97706', bg: '#FEF3C7' },
  info: { name: 'information-circle', color: '#2740BA', bg: '#EFF2FF' },
  error: { name: 'alert-circle', color: '#EF4444', bg: '#FEE2E2' },
};

export default function NotificationsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayed = filter === 'all' ? notifications : notifications.filter(n => !n.read);

  const markRead = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thông báo</Text>
            {unreadCount > 0 && (
              <Text style={[styles.headerSub, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{unreadCount} chưa đọc</Text>
            )}
          </View>
          {unreadCount > 0 && (
            <Pressable onPress={markAllRead} style={[styles.markAllBtn, { backgroundColor: colors.navyLight }]}>
              <Text style={[styles.markAllText, { color: colors.primary, fontFamily: 'BeVietnamPro_500Medium' }]}>Đọc tất cả</Text>
            </Pressable>
          )}
        </View>
        <View style={[styles.filterTabs, { borderColor: colors.border }]}>
          <Pressable onPress={() => setFilter('all')} style={[styles.filterTab, filter === 'all' && [styles.filterTabActive, { borderBottomColor: colors.primary }]]}>
            <Text style={[styles.filterTabText, { color: filter === 'all' ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>
              Tất cả ({notifications.length})
            </Text>
          </Pressable>
          <Pressable onPress={() => setFilter('unread')} style={[styles.filterTab, filter === 'unread' && [styles.filterTabActive, { borderBottomColor: colors.primary }]]}>
            <Text style={[styles.filterTabText, { color: filter === 'unread' ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>
              Chưa đọc ({unreadCount})
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={displayed}
        keyExtractor={n => n.id}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={52} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không có thông báo</Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Tất cả thông báo đã được đọc</Text>
          </View>
        }
        renderItem={({ item }) => {
          const iconMeta = TYPE_ICONS[item.type];
          return (
            <Pressable
              onPress={() => markRead(item.id)}
              style={({ pressed }) => [
                styles.notifItem,
                { backgroundColor: item.read ? colors.background : colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              {!item.read && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
              <View style={[styles.notifIcon, { backgroundColor: iconMeta.bg }]}>
                <Ionicons name={iconMeta.name as any} size={22} color={iconMeta.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.notifTitle, { color: colors.foreground, fontFamily: item.read ? 'BeVietnamPro_500Medium' : 'BeVietnamPro_700Bold' }]}>{item.title}</Text>
                <Text style={[styles.notifBody, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={2}>{item.body}</Text>
                <Text style={[styles.notifDate, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.date}</Text>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border, marginLeft: 72 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1, paddingBottom: 0 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  headerTitle: { fontSize: 28 },
  headerSub: { fontSize: 13, marginTop: 2 },
  markAllBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  markAllText: { fontSize: 13 },
  filterTabs: { flexDirection: 'row', borderBottomWidth: 1, paddingHorizontal: 16 },
  filterTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  filterTabActive: {},
  filterTabText: { fontSize: 14 },
  notifItem: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 14, gap: 12, position: 'relative' },
  unreadDot: { position: 'absolute', left: 8, top: 20, width: 7, height: 7, borderRadius: 4 },
  notifIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notifTitle: { fontSize: 14, marginBottom: 3 },
  notifBody: { fontSize: 13, lineHeight: 18, marginBottom: 5 },
  notifDate: { fontSize: 11 },
  emptyState: { alignItems: 'center', paddingVertical: 80, gap: 10 },
  emptyTitle: { fontSize: 16 },
  emptyDesc: { fontSize: 13 },
});
