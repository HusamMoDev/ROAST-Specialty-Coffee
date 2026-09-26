import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Check, Sparkles } from 'lucide-react';
import { UAE_BRANCHES, UAEBranch } from '../data/restaurantData';

interface BranchesSectionProps {
  onSelectPickupBranch: (branch: UAEBranch) => void;
  lang: 'ar' | 'en';
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  onSelectPickupBranch,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [selectedCity, setSelectedCity] = useState<'all' | 'dubai' | 'abudhabi'>('all');

  const filteredBranches = UAE_BRANCHES.filter((b) => {
    if (selectedCity === 'all') return true;
    if (selectedCity === 'dubai') return b.city.includes('دبي') || b.city.includes('Dubai');
    if (selectedCity === 'abudhabi') return b.city.includes('أبوظبي') || b.city.includes('Abu Dhabi');
    return true;
  });

  return (
    <section id="branches" className="py-20 bg-[#09101a] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            {isAr ? 'أين تجدنا في الإمارات' : 'Locations & Flagships'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? 'فروعنا ومراكز التحميص والإنتاج' : 'Dubai & UAE Outlets & Roasteries'}
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            {isAr
              ? 'تفضل بزيارتنا في فروعنا المصممة بأعلى معايير الضيافة العصرية أو اختر فرعك الأقرب للاستلام المباشر'
              : 'Visit our thoughtfully designed spaces across Dubai and Abu Dhabi or order for quick takeaway.'}
          </p>

          {/* City filter tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setSelectedCity('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === 'all'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'جميع الفروع (6)' : 'All Locations (6)'}
            </button>
            <button
              onClick={() => setSelectedCity('dubai')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === 'dubai'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'فروع دبي (5)' : 'Dubai Branches (5)'}
            </button>
            <button
              onClick={() => setSelectedCity('abudhabi')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === 'abudhabi'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'فرع أبوظبي (1)' : 'Abu Dhabi (1)'}
            </button>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-[#0f1b2b] rounded-2xl border border-white/10 hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-right"
            >
              <div>
                {/* Top Badge & City */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    {branch.city}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-black text-white mb-1.5">
                  {isAr ? branch.nameAr : branch.nameEn}
                </h3>

                {/* Address */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {isAr ? branch.addressAr : branch.addressEn}
                </p>

                {/* Timings & Contact */}
                <div className="space-y-2 text-xs text-slate-400 py-3 border-y border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{branch.timingAr}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span dir="ltr">{branch.phone}</span>
                  </div>
                </div>

                {/* Features chips */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {branch.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-slate-300 bg-white/5 px-2 py-0.5 rounded-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                <button
                  onClick={() => onSelectPickupBranch(branch)}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  {isAr ? 'طلب استلام من هنا' : 'Select for Pickup'}
                </button>
                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title={isAr ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
