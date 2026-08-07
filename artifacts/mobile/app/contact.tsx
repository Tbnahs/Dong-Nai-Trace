import React, { useEffect, useRef, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';

type FormData = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  content: string;
};

type ChatMessage = {
  id: number;
  from: 'user' | 'admin';
  text: string;
  time: string;
};

const TOPICS = [
  'Hỗ trợ đăng ký doanh nghiệp',
  'Hỗ trợ khai báo sản phẩm',
  'Tra cứu mã truy xuất',
  'Báo lỗi hệ thống',
  'Khác',
];

let ticketCounter = 1001;

function nowStamp() {
  return new Date().toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function ChatView({
  form,
  ticketId,
  onClose,
}: {
  form: FormData;
  ticketId: string;
  onClose: () => void;
}) {
  const colors = useColors();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: 'user', text: form.content || '(Không có nội dung)', time: nowStamp() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(true);
  const [closed, setClosed] = useState(false);
  const bottomRef = useRef<View>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTyping(false);
      setMessages(current => [
        ...current,
        {
          id: Date.now(),
          from: 'admin',
          text: 'Chúng tôi đã nhận được yêu cầu của bạn. Bộ phận kỹ thuật sẽ xem xét và phản hồi trong vòng 1 ngày làm việc.',
          time: nowStamp(),
        },
      ]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text || closed) return;
    setMessages(current => [...current, { id: Date.now(), from: 'user', text, time: nowStamp() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(current => [
        ...current,
        {
          id: Date.now() + 1,
          from: 'admin',
          text: 'Cảm ơn bạn đã phản hồi. Chúng tôi đang xử lý yêu cầu của bạn.',
          time: nowStamp(),
        },
      ]);
    }, 1800);
  };

  const initials = form.name.trim().split(' ').slice(-1)[0]?.slice(0, 2).toUpperCase() || 'DN';

  return (
    <View style={[styles.chat, { backgroundColor: colors.card }]}>
      <View style={[styles.chatHeader, { borderBottomColor: colors.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.chatTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]} numberOfLines={1}>
            {form.topic || 'Yêu cầu hỗ trợ'}
          </Text>
          <Text style={[styles.chatSubtitle, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
            {form.name} · {ticketId}
          </Text>
        </View>
        <View style={styles.chatHeaderActions}>
          <View style={styles.processingBadge}>
            <Text style={[styles.processingText, { fontFamily: 'BeVietnamPro_700Bold' }]}>{closed ? 'Đã đóng' : 'Đang xử lý'}</Text>
          </View>
          <Pressable
            onPress={() => {
              setClosed(true);
              onClose();
            }}
            hitSlop={8}
            accessibilityLabel="Đóng yêu cầu"
          >
            <Ionicons name="close" size={20} color={colors.mutedForeground} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={[styles.messages, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(message => (
          <View key={message.id} style={[styles.messageRow, message.from === 'user' && styles.userMessageRow]}>
            <View style={[styles.chatAvatar, { backgroundColor: message.from === 'user' ? colors.primary : '#E2E8F0' }]}>
              <Text style={[styles.chatAvatarText, { color: message.from === 'user' ? '#FFF' : '#475569', fontFamily: 'BeVietnamPro_700Bold' }]}>
                {message.from === 'user' ? initials : 'AD'}
              </Text>
            </View>
            <View style={[styles.messageBody, message.from === 'user' && styles.userMessageBody]}>
              <View style={[styles.messageBubble, message.from === 'user' ? { backgroundColor: colors.primary } : { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                <Text style={[styles.messageText, { color: message.from === 'user' ? '#FFF' : colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>
                  {message.text}
                </Text>
              </View>
              <Text style={[styles.messageTime, { color: colors.mutedForeground }]}>{message.time}</Text>
            </View>
          </View>
        ))}
        {typing && (
          <View style={styles.messageRow}>
            <View style={[styles.chatAvatar, { backgroundColor: '#E2E8F0' }]}>
              <Text style={[styles.chatAvatarText, { color: '#475569', fontFamily: 'BeVietnamPro_700Bold' }]}>AD</Text>
            </View>
            <View style={[styles.messageBubble, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
              <Text style={[styles.typingText, { color: colors.primary }]}>•••</Text>
            </View>
          </View>
        )}
        <View ref={bottomRef} />
      </ScrollView>

      <View style={[styles.chatInputBar, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
        {closed ? (
          <Text style={[styles.closedText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Yêu cầu đã đóng</Text>
        ) : (
          <View style={styles.chatInputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor={colors.mutedForeground}
              style={[styles.chatInput, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]}
            />
            <Pressable onPress={send} disabled={!input.trim()} style={[styles.sendIconButton, { backgroundColor: colors.primary, opacity: input.trim() ? 1 : 0.4 }]}>
              <Ionicons name="send" size={16} color="#FFF" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

export default function ContactScreen() {
  const colors = useColors();
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', topic: '', content: '' });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const set = (key: keyof FormData, value: string) => setForm(current => ({ ...current, [key]: value }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.content.trim()) return;
    setTicketId(`TK-${String(ticketCounter++).padStart(3, '0')}`);
    setSubmitted(true);
  };

  const contactItems = [
    { icon: 'location-outline' as const, label: 'Địa chỉ', value: '1592 Nguyễn Ái Quốc, KP6, P.Trung Dũng, Biên Hoà, Đồng Nai', color: colors.accent, href: 'https://maps.google.com/?q=1592+Nguyễn+Ái+Quốc+Biên+Hoà+Đồng+Nai' },
    { icon: 'call-outline' as const, label: 'Điện thoại', value: '0251.3822297', color: colors.primary, href: 'tel:02513822297' },
    { icon: 'mail-outline' as const, label: 'Email', value: 'skhcn@dongnai.gov.vn', color: colors.primary, href: 'mailto:skhcn@dongnai.gov.vn' },
    { icon: 'time-outline' as const, label: 'Giờ làm việc', value: 'Thứ 2 – Thứ 6: 7:30 – 11:30 & 13:30 – 17:00', color: colors.primary },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F7FA' }} contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <Text style={[styles.heroEyebrow, { fontFamily: 'BeVietnamPro_700Bold' }]}>LIÊN HỆ</Text>
        <Text style={[styles.heroTitle, { fontFamily: 'BeVietnamPro_700Bold' }]}>KÊNH HỖ TRỢ & LIÊN HỆ</Text>
        <Text style={[styles.heroDescription, { fontFamily: 'BeVietnamPro_400Regular' }]}>
          Liên hệ với Sở Khoa học và Công nghệ Thành phố Đồng Nai để được hỗ trợ về hệ thống truy xuất nguồn gốc sản phẩm.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.contactColumn}>
          {contactItems.map(item => (
            <Pressable
              key={item.label}
              disabled={!item.href}
              onPress={() => item.href && Linking.openURL(item.href)}
              style={({ pressed }) => [styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 }]}
            >
              <View style={[styles.contactIcon, { backgroundColor: `${item.color}18` }]}>
                <Ionicons name={item.icon} size={21} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.contactLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>{item.label}</Text>
                <Text style={[styles.contactValue, { color: item.href ? colors.primary : colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>{item.value}</Text>
              </View>
            </Pressable>
          ))}
          <Pressable onPress={() => Linking.openURL('https://dongnai.gov.vn')} style={styles.externalLink}>
            <Ionicons name="open-outline" size={16} color={colors.primary} />
            <Text style={[styles.externalLinkText, { color: colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Cổng thông tin điện tử tỉnh Đồng Nai</Text>
          </Pressable>
        </View>

        <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {submitted ? (
            <ChatView
              form={form}
              ticketId={ticketId}
              onClose={() => {
                setSubmitted(false);
                setForm({ name: '', phone: '', email: '', topic: '', content: '' });
              }}
            />
          ) : (
            <>
              <Text style={[styles.formTitle, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>Gửi yêu cầu hỗ trợ</Text>
              <View style={styles.formGrid}>
                <View style={styles.field}>
                  <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Họ và tên <Text style={styles.required}>*</Text></Text>
                  <TextInput value={form.name} onChangeText={value => set('name', value)} placeholder="Nguyễn Văn A" placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]} />
                </View>
                <View style={styles.field}>
                  <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Số điện thoại</Text>
                  <TextInput value={form.phone} onChangeText={value => set('phone', value)} placeholder="0912 345 678" placeholderTextColor={colors.mutedForeground} keyboardType="phone-pad" style={[styles.input, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]} />
                </View>
              </View>
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Email</Text>
                <TextInput value={form.email} onChangeText={value => set('email', value)} placeholder="email@example.com" placeholderTextColor={colors.mutedForeground} keyboardType="email-address" autoCapitalize="none" style={[styles.input, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]} />
              </View>
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Chủ đề</Text>
                <View style={[styles.selectWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicOptions}>
                    <Pressable onPress={() => set('topic', '')} style={[styles.topicOption, !form.topic && { backgroundColor: colors.primary }]}>
                      <Text style={[styles.topicText, { color: form.topic ? colors.mutedForeground : '#FFF', fontFamily: 'BeVietnamPro_400Regular' }]}>Chọn chủ đề...</Text>
                    </Pressable>
                    {TOPICS.map(option => (
                      <Pressable key={option} onPress={() => set('topic', option)} style={[styles.topicOption, form.topic === option && { backgroundColor: colors.primary }]}>
                        <Text style={[styles.topicText, { color: form.topic === option ? '#FFF' : colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>{option}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Nội dung <Text style={styles.required}>*</Text></Text>
                <TextInput value={form.content} onChangeText={value => set('content', value)} placeholder="Mô tả chi tiết nội dung cần hỗ trợ..." placeholderTextColor={colors.mutedForeground} multiline numberOfLines={5} textAlignVertical="top" style={[styles.textArea, { color: colors.foreground, borderColor: colors.border, fontFamily: 'BeVietnamPro_400Regular' }]} />
              </View>
              <Pressable onPress={handleSubmit} style={({ pressed }) => [styles.submitButton, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}>
                <Text style={[styles.submitText, { fontFamily: 'BeVietnamPro_700Bold' }]}>Gửi yêu cầu</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { paddingBottom: 80 },
  hero: { paddingHorizontal: 20, paddingVertical: 30 },
  heroEyebrow: { color: '#BFDBFE', fontSize: 11, letterSpacing: 1.5, marginBottom: 6 },
  heroTitle: { color: '#FFF', fontSize: 24, lineHeight: 31 },
  heroDescription: { color: '#DBEAFE', fontSize: 13, lineHeight: 20, marginTop: 9 },
  content: { padding: 16, gap: 18 },
  contactColumn: { gap: 10 },
  contactCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 15, borderRadius: 14, borderWidth: 1 },
  contactIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 3 },
  contactValue: { fontSize: 13, lineHeight: 19 },
  externalLink: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 2 },
  externalLinkText: { fontSize: 13 },
  formCard: { borderRadius: 16, borderWidth: 1, padding: 16, overflow: 'hidden' },
  formTitle: { fontSize: 19, marginBottom: 18 },
  formGrid: { gap: 12 },
  field: { marginBottom: 13 },
  label: { fontSize: 13, marginBottom: 7 },
  required: { color: '#EF4444' },
  input: { height: 46, paddingHorizontal: 13, borderWidth: 1, borderRadius: 11, fontSize: 14 },
  textArea: { minHeight: 120, paddingHorizontal: 13, paddingTop: 12, borderWidth: 1, borderRadius: 11, fontSize: 14 },
  selectWrap: { minHeight: 46, borderWidth: 1, borderRadius: 11, overflow: 'hidden' },
  topicOptions: { alignItems: 'center', gap: 6, paddingHorizontal: 6 },
  topicOption: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  topicText: { fontSize: 12 },
  submitButton: { height: 46, alignItems: 'center', justifyContent: 'center', borderRadius: 11, marginTop: 2 },
  submitText: { color: '#FFF', fontSize: 14 },
  chat: { margin: -16, minHeight: 520 },
  chatHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, padding: 16, borderBottomWidth: 1 },
  chatTitle: { fontSize: 15 },
  chatSubtitle: { fontSize: 11, marginTop: 3 },
  chatHeaderActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  processingBadge: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 },
  processingText: { color: '#047857', fontSize: 10 },
  messages: { maxHeight: 380 },
  messagesContent: { padding: 16, gap: 14 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  userMessageRow: { flexDirection: 'row-reverse' },
  chatAvatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  chatAvatarText: { fontSize: 9 },
  messageBody: { maxWidth: '78%' },
  userMessageBody: { alignItems: 'flex-end' },
  messageBubble: { paddingHorizontal: 13, paddingVertical: 10, borderRadius: 16 },
  messageText: { fontSize: 13, lineHeight: 19 },
  messageTime: { fontSize: 9, marginTop: 4, marginHorizontal: 3 },
  typingText: { fontSize: 18, lineHeight: 18, letterSpacing: 2 },
  chatInputBar: { borderTopWidth: 1, padding: 12 },
  chatInputRow: { flexDirection: 'row', gap: 8 },
  chatInput: { flex: 1, height: 42, paddingHorizontal: 13, borderWidth: 1, borderRadius: 11, fontSize: 13 },
  sendIconButton: { width: 42, height: 42, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  closedText: { textAlign: 'center', fontSize: 13, paddingVertical: 10 },
});