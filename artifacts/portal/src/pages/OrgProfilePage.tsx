import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Building2, MapPin, Phone, Mail, Edit2, CheckCircle2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OrgProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? 'HTX Nông nghiệp Xanh',
    type: 'Hợp tác xã',
    tax: '3601234567',
    industry: 'Nông sản & Rau củ',
    address: 'Xã Tân Triều, Vĩnh Cửu',
    district: 'Vĩnh Cửu',
    phone: '0251 890 123',
    email: user?.email ?? 'admin@htx.vn',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2740BA] ${editing ? 'border-gray-300 bg-white' : 'border-transparent bg-slate-50 text-gray-700'}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm">
            <ArrowLeft className="w-4 h-4" /> Trang chủ
          </Link>
          <span className="text-xs text-gray-400">Hồ sơ doanh nghiệp</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2740BA] flex items-center justify-center text-white font-extrabold text-lg">
              {form.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800">Hồ sơ doanh nghiệp</h1>
              <p className="text-sm text-gray-500">Quản lý thông tin tổ chức</p>
            </div>
          </div>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Đã lưu
            </span>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-bold text-gray-800">Thông tin tổ chức</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-sm font-semibold text-[#2740BA] hover:underline">
                <Edit2 className="w-4 h-4" /> Chỉnh sửa
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 border border-gray-300 px-3 py-1.5 rounded-lg">
                  <X className="w-3.5 h-3.5" /> Hủy
                </button>
                <button onClick={handleSave} className="flex items-center gap-1 text-sm text-white bg-[#2740BA] hover:bg-[#1f339e] px-3 py-1.5 rounded-lg font-semibold">
                  <Save className="w-3.5 h-3.5" /> Lưu
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Tên doanh nghiệp / tổ chức', key: 'name', span: true },
              { label: 'Loại hình', key: 'type' },
              { label: 'Mã số thuế', key: 'tax' },
              { label: 'Ngành nghề', key: 'industry' },
              { label: 'Địa chỉ', key: 'address' },
              { label: 'Huyện / Thị xã', key: 'district' },
              { label: 'Số điện thoại', key: 'phone' },
              { label: 'Email', key: 'email' },
            ].map(f => (
              <div key={f.key} className={f.span ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{f.label}</label>
                <input
                  type="text"
                  value={(form as any)[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  readOnly={!editing}
                  className={inputCls}
                />
              </div>
            ))}
          </div>

          {/* Cert status */}
          <div className="border-t border-slate-100 pt-5">
            <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Chứng nhận</h3>
            <div className="flex flex-wrap gap-2">
              {['VietGAP', 'OCOP 3★'].map(c => (
                <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
