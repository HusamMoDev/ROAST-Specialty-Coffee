import React from 'react';
import { ShieldCheck, Zap, CreditCard, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface DirectOrderBannerProps {
  onOpenMenu: () => void;
  lang: 'ar' | 'en';
}

export const DirectOrderBanner: React.FC<DirectOrderBannerProps> = ({
  onOpenMenu,
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <section id="direct-order" className="py-20 bg-[#0e1b2b] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'وفّر عمولات التوصيل 15% - 20%' : 'Save 15% - 20% on Aggregator Markups'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {isAr ? (
                <>
                  اطلب مباشرة من موقع ROAST الرسمي <br />
                  <span className="text-amber-400">بأعلى جودة وأفضل سعر في الإمارات</span>
                </>
              ) : (
                <>
                  Order Directly From Our Official Portal <br />
                  <span className="text-amber-400">Guaranteed Freshness & True Prices</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {isAr
                ? 'عندما تطلب قهوتك ومأكولاتك مباشرة من موقعنا بدلاً من تطبيقات التوصيل، فإنك تضمن وصول قهوتك ساخنة وطازجة بأسرع وقت عبر أسطول توصيلنا المباشر، وتستمتع بأسعار المنيو الأصلية دون أي زيادة أو رسوم مخفية.'
                : 'Ordering direct cuts the middleman. Enjoy pristine brew temperatures, faster dispatch, and zero hidden platform surcharges.'}
            </p>

            {/* Feature List */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                  🏷️
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {isAr ? 'أسعار المحمصة الأصلية 100% بدون عمولات إضافية' : '100% Original Roastery Prices — Zero Markup'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                  ⚡
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {isAr ? 'توصيل فوري سريع خلال 25-35 دقيقة لكافة مناطق دبي والإمارات' : 'Fast 25-35 Min Dispatch Across Dubai & UAE'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                  💳
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {isAr ? 'دفع مرن وسلس — Apple Pay، بطاقات بنكية، أو الدفع عند الاستلام' : 'Flexible Checkout: Apple Pay, Cards & Cash on Delivery'}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenMenu}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all active:scale-95"
              >
                <span>{isAr ? 'ابدأ طلبك المباشر الآن' : 'Start Direct Order Now'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  isAr ? 'مرحباً، أود الطلب المباشر من موقع ROAST الرسمي' : 'Hello, I want to place a direct order'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'طلب سريع عبر واتساب (+971 50 645 7762)' : 'Quick WhatsApp (+971 50 645 7762)'}</span>
              </a>
            </div>

          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                alt="Dubai Coffee Delivery Service"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b2b] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-[#0b1320]/90 backdrop-blur-md border border-white/10 text-right">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isAr ? 'تغليف حراري مخصص للحفاظ على البرودة والحرارة' : 'Insulated Packaging for Maximum Freshness'}</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {isAr ? 'أكواب مزدوجة العزل ومحافظة على رغوة الإسبريسو والنكهات حتى باب بيتك' : 'Ensuring the crema, temperature, and mouthfeel arrive in peak condition.'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
