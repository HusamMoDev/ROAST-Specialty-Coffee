import React from 'react';
import { Truck, Store, UtensilsCrossed, Star, Clock, ShieldCheck, ArrowDown, Sparkles } from 'lucide-react';
import { OrderMode } from '../types/cart';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  orderMode: OrderMode;
  onSelectOrderMode: (mode: OrderMode) => void;
  onOpenReservation: () => void;
  lang: 'ar' | 'en';
}

export const Hero: React.FC<HeroProps> = ({
  orderMode,
  onSelectOrderMode,
  onOpenReservation,
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-[#09101b] border-b border-white/10 pt-8 pb-16 lg:py-24">
      {/* Background ambient glow & subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(217,119,6,0.18),rgba(11,19,32,0))]" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 opacity-80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Direct order trust indicator without pill cliches */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isAr
                  ? 'منذ 2018 — المحمصة والمطعم الرائد للقهوة المختصة في دبي والإمارات'
                  : 'Since 2018 — Dubai’s Premier Specialty Coffee & Roastery Flagship'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
              {isAr ? (
                <>
                  القهوة المختصة والمأكولات <br />
                  <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                    التي يعشقها الجميع في دبي
                  </span>
                </>
              ) : (
                <>
                  Dubai’s Iconic <br />
                  <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                    Specialty Coffee & Roastery
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {isAr
                ? 'اطلب مباشرة من منصتنا الرسمية بدون عمولات تطبيقات التوصيل. حبوب بن مختصة منتقاة من بنما وإثيوبيا، محمصة طازجاً في مجمع دبي للعلوم مع أشهى أطباق البرانش والمخبوزات الفرنسية الفاخرة.'
                : 'Order directly from our official platform to avoid 15-20% third-party aggregator markups. Freshly roasted in Dubai Science Park with artisanal brunch and Basque desserts.'}
            </p>

            {/* Interactive Order Mode Selector */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 mb-2.5">
                {isAr ? 'اختر طريقة استلام طلبك في الإمارات:' : 'Choose your fulfillment preference:'}
              </div>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#101b2a] rounded-2xl border border-white/10 max-w-md">
                <button
                  onClick={() => onSelectOrderMode('delivery')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    orderMode === 'delivery'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>{isAr ? 'توصيل مباشر' : 'Delivery'}</span>
                </button>

                <button
                  onClick={() => onSelectOrderMode('pickup')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    orderMode === 'pickup'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>{isAr ? 'استلام فرع' : 'Takeaway'}</span>
                </button>

                <button
                  onClick={() => {
                    onSelectOrderMode('dine_in');
                    onOpenReservation();
                  }}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    orderMode === 'dine_in'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>{isAr ? 'حجز طاولة' : 'Dine-In'}</span>
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-transform active:scale-95"
              >
                <span>{isAr ? 'تصفح المنيو واطلب الآن' : 'Explore Menu & Order'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  isAr ? 'مرحباً، أود الطلب المباشر عبر واتساب لمطعم ومحمصة ROAST دبي' : 'Hello, I want to order directly via WhatsApp'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-sm transition-all"
              >
                <span>{isAr ? 'طلب عبر واتساب مباشر 💬' : 'WhatsApp Order 💬'}</span>
              </a>
            </div>

            {/* Proof & Trust Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">4.8 / 5.0</span>
                <span>(3,840+ تقييم معتمد)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>توصيل طازج وسريع خلال 25-35 دقيقة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>ضمان الجودة والاستخلاص الذهبي</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative luxury backdrop glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-3xl blur-xl" />

              <div className="relative bg-[#101b2a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Image showcase */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                    alt="Dubai Specialty Coffee Bar"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101b2a] via-transparent to-black/30" />
                  
                  {/* Floating feature badge */}
                  <div className="absolute top-4 right-4 bg-[#0b1320]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-400 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>تحميص دبي الطازج اليوم</span>
                  </div>

                  <div className="absolute bottom-4 right-4 left-4">
                    <div className="text-white font-black text-lg">
                      محصول قيشا بنما & سبانش لاتيه بارد
                    </div>
                    <div className="text-xs text-slate-300">
                      استخلاص يدوي بمقاييس دقيقة من باريستا محترفين في دبي
                    </div>
                  </div>
                </div>

                {/* Direct Ordering Benefits Box inside card */}
                <div className="p-5 space-y-3 bg-[#0c1624]">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2.5">
                    <span className="font-semibold text-slate-200">مقارنة التكلفة والطلب:</span>
                    <span className="text-emerald-400 font-bold">توفير مضمون</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-right">
                      <div className="text-slate-400 text-[11px]">تطبيقات التوصيل</div>
                      <div className="text-rose-400 font-bold line-through mt-0.5">38 د.إ + 18 د.إ رسوم</div>
                      <div className="text-[10px] text-slate-500 mt-1">عمولات تصل 20%</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-right">
                      <div className="text-amber-400 text-[11px] font-bold">الطلب المباشر من موقعنا</div>
                      <div className="text-emerald-400 font-black text-sm mt-0.5">34 د.إ فقط</div>
                      <div className="text-[10px] text-emerald-300 mt-1">0% عمولات + نقاط حصرية</div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>📍 تغطية لكافة مناطق دبي وأبوظبي والشارقة</span>
                    <span className="text-amber-400 font-bold">توصيل خلال 30 دقيقة</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
