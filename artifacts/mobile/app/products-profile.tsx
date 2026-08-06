import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { PRODUCTS } from '@/data/mock';

interface ProductEntry {
  id: string;
  name: string;
  traceCode: string;
  category: string;
  status: 'active' | 'pending' | 'draft';
}

const INITIAL_PRODUCTS: ProductEntry[] = PRODUCTS.slice(0, 2).map(p => ({
  id: p.id, name: p.name, traceCode: p.traceCode, category: p.category, status: 'active',
}));

const STATUS_LABELS = { active: 'Đang hoạt động', pending: 'Chờ duyệt', draft: 'Nháp' };
const STATUS_COLORS = { active: '#16A34A', pending: '#D97706', draft: '#64748B' };

export default function ProductsProfileScreen() {
  const colors = useColors();
  const { isLoggedIn, user } = useAuth();
  const [products, setProducts] = useState<ProductEntry[]>(INITIAL_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Rau củ quả');

  useEffect(() => {
    if (user?.email) {
      AsyncStorage.getItem(`products_${user.email}`).then(data => {
        if (data) setProducts(JSON.parse(data));
      });
    }
  }, [user]);

  const saveProducts = async (list: ProductEntry[]) => {
    if (user?.email) {
      await AsyncStorage.setItem(`products_${user.email}`, JSON.stringify(list));
    }
    setProducts(list);
  };

  const handleAdd = async () => {
    if (!newName.trim()) { Alert.alert('Lỗi', 'Tên sản phẩm không được trống'); return; }
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 6);
    const traceCode = `DNSP-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`;
    const entry: ProductEntry = { id, name: newName.trim(), traceCode, category: newCategory, status: 'pending' };
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await saveProducts([entry, ...products]);
    setNewName(''); setShowForm(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Xóa sản phẩm', 'Bạn có chắc muốn xóa sản phẩm này?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', style: 'destructive', onPress: async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        await saveProducts(products.filter(p => p.id !== id));
      }},
    ]);
  };

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, gap: 12 }}>
        <Ionicons name="lock-closed-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.lockedText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Cần đăng nhập để quản lý sản phẩm</Text>
        <Pressable onPress={() => router.replace('/(tabs)/account')} style={[styles.loginBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.loginBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đăng nhập</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Summary */}
      <View style={[styles.summaryRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {(['active', 'pending', 'draft'] as const).map(s => (
          <View key={s} style={styles.summaryItem}>
            <Text style={[styles.summaryVal, { color: STATUS_COLORS[s], fontFamily: 'BeVietnamPro_700Bold' }]}>
              {products.filter(p => p.status === s).length}
            </Text>
            <Text style={[styles.summaryLbl, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{STATUS_LABELS[s]}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={products}
        keyExtractor={p => p.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 10 }}
        ListHeaderComponent={
          showForm ? (
            <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
              <Text style={[styles.formTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thêm sản phẩm mới</Text>
              <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Tên sản phẩm</Text>
              <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <TextInput
                  style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                  placeholder="VD: Rau muống hữu cơ"
                  placeholderTextColor={colors.mutedForeground}
                  value={newName}
                  onChangeText={setNewName}
                  autoFocus
                />
              </View>
              <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium', marginTop: 10 }]}>Danh mục</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                {['Rau củ quả', 'Trái cây', 'Thực phẩm', 'Chăn nuôi'].map(c => (
                  <Pressable key={c} onPress={() => setNewCategory(c)} style={[styles.chip, { backgroundColor: newCategory === c ? colors.primary : colors.muted, borderColor: newCategory === c ? colors.primary : colors.border }]}>
                    <Text style={[styles.chipText, { color: newCategory === c ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{c}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable onPress={() => setShowForm(false)} style={[styles.cancelBtn, { borderColor: colors.border }]}>
                  <Text style={[styles.cancelBtnText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>Hủy</Text>
                </Pressable>
                <Pressable onPress={handleAdd} style={[styles.addBtn, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.addBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Thêm sản phẩm</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable
              onPress={() => setShowForm(true)}
              style={({ pressed }) => [styles.addNewBtn, { backgroundColor: colors.navyLight, borderColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
            >
              <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
              <Text style={[styles.addNewText, { color: colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Thêm sản phẩm mới</Text>
            </Pressable>
          )
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={52} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Chưa có sản phẩm nào</Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Nhấn "Thêm sản phẩm mới" để bắt đầu</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.productItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <LinearGradient colors={['#2740BA20', '#E8650A15']} style={styles.productImg}>
              <Ionicons name="leaf-outline" size={22} color="#2740BA" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={[styles.productName, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{item.name}</Text>
              <Text style={[styles.productCode, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.traceCode} · {item.category}</Text>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] + '18' }]}>
                <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[item.status] }]} />
                <Text style={[styles.statusText, { color: STATUS_COLORS[item.status], fontFamily: 'BeVietnamPro_500Medium' }]}>{STATUS_LABELS[item.status]}</Text>
              </View>
            </View>
            <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lockedText: { fontSize: 16 },
  loginBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10 },
  loginBtnText: { fontSize: 15, color: '#FFF' },
  summaryRow: { flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 0 },
  summaryItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  summaryVal: { fontSize: 20 },
  summaryLbl: { fontSize: 11, marginTop: 2 },
  formCard: { borderRadius: 14, borderWidth: 1.5, padding: 16, marginBottom: 12 },
  formTitle: { fontSize: 16, marginBottom: 14 },
  fieldLabel: { fontSize: 13, marginBottom: 6 },
  inputWrap: { borderRadius: 10, borderWidth: 1, marginBottom: 4 },
  input: { height: 44, paddingHorizontal: 12, fontSize: 14 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 12 },
  cancelBtn: { flex: 1, paddingVertical: 11, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  cancelBtnText: { fontSize: 14 },
  addBtn: { flex: 2, paddingVertical: 11, borderRadius: 10, alignItems: 'center' },
  addBtnText: { fontSize: 14, color: '#FFF' },
  addNewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed', marginBottom: 12 },
  addNewText: { fontSize: 15 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 8 },
  emptyTitle: { fontSize: 16 },
  emptyDesc: { fontSize: 13 },
  productItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 12, gap: 10 },
  productImg: { width: 50, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  productName: { fontSize: 14 },
  productCode: { fontSize: 11, marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginTop: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11 },
  deleteBtn: { padding: 6 },
});
