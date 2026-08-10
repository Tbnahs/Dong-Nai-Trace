import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, ExternalLink, Send, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ── helpers ──────────────────────────────────────────────────────────────────
function nowStamp() {
  return new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

let ticketCounter = 1001;
function nextTicketId() {
  return `TK-${String(ticketCounter++).padStart(3, "0")}`;
}

// ── types ─────────────────────────────────────────────────────────────────────
interface ChatMessage {
  id: number;
  from: "user" | "admin";
  text: string;
  time: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  topic: string;
  content: string;
}

// ── Chat view ─────────────────────────────────────────────────────────────────
function ChatView({
  form,
  ticketId,
  onClose,
}: {
  form: FormData;
  ticketId: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: "user",
      text: form.content || "(Không có nội dung)",
      time: nowStamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(true);
  const [closed, setClosed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate admin auto-reply
  useEffect(() => {
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now(),
          from: "admin",
          text: "Chúng tôi đã nhận được yêu cầu của bạn. Bộ phận kỹ thuật sẽ xem xét và phản hồi trong vòng 1 ngày làm việc.",
          time: nowStamp(),
        },
      ]);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const t = input.trim();
    if (!t || closed) return;
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "user", text: t, time: nowStamp() },
    ]);
    setInput("");
    // Echo admin after delay
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "admin",
          text: "Cảm ơn bạn đã phản hồi. Chúng tôi đang xử lý yêu cầu của bạn.",
          time: nowStamp(),
        },
      ]);
    }, 1800);
  };

  const initials = form.name
    .trim()
    .split(" ")
    .slice(-1)[0]
    ?.slice(0, 2)
    .toUpperCase() || "DN";

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-start justify-between px-5 sm:px-6 py-4 border-b border-gray-100 shrink-0">
        <div className="min-w-0">
          <p className="font-bold text-slate-800 leading-tight truncate">
            {form.topic || "Yêu cầu hỗ trợ"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {form.name}&nbsp;·&nbsp;{ticketId}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
              closed
                ? "bg-slate-100 text-slate-500"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            {closed ? "Đã đóng" : "Đang xử lý"}
          </span>
          <button
            onClick={() => { setClosed(true); onClose(); }}
            title="Đóng"
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4 bg-[#F8FAFC]">
        {messages.map((msg) =>
          msg.from === "user" ? (
            // Người dùng → bên PHẢI, bong bóng xanh
            (<div key={msg.id} className="flex items-end gap-2 flex-row-reverse">
              <div className="w-7 h-7 rounded-full bg-[#2740BA] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                {initials}
              </div>
              <div className="max-w-[70%]">
                <div className="bg-[#2740BA] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm shadow-sm">
                  {msg.text}
                </div>
                <p className="text-[10px] text-gray-400 mt-1 mr-1 text-right">{msg.time}</p>
              </div>
            </div>)
          ) : (
            // Admin → bên TRÁI, bong bóng xám
            (<div key={msg.id} className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                AD
              </div>
              <div className="max-w-[70%]">
                <div className="bg-white border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
                  {msg.text}
                </div>
                <p className="text-[10px] text-gray-400 mt-1 ml-1">{msg.time}</p>
              </div>
            </div>)
          )
        )}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0">
              AD
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#2740BA] rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-[#2740BA] rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-[#2740BA] rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-white shrink-0">
        {closed ? (
          <p className="text-center text-sm text-gray-400">Yêu cầu đã đóng</p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 h-10 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2740BA] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-[#2740BA] text-white flex items-center justify-center hover:bg-[#1f339e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const logoUrl = import.meta.env.BASE_URL + "images/logo-skhcn.png";
  const { isLoggedIn, user } = useAuth();

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: user?.profile.phone ?? "",
    email: user?.email ?? "",
    topic: "",
    content: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !user) return;
    setForm((current) => ({
      ...current,
      name: current.name || user.name,
      phone: current.phone || user.profile.phone,
      email: current.email || user.email,
    }));
  }, [isLoggedIn, user]);

  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.content.trim() ||
      (!isLoggedIn && (!form.phone.trim() || !form.email.trim()))
    ) return;
    setTicketId(nextTicketId());
    setSubmitted(true);
  };

  const inputCls =
    "w-full h-12 sm:h-11 px-4 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#2740BA] transition-colors";

  return (
    <div className="min-h-[70vh] bg-[#F5F7FA]">
      {/* Hero */}
      <div className="bg-[#2740BA] text-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">
            Liên hệ
          </p>
          <h1 className="text-3xl lg:text-4xl font-extrabold uppercase">
            Kênh Hỗ Trợ &amp; Liên Hệ
          </h1>
          <p className="mt-3 text-blue-100/80 max-w-xl">
            Liên hệ với Sở Khoa học và Công nghệ Thành phố Đồng Nai để được hỗ
            trợ về hệ thống truy xuất nguồn gốc sản phẩm.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact cards */}
          <div className="lg:col-span-1 space-y-5">
            {[
              {
                icon: MapPin,
                label: "Địa chỉ",
                value: "1592 Nguyễn Ái Quốc, KP6, P.Trung Dũng, Biên Hoà, Đồng Nai",
                color: "text-[#E8650A]",
                href: "https://maps.google.com/?q=1592+Nguy%E1%BB%85n+%C3%81i+Qu%E1%BB%91c+Bi%C3%AAn+Ho%C3%A0+%C4%90%E1%BB%93ng+Nai",
              },
              {
                icon: Phone,
                label: "Điện thoại",
                value: "0251.3822297",
                color: "text-[#2740BA]",
                href: "tel:02513822297",
              },
              {
                icon: Mail,
                label: "Email",
                value: "skhcn@dongnai.gov.vn",
                color: "text-[#2740BA]",
                href: "mailto:skhcn@dongnai.gov.vn",
              },
              {
                icon: Clock,
                label: "Giờ làm việc",
                value: "Thứ 2 – Thứ 6: 7:30 – 11:30 & 13:30 – 17:00",
                color: "text-[#2740BA]",
                href: null,
              },
            ].map(({ icon: Icon, label, value, color, href }) => {
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                      {label}
                    </p>
                    <p className={`text-sm font-medium leading-relaxed ${href ? "text-[#2740BA] hover:underline" : "text-slate-800"}`}>
                      {value}
                    </p>
                  </div>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start hover:shadow-md transition-shadow"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start">
                  {inner}
                </div>
              );
            })}

            <a
              href="https://dongnai.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#2740BA] font-semibold hover:underline mt-2"
            >
              <ExternalLink className="w-4 h-4" />
              Cổng thông tin điện tử tỉnh Đồng Nai
            </a>
          </div>

          {/* Form / Chat panel */}
          <div
            className={`lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${
              submitted ? "flex flex-col" : "p-5 sm:p-8"
            }`}
            style={{ minHeight: submitted ? 480 : undefined }}
          >
            {submitted ? (
              <ChatView
                form={form}
                ticketId={ticketId}
                onClose={() => {
                  setSubmitted(false);
                  setForm({ name: "", phone: "", email: "", topic: "", content: "" });
                }}
              />
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#2740BA] mb-6">
                  Gửi yêu cầu hỗ trợ
                </h2>
                <p className="text-sm text-gray-500 -mt-4 mb-6">
                  Vui lòng giữ liên lạc để được hỗ trợ sớm nhất
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        required
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Số điện thoại {!isLoggedIn && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="tel"
                        placeholder="0912 345 678"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        required={!isLoggedIn}
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email {!isLoggedIn && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      required={!isLoggedIn}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Chủ đề
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) => set("topic", e.target.value)}
                      className={`${inputCls} text-gray-700 bg-white`}
                    >
                      <option value="">Chọn chủ đề...</option>
                      <option>Hỗ trợ đăng ký doanh nghiệp</option>
                      <option>Hỗ trợ khai báo sản phẩm</option>
                      <option>Tra cứu mã truy xuất</option>
                      <option>Báo lỗi hệ thống</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Mô tả chi tiết nội dung cần hỗ trợ..."
                      value={form.content}
                      onChange={(e) => set("content", e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#2740BA] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-[#2740BA] text-white font-bold rounded-xl hover:bg-[#1f339e] transition-colors text-sm"
                  >
                    Gửi yêu cầu
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
