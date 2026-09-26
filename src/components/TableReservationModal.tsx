import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { UAE_BRANCHES, RESTAURANT_INFO } from '../data/restaurantData';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const [branchId, setBranchId] = useState(UAE_BRANCHES[1].id); // Downtown default
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('05');
  const [guestCount, setGuestCount] = useState(2);
  const [date, setDate] = useState('2026-09-27');
  const [timeSlot, setTimeSlot] = useState('18:00');
  const [seatingZone, setSeatingZone] = useState<'indoor' | 'terrace' | 'vip_lounge'>('terrace');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedBranch = UAE_BRANCHES.find((b) => b.id === branchId) || UAE_BRANCHES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || phone.length < 9) {
      return;
    }
    setIsSuccess(true);
  };

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً، أود تأكيد حجز طاولة في ROAST فرع (${selectedBranch.nameAr}) باسم: ${customerName}، لعدد: ${guestCount} أشخاص، بتاريخ: ${date}، الساعة: ${timeSlot}.`
      : `Hello, I'd like to confirm a table booking at ROAST (${selectedBranch.nameEn}) for ${customerName}, ${guestCount} guests, on ${date} at ${timeSlot}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#0e1927] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-6 text-right"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">
              {isAr ? 'تم تسجيل طلب حجز طاولتك بنجاح!' : 'Table Reservation Received!'}
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              {isAr ? (
                <>
                  يسعدنا استقبالكم في <span className="text-amber-400 font-bold">{selectedBranch.nameAr}</span> يوم{' '}
                  <span className="text-white font-bold">{date}</span> الساعة{' '}
                  <span className="text-white font-bold">{timeSlot}</span> لعدد{' '}
                  <span className="text-white font-bold">{guestCount} ضيوف</span>.
                </>
              ) : (
                <>
                  We look forward to hosting you at {selectedBranch.nameEn} on {date} at {timeSlot} for {guestCount} guests.
                </>
              )}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'تأكيد الحجز فوراً عبر واتساب' : 'Confirm via WhatsApp'}</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/10 text-slate-200 text-xs font-bold hover:bg-white/15"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 bg-[#09111b] border-b border-white/10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'ضيافة القهوة والمطعم الفاخر في دبي' : 'Dubai Specialty Hospitality'}</span>
              </div>
              <h2 className="text-xl font-black text-white">
                {isAr ? 'حجز طاولة في فروع ROAST بالإمارات' : 'Reserve a Table at ROAST UAE'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              {/* Branch Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  {isAr ? 'اختر الفرع *' : 'Select Branch *'}
                </label>
                <select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {UAE_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nameAr} ({b.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'تاريخ الحجز *' : 'Reservation Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'وقت الزيارة *' : 'Time Slot *'}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="08:30">08:30 ص - فطور الصباح</option>
                    <option value="10:30">10:30 ص - برانش الصباح</option>
                    <option value="13:00">01:00 م - استراحة الغداء والقهوة</option>
                    <option value="16:30">04:30 م - قهوة العصر والحلويات</option>
                    <option value="19:00">07:00 م - أمسيات القهوة</option>
                    <option value="21:30">09:30 م - جلسات المساء</option>
                  </select>
                </div>
              </div>

              {/* Guest Count & Seating Zone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'عدد الضيوف:' : 'Guest Count:'}
                  </label>
                  <div className="flex items-center gap-2 bg-[#132235] border border-white/10 rounded-xl px-3 py-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="bg-transparent text-white text-xs w-full focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                        <option key={n} value={n} className="bg-[#132235] text-white">
                          {n} {n === 1 ? 'ضيف واحد' : n === 2 ? 'ضيفان' : `${n} ضيوف`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'منطقة الجلوس المفضلة:' : 'Seating Preference:'}
                  </label>
                  <select
                    value={seatingZone}
                    onChange={(e) => setSeatingZone(e.target.value as any)}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="terrace">{isAr ? 'التراس الخارجي المفتوح' : 'Outdoor Terrace'}</option>
                    <option value="indoor">{isAr ? 'الصالة الداخلية الهادئة' : 'Indoor Lounge'}</option>
                    <option value="vip_lounge">{isAr ? 'ركن المحمصة والتذوق VIP' : 'Roastery Bar VIP'}</option>
                  </select>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'الاسم الكريم *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isAr ? 'محمد النعيمي' : 'Mohammed Al Nuaimi'}
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    {isAr ? 'رقم الهاتف الإماراتي *' : 'UAE Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="050 123 4567"
                    className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5">
                  {isAr ? 'مناسبة خاصة أو رغبات محددة:' : 'Special Occasion or Notes:'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? 'احتفال عيد ميلاد، لقاء عمل، طاولة قرب النافذة...' : 'Birthday celebration, business meeting...'}
                  className="w-full bg-[#132235] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-95"
                >
                  {isAr ? 'تأكيد طلب حجز الطاولة مجاناً' : 'Confirm Table Reservation (Free)'}
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
