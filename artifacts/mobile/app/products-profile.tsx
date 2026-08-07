import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';

type Status = 'approved' | 'pending';
type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  certs: string[];
  description: string;
  image?: string;
  traceCode?: string;
  status: Status;
  updatedAt: string;
};
type ProductForm = {
  name: string;
  category: string;
  unit: string;
  certs: string[];
  description: string;
  image?: string;
};

const CATEGORIES = ['Nông sản & Rau củ', 'Trái cây', 'Thủy sản', 'Thịt & Chăn nuôi', 'Thực phẩm chế biến', 'Dược liệu', 'Thủ công mỹ nghệ', 'Khác'];
const CERTS = ['VietGAP', 'GlobalGAP', 'OCOP', 'HACCP', 'ISO 22000', 'Hữu cơ'];
const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Bưởi Tân Triều', category: 'Trái cây', unit: 'kg', certs: ['VietGAP'], description: 'Bưởi da xanh trồng tại Tân Triều, Vĩnh Cửu.', traceCode: 'TXNG-VCU-001-2024', status: 'approved', updatedAt: '15/10/2024' },
  { id: 'p2', name: 'Rau muống hữu cơ', category: 'Nông sản & Rau củ', unit: 'bó', certs: ['VietGAP', 'Hữu cơ'], description: 'Rau muống canh tác hữu cơ, không hóa chất.', traceCode: 'TXNG-XL-002-2024', status: 'approved', updatedAt: '10/08/2024' },
  { id: 'p3', name: 'Mật ong rừng nguyên chất', category: 'Thực phẩm chế biến', unit: 'chai', certs: ['OCOP'], description: 'Mật ong khai thác từ rừng tự nhiên Vĩnh Cửu.', traceCode: 'TXNG-VCU-003-2024', status: 'approved', updatedAt: '01/06/2024' },
  { id: 'p4', name: 'Xoài cát hòa lộc', category: 'Trái cây', unit: 'kg', certs: ['VietGAP'], description: 'Xoài cát Hòa Lộc chất lượng cao, xuất khẩu.', status: 'pending', updatedAt: '20/07/2024' },
  { id: 'p5', name: 'Sầu riêng Ri6', category: 'Trái cây', unit: 'kg', certs: ['VietGAP'], description: 'Sầu riêng Ri6 thu hoạch tháng 5–7 hàng năm.', status: 'pending', updatedAt: '05/07/2024' },
];

const EMPTY_FORM: ProductForm = { name: '', category: CATEGORIES[0], unit: '', certs: [], description: '' };

function StatusBadge({ status }: { status: Status }) {
  const colors = useColors();
  const approved = status === 'approved';
  return (
    <View style={[styles.statusBadge, { backgroundColor: approved ? '#ECFDF5' : '#FFFBEB', borderColor: approved ? '#A7F3D0' : '#FCD34D' }]}>
      <Ionicons name={approved ? 'checkmark-circle' : 'alert-circle'} size={14} color={approved ? '#059669' : '#D97706'} />
      <Text style={[styles.statusText, { color: approved ? '#047857' : '#B45309', fontFamily: 'BeVietnamPro_700Bold' }]}>{approved ? 'Đã duyệt' : 'Chờ duyệt'}</Text>
    </View>
  );
}

