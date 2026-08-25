import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';

type ContactForm = {
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

function ContactCard({
  icon,
  label,
  value,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
  onPress?: () => void;
}) {
  const colors = useColors();
  const content = (
    <>
      <View style={[styles.infoIcon, { backgroundColor: colors.blueSoft }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.infoCopy}>
        <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>
          {label}
        </Text>
        <Text style={[styles.infoValue, { color: onPress ? colors.primary : colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>
          {value}
        </Text>
      </View>
      {onPress ? <Ionicons name="chevron-forward" size={17} color={colors.mutedForeground} /> : null}
    </>
  );

  return onPress ? (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      style={({ pressed }) => [
        styles.infoCard,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 },
      ]}
    >
      {content}
    </Pressable>
  ) : (
    <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {content}
    </View>
  );
}

function FieldLabel({ children, required = false }: { children: string; required?: boolean }) {
  const colors = useColors();
  return (
    <Text style={[styles.fieldLabel, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>
      {children}
      {required ? <Text style={{ color: colors.destructive }}> *</Text> : null}
    </Text>
  );
}

function ChatView({
  form,
  ticketId,
  onClose,
}: {
  form: ContactForm;
  ticketId: string;
  onClose: () => void;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: 'user', text: form.content || '(Không có nội dung)', time: nowStamp() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const initials = form.name.trim().split(' ').slice(-1)[0]?.slice(0, 2).toUpperCase() || 'DN';

  useEffect(() => {
    const timeout = setTimeout(() => {
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
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    return () => clearTimeout(timeout);
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
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

  return (
    <KeyboardAvoidingView style={styles.chatContainer} behavior="padding" keyboardVerticalOffset={0}>
      <View style={[styles.chatHeader, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.chatTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]} numberOfLines={1}>
            {form.topic || 'Yêu cầu hỗ trợ'}
          </Text>
          <Text style={[styles.chatSubtitle, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
            {form.name} · {ticketId}
          </Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: colors.orangeLight, borderColor: colors.accent }]}>
          <View style={[styles.statusDot, { backgroundColor: colors.accent }]} />
          <Text style={[styles.statusText, { color: colors.accent, fontFamily: 'BeVietnamPro_600SemiBold' }]}>Đang xử lý</Text>
        </View>
        <Pressable onPress={onClose} accessibilityLabel="Đóng yêu cầu" hitSlop={10} style={styles.closeButton}>
          <Ionicons name="close" size={22} color={colors.mutedForeground} />
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        style={[styles.messageList, { backgroundColor: colors.softBackground }]}
        contentContainerStyle={styles.messageContent}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        {messages.map(message =>
          message.from === 'user' ? (
            <View key={message.id} style={styles.messageRowUser}>
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={[styles.avatarText, { fontFamily: 'BeVietnamPro_700Bold' }]}>{initials}</Text>
              </View>
              <View style={styles.messageBubbleWrap}>
                <View style={[styles.userBubble, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.userMessage, { fontFamily: 'BeVietnamPro_400Regular' }]}>{message.text}</Text>
                </View>
                <Text style={[styles.messageTime, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular', textAlign: 'right' }]}>
                  {message.time}
                </Text>
              </View>
            </View>
          ) : (
            <View key={message.id} style={styles.messageRow}>
              <View style={[styles.avatar, { backgroundColor: colors.border }]}>
                <Text style={[styles.avatarText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>AD</Text>
              </View>
              <View style={styles.messageBubbleWrap}>
                <View style={[styles.adminBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.adminMessage, { color: colors.foreground, fontFamily: 'BeVietnamPro_400Regular' }]}>{message.text}</Text>
                </View>
                <Text style={[styles.messageTime, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
                  {message.time}
                </Text>
              </View>
            </View>
          ),
        )}
        {typing ? (
          <View style={styles.messageRow}>
            <View style={[styles.avatar, { backgroundColor: colors.border }]}>
              <Text style={[styles.avatarText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>AD</Text>
            </View>
            <View style={[styles.typingBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.typingText, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>Đang phản hồi...</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={[styles.composer, { backgroundColor: colors.card, borderTopColor: colors.border, paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={colors.mutedForeground}
          style={[styles.composerInput, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background, fontFamily: 'BeVietnamPro_400Regular' }]}
          returnKeyType="send"
          onSubmitEditing={send}
        />
        <Pressable
          onPress={send}
          disabled={!input.trim()}
          accessibilityLabel="Gửi tin nhắn"
          style={({ pressed }) => [styles.sendButton, { backgroundColor: colors.primary, opacity: !input.trim() || pressed ? 0.45 : 1 }]}
        >
          <Ionicons name="send" size={17} color={colors.primaryForeground} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function ContactScreen() {
  const colors = useColors();
  const { isLoggedIn, user } = useAuth();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<ContactForm>({
    name: user?.name ?? '',
    phone: user?.profile.phone ?? '',
    email: user?.email ?? '',
    topic: '',
    content: '',
  });
  const [topicOpen, setTopicOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  useEffect(() => {
    if (!isLoggedIn || !user) return;
    setForm(current => ({
      ...current,
      name: current.name || user.name,
      phone: current.phone || user.profile.phone,
      email: current.email || user.email,
    }));
  }, [isLoggedIn, user]);

  const updateForm = (key: keyof ContactForm, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const submit = () => {
    if (
      !form.name.trim() ||
      !form.content.trim() ||
      (!isLoggedIn && (!form.phone.trim() || !form.email.trim()))
    ) return;
    setTicketId(`TK-${String(ticketCounter++).padStart(3, '0')}`);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: '', phone: '', email: '', topic: '', content: '' });
    setTicketId('');
  };

  if (submitted) {
    return <ChatView form={form} ticketId={ticketId} onClose={reset} />;
  }

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: colors.softBackground }]}
      contentContainerStyle={{ paddingTop: topPad + 12, paddingBottom: Math.max(insets.bottom, 24) + 82 }}
      bottomOffset={24}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <View style={[styles.eyebrow, { backgroundColor: colors.orangeLight }]}>
          <Ionicons name="chatbubble-ellipses-outline" size={14} color={colors.accent} />
          <Text style={[styles.eyebrowText, { color: colors.accent, fontFamily: 'BeVietnamPro_700Bold' }]}>LIÊN HỆ</Text>
        </View>
        <Text style={[styles.pageTitle, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>Kênh hỗ trợ & liên hệ</Text>
        <Text style={[styles.pageDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
          Liên hệ với Sở Khoa học và Công nghệ Tỉnh Khánh Hòa để được hỗ trợ về hệ thống truy xuất nguồn gốc sản phẩm.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>Thông tin liên hệ</Text>
        <ContactCard
          icon="location-outline"
          label="Địa chỉ"
          value="1592 Nguyễn Ái Quốc, KP6, P.Trung Dũng, Biên Hoà, Khánh Hòa"
          color={colors.accent}
          onPress={() => Linking.openURL('https://maps.google.com/?q=1592+Nguyen+Ai+Quoc+Bien+Hoa+Dong+Nai')}
        />
        <ContactCard
          icon="call-outline"
          label="Điện thoại"
          value="0251.3822297"
          color={colors.primary}
          onPress={() => Linking.openURL('tel:02513822297')}
        />
        <ContactCard
          icon="mail-outline"
          label="Email"
          value="skhcn@khanhhoa.gov.vn"
          color={colors.primary}
          onPress={() => Linking.openURL('mailto:skhcn@khanhhoa.gov.vn')}
        />
        <ContactCard
          icon="time-outline"
          label="Giờ làm việc"
          value="Thứ 2 – Thứ 6: 7:30 – 11:30 & 13:30 – 17:00"
          color={colors.primary}
        />
        <Pressable
          onPress={() => Linking.openURL('https://khanhhoa.gov.vn')}
          style={({ pressed }) => [styles.portalLink, { opacity: pressed ? 0.65 : 1 }]}
        >
          <Ionicons name="open-outline" size={16} color={colors.primary} />
          <Text style={[styles.portalLinkText, { color: colors.primary, fontFamily: 'BeVietnamPro_600SemiBold' }]}>
            Cổng thông tin điện tử tỉnh Khánh Hòa
          </Text>
        </Pressable>
      </View>

      <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.formTitle, { color: colors.primary, fontFamily: 'BeVietnamPro_700Bold' }]}>Gửi yêu cầu hỗ trợ</Text>
        <Text style={[styles.formDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
          Điền thông tin bên dưới, bộ phận hỗ trợ sẽ phản hồi sớm nhất.
        </Text>
         <Text style={[styles.formDescription, { color: colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular', marginTop: -8 }]}>
           Vui lòng giữ liên lạc để được hỗ trợ sớm nhất
         </Text>

        <View style={styles.formField}>
          <FieldLabel required>HỌ VÀ TÊN</FieldLabel>
          <TextInput
            value={form.name}
            onChangeText={value => updateForm('name', value)}
            placeholder="Nguyễn Văn A"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background, fontFamily: 'BeVietnamPro_400Regular' }]}
          />
        </View>
        <View style={styles.formField}>
           <FieldLabel required={!isLoggedIn}>SỐ ĐIỆN THOẠI</FieldLabel>
          <TextInput
            value={form.phone}
            onChangeText={value => updateForm('phone', value)}
            placeholder="0912 345 678"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="phone-pad"
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background, fontFamily: 'BeVietnamPro_400Regular' }]}
          />
        </View>
        <View style={styles.formField}>
           <FieldLabel required={!isLoggedIn}>EMAIL</FieldLabel>
          <TextInput
            value={form.email}
            onChangeText={value => updateForm('email', value)}
            placeholder="email@example.com"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background, fontFamily: 'BeVietnamPro_400Regular' }]}
          />
        </View>
        <View style={styles.formField}>
          <FieldLabel>CHỦ ĐỀ</FieldLabel>
          <Pressable
            onPress={() => setTopicOpen(current => !current)}
            accessibilityRole="button"
            accessibilityLabel="Chọn chủ đề hỗ trợ"
            accessibilityState={{ expanded: topicOpen }}
            style={({ pressed }) => [
              styles.topicPicker,
              {
                borderColor: topicOpen ? colors.primary : colors.border,
                backgroundColor: colors.background,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={[styles.topicText, { color: form.topic ? colors.foreground : colors.mutedForeground, fontFamily: 'BeVietnamPro_400Regular' }]}>
              {form.topic || 'Chọn chủ đề...'}
            </Text>
            <Ionicons name={topicOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.mutedForeground} />
          </Pressable>
          {topicOpen ? (
            <View style={[styles.topicOptions, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {TOPICS.map(topic => (
                <Pressable
                  key={topic}
                  onPress={() => {
                    updateForm('topic', topic);
                    setTopicOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.topicOption,
                    {
                      backgroundColor: form.topic === topic ? colors.navyLight : colors.card,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.topicChipText, { color: form.topic === topic ? colors.primary : colors.foreground, fontFamily: form.topic === topic ? 'BeVietnamPro_600SemiBold' : 'BeVietnamPro_400Regular' }]}>
                    {topic}
                  </Text>
                  {form.topic === topic ? <Ionicons name="checkmark" size={17} color={colors.primary} /> : null}
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
        <View style={styles.formField}>
          <FieldLabel required>NỘI DUNG</FieldLabel>
          <TextInput
            value={form.content}
            onChangeText={value => updateForm('content', value)}
            placeholder="Mô tả chi tiết nội dung cần hỗ trợ..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            textAlignVertical="top"
            style={[styles.textArea, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background, fontFamily: 'BeVietnamPro_400Regular' }]}
          />
        </View>
        <Pressable
          onPress={submit}
           disabled={!form.name.trim() || !form.content.trim() || (!isLoggedIn && (!form.phone.trim() || !form.email.trim()))}
           style={({ pressed }) => [styles.submitButton, { backgroundColor: colors.primary, opacity: !form.name.trim() || !form.content.trim() || (!isLoggedIn && (!form.phone.trim() || !form.email.trim())) || pressed ? 0.5 : 1 }]}
        >
          <Text style={[styles.submitText, { color: colors.primaryForeground, fontFamily: 'BeVietnamPro_700Bold' }]}>Gửi yêu cầu</Text>
          <Ionicons name="send-outline" size={17} color={colors.primaryForeground} />
        </Pressable>
      </View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { paddingHorizontal: 20, paddingBottom: 20 },
  eyebrow: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 10 },
  eyebrowText: { fontSize: 10, letterSpacing: 0.8 },
  pageTitle: { fontSize: 28, lineHeight: 34, textTransform: 'uppercase' },
  pageDescription: { fontSize: 14, lineHeight: 21, marginTop: 10 },
  section: { paddingHorizontal: 20, marginBottom: 18 },
  sectionTitle: { fontSize: 17, marginBottom: 10 },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 15, borderWidth: 1, marginBottom: 10, minHeight: 76 },
  infoIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  infoCopy: { flex: 1 },
  infoLabel: { fontSize: 10, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 3 },
  infoValue: { fontSize: 13, lineHeight: 19 },
  portalLink: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 3, paddingVertical: 8 },
  portalLinkText: { fontSize: 13 },
  formCard: { marginHorizontal: 16, padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 18 },
  formTitle: { fontSize: 20 },
  formDescription: { fontSize: 13, lineHeight: 19, marginTop: 4, marginBottom: 18 },
  formField: { marginBottom: 15 },
  fieldLabel: { fontSize: 10, letterSpacing: 0.75, marginBottom: 6 },
  input: { height: 48, borderWidth: 1, borderRadius: 11, paddingHorizontal: 14, fontSize: 14 },
  textArea: { minHeight: 116, borderWidth: 1, borderRadius: 11, paddingHorizontal: 14, paddingTop: 13, fontSize: 14 },
  topicPicker: { minHeight: 48, borderWidth: 1, borderRadius: 11, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topicText: { fontSize: 14 },
  topicOptions: { marginTop: 7, borderRadius: 11, borderWidth: 1, overflow: 'hidden' },
  topicOption: { minHeight: 43, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E2E8F0' },
  topicChipText: { fontSize: 11 },
  submitButton: { height: 50, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 2 },
  submitText: { fontSize: 15 },
  chatContainer: { flex: 1 },
  chatHeader: { paddingTop: 58, paddingHorizontal: 16, paddingBottom: 13, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1 },
  chatTitle: { fontSize: 16 },
  chatSubtitle: { fontSize: 11, marginTop: 3 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, borderWidth: 1 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10 },
  closeButton: { padding: 4 },
  messageList: { flex: 1 },
  messageContent: { padding: 16, gap: 15, paddingBottom: 24 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  messageRowUser: { flexDirection: 'row-reverse', alignItems: 'flex-end', gap: 8 },
  avatar: { width: 29, height: 29, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 9 },
  messageBubbleWrap: { maxWidth: '78%' },
  userBubble: { paddingHorizontal: 13, paddingVertical: 10, borderRadius: 16, borderBottomRightRadius: 4 },
  adminBubble: { paddingHorizontal: 13, paddingVertical: 10, borderRadius: 16, borderBottomLeftRadius: 4, borderWidth: 1 },
  userMessage: { color: '#FFFFFF', fontSize: 14, lineHeight: 20 },
  adminMessage: { fontSize: 14, lineHeight: 20 },
  messageTime: { fontSize: 10, marginTop: 4, marginHorizontal: 3 },
  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 16, borderBottomLeftRadius: 4, borderWidth: 1 },
  typingText: { fontSize: 12 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingTop: 10, borderTopWidth: 1 },
  composerInput: { flex: 1, minHeight: 42, maxHeight: 90, borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10, fontSize: 14 },
  sendButton: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});