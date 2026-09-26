import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

interface ReviewsSectionProps {
  lang: 'ar' | 'en';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="reviews" className="py-20 bg-[#0b1320] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            {isAr ? 'تجارب وآراء ضيوفنا' : 'Guest Impressions'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? 'ماذا يقول عشاق القهوة في دبي؟' : 'What Coffee Lovers in Dubai Say'}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-300">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white font-mono">4.8 / 5.0</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">
              {isAr ? 'أكثر من 3,840 تقييم معتمد عبر منصات جوجل ومواقع التقييم' : 'Over 3,840 verified reviews'}
            </span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#101b2a] rounded-2xl border border-white/10 p-6 flex flex-col justify-between text-right"
            >
              <div>
                {/* Rating stars & date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  "{isAr ? rev.commentAr : rev.commentEn}"
                </p>
              </div>

              {/* Author and Favorite item */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1">
                    <span>{isAr ? rev.authorAr : rev.authorEn}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-400">{rev.city}</div>
                </div>

                <div className="text-left">
                  <div className="text-[10px] text-slate-500">{isAr ? 'الطلب المفضل:' : 'Favorite:'}</div>
                  <div className="text-[11px] font-bold text-amber-400">{rev.favoriteItem}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
