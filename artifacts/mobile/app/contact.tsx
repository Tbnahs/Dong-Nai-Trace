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
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ModalPicker } from '@/components/ModalPicker';

const TOPICS = [
  'Hỗ trợ đăng ký doanh nghiệp',
  'Hỗ trợ khai báo sản phẩm',
  'Tra cứu mã truy xuất',
  'Báo lỗi hệ thống',
  'Khác',
];

const FAQS = [
  {
    q: 'Làm thế nào để tra cứu nguồn gốc sản phẩm?',
    a: 'Bạn có thể tra cứu bằng mã QR trên bao bì sản phẩm, hoặc nhập mã truy xuất (VD: DNRM-2024-001) hoặc mã GTIN kết hợp số lô hàng trên màn hình "Trang chủ".',
  },
  {
    q: 'Làm thế nào để đăng ký tham gia chương trình TXNG?',
    a: 'Doanh nghiệp, HTX và hộ sản xuất có thể đăng ký qua ứng dụng (tab Tài khoản → Đăng ký) hoặc liên hệ trực tiếp Sở KHCN Đồng Nai. Yêu cầu: có chứng nhận an toàn thực phẩm và quy trình sản xuất rõ ràng.',
  },
  {
    q: 'Thông tin truy xuất được lưu trữ bao lâu?',
    a: 'Dữ liệu truy xuất được lưu trữ tối thiểu 5 năm theo quy định của Bộ Nông nghiệp & PTNT, đảm bảo khả năng truy vết khi cần thiết.',
  },
  {
    q: 'Làm thế nào để biết sản phẩm có mã TXNG là chính hãng?',
    a: 'Khi quét mã QR hoặc nhập mã TXNG, hệ thống sẽ hiển thị thông tin đầy đủ về nguồn gốc, nhà sản xuất và chứng nhận. Mã TXNG chính hãng luôn có trạng thái "Đã xác thực nguồn gốc" màu xanh.',
  },
  {
    q: 'Hệ thống có hỗ trợ xuất khẩu không?',
    a: 'Có, dữ liệu TXNG tương thích với chuẩn GS1 quốc tế, được nhiều thị trường xuất khẩu (EU, Nhật, Mỹ) chấp nhận khi kết hợp với chứng nhận GlobalGAP hoặc tương đương.',
  },
];

