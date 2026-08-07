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
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '@/context/AuthContext';
import { PRODUCTS } from '@/data/mock';

interface ProductEntry {
  id: string;
  name: string;
  traceCode: string;
  category: string;
  status: 'active' | 'pending' | 'draft';
  gtin?: string;
  description?: string;
  ingredients?: string;
  weight?: string;
  packaging?: string;
  expiry?: string;
  certifications?: string[];
  mediaNote?: string;
  certificationFile?: string;
  productImage?: string;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Nông sản & Rau củ');
  const [gtin, setGtin] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [weight, setWeight] = useState('');
  const [packaging, setPackaging] = useState('');
  const [expiry, setExpiry] = useState('');
  const [certifications, setCertifications] = useState<string[]>([]);
  const [mediaNote, setMediaNote] = useState('');
  const [certificationFile, setCertificationFile] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);

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

  const resetForm = () => {
    setNewName(''); setNewCategory('Nông sản & Rau củ'); setGtin(''); setDescription('');
    setIngredients(''); setWeight(''); setPackaging(''); setExpiry('');
    setCertifications([]); setMediaNote(''); setCertificationFile(null); setProductImage(null); setEditingId(null);
  };

  const pickFile = async (kind: 'certification' | 'image') => {
    const result = await DocumentPicker.getDocumentAsync({
      type: kind === 'image' ? 'image/*' : ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
    });
    if (result.canceled || !result.assets?.[0]) return;
    if (kind === 'certification') setCertificationFile(result.assets[0].name);
    else setProductImage(result.assets[0].name);
  };

  const handleAdd = async () => {
    if (!newName.trim()) { Alert.alert('Lỗi', 'Tên sản phẩm không được trống'); return; }
    const id = editingId ?? (Date.now().toString() + Math.random().toString(36).substr(2, 6));
    const existing = products.find(p => p.id === editingId);
    const traceCode = existing?.traceCode ?? `DNSP-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`;
    const entry: ProductEntry = {
      id, name: newName.trim(), traceCode, category: newCategory,
      status: existing?.status ?? 'pending', gtin, description, ingredients, weight,
      packaging, expiry, certifications, mediaNote,
      certificationFile: certificationFile ?? undefined, productImage: productImage ?? undefined,
    };
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await saveProducts(editingId ? products.map(p => p.id === editingId ? entry : p) : [entry, ...products]);
    resetForm(); setShowForm(false);
  };

  const startEdit = (item: ProductEntry) => {
    setEditingId(item.id); setNewName(item.name); setNewCategory(item.category);
    setGtin(item.gtin ?? ''); setDescription(item.description ?? '');
    setIngredients(item.ingredients ?? ''); setWeight(item.weight ?? '');
    setPackaging(item.packaging ?? ''); setExpiry(item.expiry ?? '');
    setCertifications(item.certifications ?? []); setMediaNote(item.mediaNote ?? '');
    setCertificationFile(item.certificationFile ?? null); setProductImage(item.productImage ?? null);
    setShowForm(true);
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
              <Text style={[styles.formTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{editingId ? 'Chỉnh sửa sản phẩm' : 'Khai báo sản phẩm mới'}</Text>
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
              <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium', marginTop: 10 }]}>Mã GTIN (nếu có)</Text>
              <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <TextInput style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]} placeholder="Mã vạch quốc tế..." placeholderTextColor={colors.mutedForeground} value={gtin} onChangeText={setGtin} keyboardType="numeric" />
              </View>
              <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium', marginTop: 10 }]}>Mô tả sản phẩm</Text>
              <View style={[styles.textAreaWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <TextInput style={[styles.textArea, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]} placeholder="Nhập mô tả chi tiết..." placeholderTextColor={colors.mutedForeground} value={description} onChangeText={setDescription} multiline textAlignVertical="top" />
              </View>
              <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium', marginTop: 10 }]}>Danh mục</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                {['Nông sản & Rau củ', 'Thủy sản', 'Thực phẩm chế biến', 'Thủ công mỹ nghệ', 'Dược liệu'].map(c => (
                  <Pressable key={c} onPress={() => setNewCategory(c)} style={[styles.chip, { backgroundColor: newCategory === c ? colors.primary : colors.muted, borderColor: newCategory === c ? colors.primary : colors.border }]}>
                    <Text style={[styles.chipText, { color: newCategory === c ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{c}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.twoColumns}>
                {([
                  { label: 'Thành phần / Nguyên liệu', value: ingredients, setter: setIngredients, placeholder: 'Bưởi 100% tự nhiên...' },
                  { label: 'Khối lượng / Quy cách', value: weight, setter: setWeight, placeholder: '500g, 1kg...' },
                  { label: 'Bao bì đóng gói', value: packaging, setter: setPackaging, placeholder: 'Túi lưới có nhãn TXNG...' },
                  { label: 'Hạn sử dụng', value: expiry, setter: setExpiry, placeholder: '7 ngày...' },
                ] as const).map(({ label, value, setter, placeholder }) => (
                  <View key={label} style={styles.halfField}>
                    <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{label}</Text>
                    <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                      <TextInput style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]} placeholder={placeholder} placeholderTextColor={colors.mutedForeground} value={value} onChangeText={setter} />
                    </View>
                  </View>
                ))}
              </View>
              <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium', marginTop: 6 }]}>Chứng nhận</Text>
              <View style={styles.chipRow}>
                {['VietGAP', 'GlobalGAP', 'OCOP', 'ISO 22000', 'HACCP', 'Hữu cơ'].map(cert => (
                  <Pressable key={cert} onPress={() => setCertifications(prev => prev.includes(cert) ? prev.filter(x => x !== cert) : [...prev, cert])} style={[styles.chip, { backgroundColor: certifications.includes(cert) ? colors.primary : colors.muted, borderColor: certifications.includes(cert) ? colors.primary : colors.border }]}>
                    <Text style={[styles.chipText, { color: certifications.includes(cert) ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{cert}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium', marginTop: 10 }]}>Link video giới thiệu (YouTube/Vimeo)</Text>
              <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <TextInput style={[styles.input, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]} placeholder="https://youtube.com/..." placeholderTextColor={colors.mutedForeground} value={mediaNote} onChangeText={setMediaNote} autoCapitalize="none" />
              </View>
              <Pressable onPress={() => pickFile('certification')} style={[styles.uploadRow, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <Ionicons name="document-attach-outline" size={20} color={certificationFile ? colors.primary : colors.mutedForeground} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.uploadTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Tải lên file chứng nhận (PDF/ảnh)</Text>
                  <Text style={[styles.uploadName, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{certificationFile ?? 'Nhấn để chọn file · tối đa 5MB'}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
              </Pressable>
              <Pressable onPress={() => pickFile('image')} style={[styles.uploadRow, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <Ionicons name="image-outline" size={20} color={productImage ? colors.primary : colors.mutedForeground} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.uploadTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Tải lên hình ảnh sản phẩm</Text>
                  <Text style={[styles.uploadName, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]} numberOfLines={1}>{productImage ?? 'JPG, PNG · tối đa 10 ảnh'}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
              </Pressable>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable onPress={() => { resetForm(); setShowForm(false); }} style={[styles.cancelBtn, { borderColor: colors.border }]}>
                  <Text style={[styles.cancelBtnText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>Hủy</Text>
                </Pressable>
                <Pressable onPress={handleAdd} style={[styles.addBtn, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.addBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>{editingId ? 'Lưu thay đổi' : 'Gửi duyệt'}</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable
              onPress={() => { resetForm(); setShowForm(true); }}
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
             <View style={styles.itemActions}>
               <Pressable onPress={() => startEdit(item)} style={styles.deleteBtn}>
                 <Ionicons name="create-outline" size={18} color={colors.primary} />
               </Pressable>
               <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                 <Ionicons name="trash-outline" size={18} color="#EF4444" />
               </Pressable>
             </View>
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
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  twoColumns: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  halfField: { width: '47.5%' },
  textAreaWrap: { borderRadius: 10, borderWidth: 1, minHeight: 82 },
  textArea: { minHeight: 80, padding: 12, fontSize: 13 },
  uploadRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 10, borderWidth: 1, padding: 11, marginTop: 10 },
  uploadTitle: { fontSize: 12 },
  uploadName: { fontSize: 11, marginTop: 2 },
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
  itemActions: { flexDirection: 'row', alignItems: 'center' },
});
