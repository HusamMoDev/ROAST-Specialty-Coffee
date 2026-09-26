import React from 'react';
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook, MessageCircle, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-[#070d16] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-right">
          
          {/* Col 1: Brand story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm">
                R
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                ROAST <span className="text-amber-500 font-light">×</span> CHAI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'قهوة مختصة وشاي كرك أصيل ومأكولات طازجة — تجربة الضيافة اليومية الأولى في دبي منذ عام 2018 ولغاية اليوم. اطلب مباشرة بدون عمولات تطبيقات التوصيل.'
                : 'Specialty coffee, authentic karak chai, and artisan brunch in Dubai since 2018. Order directly for guaranteed freshness and 0% markup.'}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isAr ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'قائمة المشروبات والحلويات' : 'Menu & Specialty Coffee'}
                </a>
              </li>
              <li>
                <a href="#direct-order" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'مزايا الطلب المباشر والتوفير' : 'Direct Order Benefits'}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'قصة المحمصة وفريق الباريستا' : 'Our Dubai Roastery Heritage'}
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'فروع دبي وأبوظبي' : 'Dubai & Abu Dhabi Branches'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'تقييمات وتجارب العملاء' : 'Guest Reviews & Ratings'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Dubai Outlets Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isAr ? 'المقر الرئيسي بالإمارات' : 'Flagship Roastery'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>مجمع دبي للعلوم، بناية الأبحاث والمختبرات، البرشاء جنوب — دبي</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ساعات العمل: يومياً من 6:30 ص إلى 12:00 منتصف الليل</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                خدمة توصيل سريعة لكافة مناطق دبي، داون تاون، مارينا، ديرة، والبرشاء.
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Direct WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              {isAr ? 'تواصل وطلب مباشر' : 'Contact & WhatsApp'}
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`tel:${RESTAURANT_INFO.officialPhone}`}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors text-slate-300"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span dir="ltr">{RESTAURANT_INFO.officialPhone}</span>
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors text-slate-300"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>{RESTAURANT_INFO.email}</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  isAr ? 'مرحباً، أود التواصل مع خدمة عملاء ROAST دبي' : 'Hello ROAST Dubai team'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isAr ? 'تواصل عبر واتساب (+971)' : 'WhatsApp Service'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 ROAST Specialty Coffee Dubai — جميع الحقوق محفوظة
          </div>

          {/* User's Original Developer Credit Preserved */}
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span>تم تطوير وتحديث المنصة بواسطة المطور</span>
            <strong className="text-amber-400 font-bold">حسام محمد عبدالله</strong>
          </div>
        </div>

      </div>
    </footer>
  );
};
