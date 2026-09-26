import React from 'react';
import { Award, Flame, Coffee, Compass } from 'lucide-react';

interface StorySectionProps {
  lang: 'ar' | 'en';
}

export const StorySection: React.FC<StorySectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="story" className="py-24 bg-[#09111b] border-b border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Story Text & Metrics */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest">
              <span className="w-6 h-0.5 bg-amber-500"></span>
              <span>{isAr ? 'قصتنا ومحمصتنا في دبي' : 'Our Dubai Roastery Heritage'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {isAr ? (
                <>
                  أكثر من 8 سنوات من الريادة <br />
                  <span className="text-amber-400">في عالم القهوة المختصة والمأكولات</span>
                </>
              ) : (
                <>
                  Over 8 Years of Excellence <br />
                  <span className="text-amber-400">in Specialty Coffee & Dining</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isAr
                ? 'انطلقت ROAST في قلب دبي عام 2018 برؤية حقيقية: تقديم تجربة قهوة استثنائية تبدأ من مزارع البن في بنما وكولومبيا وإثيوبيا وحتى الفنجان النهائي على طاولتك. في مركز التحميص والإنتاج المتطور بمجمع دبي للعلوم، يراقب خبراؤنا مسارات درجات الحرارة بدقة متناهية لضمان إبراز الإيحاءات الطبيعية الغنية.'
                : 'Founded in Dubai in 2018, ROAST was born with a single mission: delivering the purest farm-to-cup coffee experience. In our roastery facility at Dubai Science Park, certified Q-Graders roast micro-lots daily.'}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {isAr
                ? 'نجمع بين شغف القهوة الحديثة وكرم الضيافة الإماراتية الأصيلة، مع تشكيلة شاي الكرك الملكي بالزعفران، والمخبوزات الفرنسية الطازجة التي تُعد يومياً بأيدي أمهر الطهاة.'
                : 'We merge specialty third-wave coffee mastery with iconic Emirati hospitality, authentic saffron karak, and hand-baked artisanal pastries.'}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#101c2d] border border-white/5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  +9
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-semibold">
                  {isAr ? 'منافذ ومراكز بالإمارات' : 'UAE Outlets & Roasteries'}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#101c2d] border border-white/5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  2018
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-semibold">
                  {isAr ? 'سنة التأسيس في دبي' : 'Established Year'}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#101c2d] border border-white/5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  +100
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-semibold">
                  {isAr ? 'محصول قهوة مختار' : 'Curated Micro-Lots'}
                </div>
              </div>
            </div>

            {/* Quality Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">
                  {isAr ? 'تقييم كؤوس القهوة (Cupping Score) يفوق 88+' : 'SCA Cup Scores Exceeding 88+'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <Flame className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">
                  {isAr ? 'تحميص دفعات صغيرة يومياً (Micro-Roasting)' : 'Daily Fresh Micro-Roasting in Dubai'}
                </span>
              </div>
            </div>

          </div>

          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                  alt="Dubai Coffee Roasting"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09111b] via-transparent to-transparent" />
                
                <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-[#0e1927]/90 backdrop-blur-md border border-white/10 text-right">
                  <div className="text-xs font-bold text-amber-400">
                    {isAr ? 'مجمع دبي للعلوم — المقر الرئيسي' : 'Dubai Science Park Roastery'}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    {isAr ? 'أحدث أجهزة التحميص الذكية والمختبرات الحاصلة على شهادة SCA الدولية' : 'Precision Giesen roasting machinery & sensory lab'}
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
