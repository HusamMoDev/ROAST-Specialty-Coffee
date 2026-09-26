import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, CreditCard, Wallet, Banknote, MessageCircle } from 'lucide-react';
import { CartItem, CheckoutDetails, OrderMode } from '../types/cart';
import { RESTAURANT_INFO, UAE_BRANCHES, UAE_EMIRATES } from '../data/restaurantData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderMode: OrderMode;
  onConfirmOrder: (details: CheckoutDetails) => void;
  onWhatsAppOrder: (details: CheckoutDetails) => void;
  lang: 'ar' | 'en';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderMode,
  onConfirmOrder,
  onWhatsAppOrder,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('05');
  const [emirate, setEmirate] = useState(UAE_EMIRATES[0]);
  const [area, setArea] = useState('وسط مدينة دبي (Downtown)');
  const [streetAddress, setStreetAddress] = useState('');
  const [buildingOrVilla, setBuildingOrVilla] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(UAE_BRANCHES[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card' | 'cod'>('apple_pay');
  const [errorMsg, setErrorMsg] = useState('');

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
  const isFreeDelivery = orderMode === 'pickup' || subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = orderMode === 'pickup' ? 0 : (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee);
  const total = subtotal + deliveryFee;

  const getFormDetails = (): CheckoutDetails | null => {
    if (!customerName.trim()) {
      setErrorMsg(isAr ? 'يرجى إدخال اسم المستلم الكريم' : 'Please enter your full name');
      return null;
    }
    if (phone.trim().length < 9) {
      setErrorMsg(isAr ? 'يرجى إدخال رقم هاتف إماراتي صحيح للتواصل' : 'Please enter a valid UAE mobile number');
      return null;
    }
    if (orderMode === 'delivery' && !streetAddress.trim()) {
      setErrorMsg(isAr ? 'يرجى كتابة عنوان الشارع والمنطقة للتوصيل' : 'Please enter street address / area');
      return null;
    }
    setErrorMsg('');

    return {
      customerName: customerName.trim(),
      phone: phone.trim(),
      emirate,
      area,
      streetAddress: streetAddress.trim(),
      buildingOrVilla: buildingOrVilla.trim(),
      notes: notes.trim(),
      selectedBranchId,
      paymentMethod,
      orderMode,
    };
  };

  const handleWebSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = getFormDetails();
    if (details) {
      onConfirmOrder(details);
    }
  };

  const handleWhatsAppSubmit = () => {
    const details = getFormDetails();
    if (details) {
      onWhatsAppOrder(details);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0e1927] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-6 text-right"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-6 bg-[#09111b] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
              {isAr ? 'إتمام الطلب المباشر' : 'Direct Checkout'}
            </div>
            <h2 className="text-xl font-black text-white">
              {orderMode === 'delivery'
                ? (isAr ? 'بيانات التوصيل والدفع في الإمارات' : 'UAE Delivery & Payment')
                : (isAr ? 'تأكيد فرع الاستلام وبيانات الاتصال' : 'Branch Pickup Details')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleWebSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl font-bold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Customer Personal Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              {isAr ? '1. معلومات التواصل' : '1. Contact Information'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  {isAr ? 'الاسم الكريم *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isAr ? 'محمد المنصوري' : 'Mohammed Al Mansoori'}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  {isAr ? 'رقم الهاتف الإماراتي (+971) *' : 'UAE Mobile Number *'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="050 123 4567"
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500 text-left"
                    dir="ltr"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery or Pickup Specifics */}
          {orderMode === 'delivery' ? (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                {isAr ? '2. عنوان التوصيل في الإمارات' : '2. UAE Delivery Address'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'الإمارة:' : 'Emirate:'}
                  </label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {UAE_EMIRATES.map((em) => (
                      <option key={em} value={em}>
                        {em}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'المنطقة أو الحي:' : 'Area / Neighborhood:'}
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder={isAr ? 'الداون تاون، البرشاء، دبي مارينا...' : 'Downtown, Marina, Jumeirah...'}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'الشارع واسم البرج أو المجمع *' : 'Street & Tower/Villa *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder={isAr ? 'بوليفارد برج خليفة، برج 2' : 'Burj Khalifa Blvd, Tower 2'}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'رقم الشقة أو الفيلا:' : 'Apartment / Villa Number:'}
                  </label>
                  <input
                    type="text"
                    value={buildingOrVilla}
                    onChange={(e) => setBuildingOrVilla(e.target.value)}
                    placeholder={isAr ? 'شقة 1204' : 'Apt 1204'}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                {isAr ? '2. اختر فرع الاستلام في الإمارات' : '2. Select Pickup Branch'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {UAE_BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                      selectedBranchId === b.id
                        ? 'bg-amber-500/15 border-amber-500 text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{b.nameAr}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{b.addressAr}</div>
                    </div>
                    <div className="text-[10px] text-amber-400 font-mono mt-2">
                      ⏰ {b.timingAr}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              {isAr ? '3. طريقة الدفع' : '3. Payment Method'}
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-amber-500/20 border-amber-500 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Wallet className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold">Apple Pay</span>
                <span className="text-[10px] text-slate-400">{isAr ? 'نقرة واحدة' : 'Instant'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/20 border-amber-500 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-bold">بطاقة بنكية</span>
                <span className="text-[10px] text-slate-400">Visa / Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-500/20 border-amber-500 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold">{isAr ? 'عند الاستلام' : 'Cash on Delivery'}</span>
                <span className="text-[10px] text-slate-400">{isAr ? 'كاش أو بطاقة' : 'Card or Cash'}</span>
              </button>
            </div>
          </div>

          {/* Delivery Note */}
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">
              {isAr ? 'ملاحظات إضافية للتوصيل أو السائق:' : 'Additional Delivery Instructions:'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isAr ? 'مثال: يرجى وضع الطلب عند الباب أو رنين الجرس...' : 'Leave at doorstep, call upon arrival...'}
              className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-between shadow-xl shadow-amber-500/20 transition-all active:scale-95"
            >
              <span>{isAr ? 'تأكيد الطلب المباشر فوراً' : 'Confirm Order Now'}</span>
              <span className="font-mono text-base">{total} د.إ</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppSubmit}
              className="w-full py-3 px-6 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'تأكيد الطلب وإرساله إلى واتساب الفرع (+971 50 645 7762)' : 'Send to Branch WhatsApp (+971 50 645 7762)'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