export default function ContactScreen() {
  const colors = useColors();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    setSending(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setName(''); setPhone(''); setEmail(''); setTopic(''); setMessage('');
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 80, gap: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Contact cards */}
      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thông tin liên hệ</Text>

      {[
        { icon: 'location-outline', label: 'Địa chỉ', sub: '1592 Nguyễn Ái Quốc, KP6, P.Trung Dũng, Biên Hoà, Đồng Nai', color: colors.accent },
        { icon: 'call-outline', label: 'Điện thoại', sub: '0251.3822297', color: colors.primary },
        { icon: 'mail-outline', label: 'Email', sub: 'skhcn@dongnai.gov.vn', color: colors.primary },
        { icon: 'time-outline', label: 'Giờ làm việc', sub: 'Thứ 2 – Thứ 6: 7:30 – 11:30 & 13:30 – 17:00', color: colors.primary },
      ].map((item, idx) => (
        <View key={idx} style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.contactIcon, { backgroundColor: item.color + '18' }]}>
            <Ionicons name={item.icon as any} size={22} color={item.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.contactLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{item.label}</Text>
            <Text style={[styles.contactValue, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{item.sub}</Text>
          </View>
        </View>
      ))}

      {/* FAQ */}
      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', marginTop: 8 }]}>Câu hỏi thường gặp</Text>

      {FAQS.map((faq, idx) => (
        <Pressable
          key={idx}
          onPress={() => { setExpanded(expanded === idx ? null : idx); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
          style={[styles.faqItem, { backgroundColor: colors.card, borderColor: expanded === idx ? colors.primary : colors.border }]}
        >
          <View style={styles.faqHeader}>
            <Text style={[styles.faqQ, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold', flex: 1 }]}>{faq.q}</Text>
            <Ionicons name={expanded === idx ? 'chevron-up' : 'chevron-down'} size={18} color={colors.primary} />
          </View>
          {expanded === idx && (
            <Text style={[styles.faqA, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular', borderTopColor: colors.border }]}>{faq.a}</Text>
          )}
        </Pressable>
      ))}

      {/* Support form */}
      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold', marginTop: 8 }]}>Gửi yêu cầu hỗ trợ</Text>

      {sent ? (
        <View style={[styles.successBox, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}>
          <Ionicons name="checkmark-circle" size={28} color="#16A34A" />
          <Text style={[styles.successText, { color: '#15803D', fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đã gửi yêu cầu thành công!</Text>
          <Text style={[styles.successSub, { color: '#15803D', fontFamily: 'BeVietnamPro_400Regular' }]}>Chúng tôi sẽ phản hồi trong vòng 1-2 ngày làm việc</Text>
          <Pressable onPress={() => setSent(false)} style={[styles.newRequestBtn, { borderColor: '#16A34A' }]}>
            <Text style={[styles.newRequestText, { color: '#16A34A', fontFamily: 'BeVietnamPro_500Medium' }]}>Gửi yêu cầu mới</Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Họ và tên */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>
              Họ và tên <Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
              <TextInput
                style={[styles.inputField, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                placeholder="Nguyễn Văn A"
                placeholderTextColor={colors.mutedForeground}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Số điện thoại */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Số điện thoại</Text>
            <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
              <TextInput
                style={[styles.inputField, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                placeholder="0912 345 678"
                placeholderTextColor={colors.mutedForeground}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldWrap}>
            <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>Email</Text>
            <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
              <TextInput
                style={[styles.inputField, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                placeholder="email@example.com"
                placeholderTextColor={colors.mutedForeground}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Chủ đề — dropdown matching portal <select> */}
          <ModalPicker
            label="Chủ đề"
            value={topic}
            options={TOPICS}
            placeholder="Chọn chủ đề..."
            onChange={setTopic}
          />

          {/* Nội dung */}
          <View>
            <Text style={[styles.fieldLabel, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>
              Nội dung <Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <View style={[styles.textAreaWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
              <TextInput
                style={[styles.textArea, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}
                placeholder="Mô tả chi tiết nội dung cần hỗ trợ..."
                placeholderTextColor={colors.mutedForeground}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>
          </View>

          <Pressable
            onPress={handleSend}
            disabled={sending}
            style={({ pressed }) => [styles.sendBtn, { backgroundColor: colors.primary, opacity: pressed || sending ? 0.8 : 1, marginTop: 14 }]}
          >
            {sending
              ? <ActivityIndicator color="#FFF" size="small" />
              : <>
                  <Ionicons name="send" size={16} color="#FFF" />
                  <Text style={[styles.sendBtnText, { fontFamily: 'BeVietnamPro_600SemiBold' }]}>Gửi yêu cầu</Text>
                </>
            }
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18 },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, borderWidth: 1 },
  contactIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: 11, marginBottom: 2 },
  contactValue: { fontSize: 14 },
  faqItem: { borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  faqHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  faqQ: { fontSize: 13, lineHeight: 19 },
  faqA: { fontSize: 13, lineHeight: 20, padding: 14, paddingTop: 10, borderTopWidth: 1 },
  formCard: { borderRadius: 14, borderWidth: 1, padding: 16 },
  fieldWrap: { marginBottom: 12 },
  fieldLabel: { fontSize: 13, marginBottom: 6 },
  inputWrap: { borderRadius: 10, borderWidth: 1 },
  inputField: { height: 44, paddingHorizontal: 12, fontSize: 14 },
  textAreaWrap: { borderRadius: 10, borderWidth: 1 },
  textArea: { padding: 12, fontSize: 14, minHeight: 110 },
  sendBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 13, borderRadius: 10 },
  sendBtnText: { fontSize: 15, color: '#FFF' },
  successBox: { alignItems: 'center', padding: 24, borderRadius: 14, borderWidth: 1, gap: 8 },
  successText: { fontSize: 16 },
  successSub: { fontSize: 13, textAlign: 'center' },
  newRequestBtn: { marginTop: 6, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5 },
  newRequestText: { fontSize: 13 },
});