function ProductCard({ product, onView, onEdit, onDelete }: { product: Product; onView: () => void; onEdit: () => void; onDelete: () => void }) {
  const colors = useColors();
  return (
    <View style={[styles.productCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {product.image ? <Image source={{ uri: product.image }} style={styles.productImage} /> : (
        <View style={[styles.productImagePlaceholder, { backgroundColor: colors.navyLight }]}>
          <Ionicons name="leaf-outline" size={28} color={colors.primary} />
        </View>
      )}
      <View style={styles.productMain}>
        <View style={styles.productTopLine}>
          <Text style={[styles.productName, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]} numberOfLines={2}>{product.name}</Text>
          <StatusBadge status={product.status} />
        </View>
        <View style={styles.chipRow}>
          <Text style={[styles.categoryChip, { color: colors.mutedForeground, backgroundColor: colors.muted, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{product.category}</Text>
          {product.certs.slice(0, 2).map(cert => <Text key={cert} style={[styles.certChip, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>{cert}</Text>)}
        </View>
        {product.traceCode ? (
          <Text style={[styles.traceCode, { fontFamily: 'BeVietnamPro_700Bold' }]}>{product.traceCode}</Text>
        ) : (
          <Text style={[styles.noTrace, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Chưa cấp mã TXNG</Text>
        )}
        <View style={[styles.productFooter, { borderTopColor: colors.border }]}>
          <Text style={[styles.updated, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Cập nhật {product.updatedAt}</Text>
          <View style={styles.actions}>
            <Pressable onPress={onView} style={[styles.actionButton, { backgroundColor: colors.muted }]} accessibilityLabel="Xem chi tiết"><Ionicons name="eye-outline" size={17} color={colors.mutedForeground} /></Pressable>
            <Pressable onPress={onEdit} style={[styles.actionButton, { backgroundColor: colors.muted }]} accessibilityLabel="Chỉnh sửa"><Ionicons name="create-outline" size={17} color={colors.primary} /></Pressable>
            <Pressable onPress={onDelete} style={[styles.actionButton, { backgroundColor: '#FEF2F2' }]} accessibilityLabel="Xóa"><Ionicons name="trash-outline" size={17} color="#EF4444" /></Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

function ProductEditor({ initial, onClose, onSave }: { initial: ProductForm; onClose: () => void; onSave: (form: ProductForm) => void }) {
  const colors = useColors();
  const [form, setForm] = useState<ProductForm>(initial);
  const [error, setError] = useState('');
  const set = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) => setForm(current => ({ ...current, [key]: value }));

  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*', copyToCacheDirectory: true });
    if (!result.canceled && result.assets?.[0]) set('image', result.assets[0].uri);
  };

  const save = () => {
    if (!form.name.trim()) { setError('Vui lòng nhập tên sản phẩm'); return; }
    if (!form.unit.trim()) { setError('Vui lòng nhập đơn vị tính'); return; }
    onSave({ ...form, name: form.name.trim(), unit: form.unit.trim() });
  };

  return (
    <View style={[styles.editor, { backgroundColor: colors.card, borderColor: colors.primary }]}>
      <View style={styles.editorHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.editorTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{initial.name ? `Chỉnh sửa: ${initial.name}` : 'Thêm sản phẩm mới'}</Text>
          <Text style={[styles.editorSubtitle, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Điền thông tin để lưu hồ sơ sản phẩm</Text>
        </View>
        <Pressable onPress={onClose} hitSlop={8}><Ionicons name="close" size={22} color={colors.mutedForeground} /></Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={[styles.editorSection, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>THÔNG TIN CƠ BẢN</Text>
      <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Tên sản phẩm *</Text>
      <TextInput value={form.name} onChangeText={value => set('name', value)} placeholder="VD: Bưởi da xanh VietGAP" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]} />
      <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Danh mục *</Text>
      <View style={styles.optionWrap}>
        {CATEGORIES.map(category => <Pressable key={category} onPress={() => set('category', category)} style={[styles.option, { borderColor: form.category === category ? colors.primary : colors.border, backgroundColor: form.category === category ? colors.navyLight : colors.muted }]}><Text style={[styles.optionText, { color: form.category === category ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{category}</Text></Pressable>)}
      </View>
      <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đơn vị tính *</Text>
      <TextInput value={form.unit} onChangeText={value => set('unit', value)} placeholder="kg, hộp, thùng..." placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]} />
      <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Mô tả sản phẩm</Text>
      <TextInput value={form.description} onChangeText={value => set('description', value)} placeholder="Mô tả ngắn gọn về sản phẩm, vùng trồng, quy trình sản xuất..." placeholderTextColor={colors.mutedForeground} multiline textAlignVertical="top" style={[styles.textArea, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]} />
      <Text style={[styles.editorSection, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>CHỨNG NHẬN CHẤT LƯỢNG</Text>
      <View style={styles.optionWrap}>{CERTS.map(cert => <Pressable key={cert} onPress={() => set('certs', form.certs.includes(cert) ? form.certs.filter(item => item !== cert) : [...form.certs, cert])} style={[styles.option, { borderColor: form.certs.includes(cert) ? colors.primary : colors.border, backgroundColor: form.certs.includes(cert) ? colors.navyLight : colors.muted }]}><Ionicons name={form.certs.includes(cert) ? 'checkmark-circle' : 'ellipse-outline'} size={15} color={form.certs.includes(cert) ? colors.primary : colors.mutedForeground} /><Text style={[styles.optionText, { color: form.certs.includes(cert) ? colors.primary : colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>{cert}</Text></Pressable>)}</View>
      <Text style={[styles.editorSection, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>HÌNH ẢNH SẢN PHẨM</Text>
      <Pressable onPress={pickImage} style={[styles.upload, { borderColor: colors.border, backgroundColor: colors.muted }]}>
        {form.image ? <Image source={{ uri: form.image }} style={styles.uploadImage} /> : <Ionicons name="cloud-upload-outline" size={28} color={colors.primary} />}
        <View style={{ flex: 1 }}><Text style={[styles.uploadTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{form.image ? 'Đổi ảnh' : 'Tải lên hình ảnh sản phẩm'}</Text><Text style={[styles.uploadDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>JPG, PNG — tối đa 5MB</Text></View>
      </Pressable>
      <View style={styles.editorFooter}>
        <Pressable onPress={onClose} style={[styles.cancelEditor, { borderColor: colors.border }]}><Text style={[styles.cancelEditorText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Hủy</Text></Pressable>
        <Pressable onPress={save} style={[styles.saveEditor, { backgroundColor: colors.accent }]}><Ionicons name="checkmark" size={17} color="#FFF" /><Text style={[styles.saveEditorText, { fontFamily: 'BeVietnamPro_700Bold' }]}>Lưu sản phẩm</Text></Pressable>
      </View>
    </View>
  );
}

export default function ProductsProfileScreen() {
  const colors = useColors();
  const { isLoggedIn, user } = useAuth();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'with' | 'without'>('with');
  const [status, setStatus] = useState<'all' | Status>('all');
  const [category, setCategory] = useState('all');
  const [editor, setEditor] = useState<{ id?: string; form: ProductForm } | null>(null);
  const [viewing, setViewing] = useState<Product | null>(null);

  useEffect(() => {
    if (user?.email) AsyncStorage.getItem(`products_${user.email}`).then(data => data && setProducts(JSON.parse(data)));
  }, [user?.email]);

  const persist = async (next: Product[]) => {
    if (user?.email) await AsyncStorage.setItem(`products_${user.email}`, JSON.stringify(next));
    setProducts(next);
  };

  const withTrace = products.filter(product => product.traceCode).length;
  const withoutTrace = products.length - withTrace;
  const categories = Array.from(new Set(products.filter(product => tab === 'with' ? !!product.traceCode : !product.traceCode).map(product => product.category)));
  const filtered = useMemo(() => products.filter(product => {
    const belongs = tab === 'with' ? !!product.traceCode : !product.traceCode;
    const query = search.trim().toLowerCase();
    return belongs && (!query || `${product.name} ${product.category} ${product.traceCode ?? ''}`.toLowerCase().includes(query)) && (status === 'all' || product.status === status) && (category === 'all' || product.category === category);
  }), [products, tab, search, status, category]);

  if (!isLoggedIn) {
    return <View style={[styles.locked, { backgroundColor: colors.background }]}><Ionicons name="lock-closed-outline" size={48} color={colors.mutedForeground} /><Text style={[styles.lockedText, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Cần đăng nhập để quản lý sản phẩm</Text><Pressable onPress={() => router.replace('/(tabs)/account')} style={[styles.loginButton, { backgroundColor: colors.primary }]}><Text style={[styles.loginButtonText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đăng nhập</Text></Pressable></View>;
  }

  const startAdd = () => setEditor({ form: { ...EMPTY_FORM } });
  const startEdit = (product: Product) => setEditor({ id: product.id, form: { name: product.name, category: product.category, unit: product.unit, certs: product.certs, description: product.description, image: product.image } });
  const saveProduct = async (form: ProductForm) => {
    const existing = editor?.id ? products.find(product => product.id === editor.id) : undefined;
    const nextProduct: Product = { id: editor?.id ?? `p-${Date.now()}`, ...form, status: existing?.status ?? 'pending', traceCode: existing?.traceCode, updatedAt: new Date().toLocaleDateString('vi-VN') };
    await persist(editor?.id ? products.map(product => product.id === editor.id ? nextProduct : product) : [nextProduct, ...products]);
    setEditor(null);
  };
  const removeProduct = (product: Product) => Alert.alert('Xóa sản phẩm?', `Sản phẩm ${product.name} sẽ bị xóa khỏi danh sách.`, [{ text: 'Hủy', style: 'cancel' }, { text: 'Xác nhận xóa', style: 'destructive', onPress: () => persist(products.filter(item => item.id !== product.id)) }]);

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6FB' }}>
      <FlatList
        data={filtered}
        keyExtractor={product => product.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <View style={styles.pageHeader}><View><Text style={[styles.pageTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Quản lý sản phẩm</Text><Text style={[styles.pageSubtitle, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{products.length} sản phẩm trong danh sách</Text></View><Pressable onPress={startAdd} style={[styles.addButton, { backgroundColor: colors.primary }]}><Ionicons name="add" size={18} color="#FFF" /><Text style={[styles.addButtonText, { fontFamily: 'BeVietnamPro_700Bold' }]}>Thêm sản phẩm</Text></Pressable></View>
            {editor && <ProductEditor initial={editor.form} onClose={() => setEditor(null)} onSave={saveProduct} />}
            <View style={styles.tabs}>
              <Pressable onPress={() => { setTab('with'); setStatus('all'); setCategory('all'); }} style={[styles.tab, { borderColor: tab === 'with' ? '#34D399' : colors.border, backgroundColor: tab === 'with' ? '#ECFDF5' : colors.card }]}><Ionicons name="shield-checkmark-outline" size={18} color={tab === 'with' ? '#059669' : colors.mutedForeground} /><Text style={[styles.tabText, { color: tab === 'with' ? '#065F46' : colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>Đã có truy xuất nguồn gốc</Text><Text style={styles.countGreen}>{withTrace}</Text></Pressable>
              <Pressable onPress={() => { setTab('without'); setStatus('all'); setCategory('all'); }} style={[styles.tab, { borderColor: tab === 'without' ? '#FBBF24' : colors.border, backgroundColor: tab === 'without' ? '#FFFBEB' : colors.card }]}><Ionicons name="alert-circle-outline" size={18} color={tab === 'without' ? '#D97706' : colors.mutedForeground} /><Text style={[styles.tabText, { color: tab === 'without' ? '#92400E' : colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>Chưa có truy xuất nguồn gốc</Text><Text style={styles.countAmber}>{withoutTrace}</Text></Pressable>
            </View>
            <View style={[styles.toolbar, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.searchBox, { backgroundColor: colors.muted, borderColor: colors.border }]}><Ionicons name="search" size={17} color={colors.mutedForeground} /><TextInput value={search} onChangeText={setSearch} placeholder="Tìm theo tên, danh mục, mã truy xuất..." placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]} /></View>
              <View style={styles.filterRow}><Pressable onPress={() => setStatus(status === 'all' ? 'approved' : status === 'approved' ? 'pending' : 'all')} style={[styles.filterButton, { borderColor: colors.border, backgroundColor: colors.muted }]}><Text style={[styles.filterText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>{status === 'all' ? 'Trạng thái' : status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}</Text><Ionicons name="chevron-down" size={14} color={colors.mutedForeground} /></Pressable><Pressable onPress={() => { const index = categories.indexOf(category); setCategory(categories.length ? (index < 0 || index === categories.length - 1 ? 'all' : categories[index + 1]) : 'all'); }} style={[styles.filterButton, { borderColor: colors.border, backgroundColor: colors.muted }]}><Text style={[styles.filterText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_600SemiBold' }]} numberOfLines={1}>{category === 'all' ? 'Danh mục' : category}</Text><Ionicons name="chevron-down" size={14} color={colors.mutedForeground} /></Pressable></View>
            </View>
          </>
        }
        renderItem={({ item }) => <ProductCard product={item} onView={() => setViewing(item)} onEdit={() => startEdit(item)} onDelete={() => removeProduct(item)} />}
        ListEmptyComponent={<View style={styles.empty}><Ionicons name="cube-outline" size={44} color={colors.mutedForeground} /><Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Không tìm thấy sản phẩm nào</Text></View>}
      />
      {viewing && <View style={styles.modalOverlay}><View style={[styles.detail, { backgroundColor: colors.card }]}><View style={styles.detailHeader}><Text style={[styles.detailTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>{viewing.name}</Text><Pressable onPress={() => setViewing(null)}><Ionicons name="close" size={22} color={colors.mutedForeground} /></Pressable></View><StatusBadge status={viewing.status} />{viewing.image ? <Image source={{ uri: viewing.image }} style={styles.detailImage} /> : null}<Text style={[styles.detailDescription, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>{viewing.description}</Text><Text style={[styles.detailRow, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>Danh mục: <Text style={{ color: colors.foreground }}>{viewing.category}</Text></Text><Text style={[styles.detailRow, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>Đơn vị tính: <Text style={{ color: colors.foreground }}>{viewing.unit}</Text></Text><Text style={[styles.detailRow, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_500Medium' }]}>Mã truy xuất: <Text style={{ color: viewing.traceCode ? '#047857' : colors.foreground }}>{viewing.traceCode ?? 'Chưa cấp'}</Text></Text><View style={styles.detailCerts}>{viewing.certs.map(cert => <Text key={cert} style={styles.certChip}>{cert}</Text>)}</View></View></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  locked: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  lockedText: { fontSize: 16 },
  loginButton: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10 },
  loginButtonText: { color: '#FFF', fontSize: 15 },
  list: { padding: 14, paddingBottom: 100, gap: 10 },
  pageHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 14 },
  pageTitle: { fontSize: 21 },
  pageSubtitle: { fontSize: 12, marginTop: 3 },
  addButton: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 11, paddingVertical: 10, borderRadius: 10 },
  addButtonText: { color: '#FFF', fontSize: 11 },
  tabs: { gap: 8, marginBottom: 10 },
  tab: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 11, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5 },
  tabText: { flex: 1, fontSize: 12, lineHeight: 17 },
  countGreen: { color: '#FFF', backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 7, fontSize: 11, fontWeight: '700' },
  countAmber: { color: '#FFF', backgroundColor: '#F59E0B', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 7, fontSize: 11, fontWeight: '700' },
  toolbar: { padding: 11, borderRadius: 14, borderWidth: 1, gap: 9, marginBottom: 2 },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 7, height: 42, paddingHorizontal: 11, borderRadius: 10, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: 12 },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5, minHeight: 38, paddingHorizontal: 10, borderRadius: 9, borderWidth: 1 },
  filterText: { flex: 1, fontSize: 11 },
  productCard: { flexDirection: 'row', gap: 11, padding: 11, borderRadius: 14, borderWidth: 1 },
  productImage: { width: 66, height: 66, borderRadius: 11 },
  productImagePlaceholder: { width: 66, height: 66, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  productMain: { flex: 1, minWidth: 0 },
  productTopLine: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  productName: { flex: 1, fontSize: 14, lineHeight: 19 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 7, borderWidth: 1 },
  statusText: { fontSize: 9 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 6 },
  categoryChip: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5, fontSize: 10 },
  certChip: { color: '#047857', backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', borderWidth: 1, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5, fontSize: 10 },
  traceCode: { color: '#047857', fontSize: 10, marginTop: 6 },
  noTrace: { color: '#B45309', fontSize: 10, marginTop: 6 },
  productFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5, borderTopWidth: 1, marginTop: 8, paddingTop: 8 },
  updated: { flex: 1, fontSize: 9 },
  actions: { flexDirection: 'row', gap: 5 },
  actionButton: { width: 29, height: 29, alignItems: 'center', justifyContent: 'center', borderRadius: 7 },
  empty: { alignItems: 'center', paddingVertical: 55, gap: 9 },
  emptyTitle: { fontSize: 15 },
  editor: { borderWidth: 1.5, borderRadius: 15, padding: 14, marginBottom: 10 },
  editorHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 14 },
  editorTitle: { fontSize: 16 },
  editorSubtitle: { fontSize: 11, marginTop: 3 },
  editorSection: { fontSize: 10, letterSpacing: 0.7, marginTop: 7, marginBottom: 10 },
  error: { color: '#DC2626', fontSize: 12, marginBottom: 8 },
  label: { fontSize: 12, marginBottom: 6 },
  input: { height: 43, borderWidth: 1, borderRadius: 9, paddingHorizontal: 11, fontSize: 13, marginBottom: 11 },
  textArea: { minHeight: 82, borderWidth: 1, borderRadius: 9, paddingHorizontal: 11, paddingTop: 10, fontSize: 13, marginBottom: 11 },
  optionWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 11 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 7, borderRadius: 7, borderWidth: 1 },
  optionText: { fontSize: 10 },
  upload: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 60, padding: 9, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed' },
  uploadImage: { width: 48, height: 48, borderRadius: 7 },
  uploadTitle: { fontSize: 12 },
  uploadDescription: { fontSize: 10, marginTop: 2 },
  editorFooter: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 14 },
  cancelEditor: { paddingHorizontal: 17, paddingVertical: 10, borderRadius: 9, borderWidth: 1 },
  cancelEditorText: { fontSize: 12 },
  saveEditor: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 9 },
  saveEditorText: { color: '#FFF', fontSize: 12 },
  modalOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', alignItems: 'center', justifyContent: 'center', padding: 18 },
  detail: { width: '100%', maxHeight: '85%', borderRadius: 17, padding: 18, gap: 12 },
  detailHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailTitle: { flex: 1, fontSize: 20 },
  detailImage: { width: '100%', height: 170, borderRadius: 12 },
  detailDescription: { fontSize: 14, lineHeight: 21 },
  detailRow: { fontSize: 13 },
  detailCerts: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});