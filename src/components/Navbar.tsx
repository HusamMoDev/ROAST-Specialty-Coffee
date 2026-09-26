import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Phone, MapPin, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = lang === 'ar';

  return (
    <>
      {/* UAE Luxury Top Ribbon */}
      <div className="bg-[#0e1b2b] text-slate-300 text-xs py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isAr ? 'المحمصة المركزية والمطعم في دبي مفتوحة الآن' : 'Dubai Central Roastery & Restaurant Open Now'}
            </span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-400">
              {isAr ? 'توصيل مباشر بدون عمولات تطبيقات التوصيل' : 'Direct delivery across UAE with 0% platform markups'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                isAr ? 'مرحباً، أود الاستفسار عن فروع ومنيو ROAST دبي' : 'Hello, I would like to inquire about ROAST Dubai menu'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{RESTAURANT_INFO.officialPhone}</span>
            </a>
            <button
              onClick={onToggleLang}
              className="text-[11px] font-semibold tracking-wider text-slate-300 hover:text-amber-400 px-1.5 py-0.5 rounded border border-white/10"
            >
              {isAr ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar - Top Bar Contract: Zone 1 (Brand) | Zone 2 (4-6 links) | Zone 3 (1-2 actions) */}
      <header className="sticky top-0 z-40 bg-[#0b1320]/95 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single element brand wordmark */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <div className="w-full h-full bg-[#0b1320] rounded-[10px] flex items-center justify-center text-amber-400 font-black text-lg">
                R
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                ROAST <span className="text-amber-500 font-light">×</span> CHAI
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400 -mt-1">
                DUBAI SPECIALTY COFFEE
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#menu" className="hover:text-amber-400 transition-colors">
              {isAr ? 'قائمة الطعام والقهوة' : 'Menu & Coffee'}
            </a>
            <a href="#direct-order" className="hover:text-amber-400 transition-colors">
              {isAr ? 'الطلب المباشر' : 'Direct Order'}
            </a>
            <a href="#story" className="hover:text-amber-400 transition-colors">
              {isAr ? 'محمصتنا وقصتنا' : 'Our Roastery'}
            </a>
            <a href="#branches" className="hover:text-amber-400 transition-colors">
              {isAr ? 'فروع الإمارات' : 'UAE Branches'}
            </a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">
              {isAr ? 'آراء الضيوف' : 'Guest Reviews'}
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3">
            {/* Table Reservation Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-amber-500/40 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'حجز طاولة' : 'Reserve Table'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span className="font-extrabold">{isAr ? 'سلة الطلب' : 'Cart'}</span>
              {cartCount > 0 && (
                <span className="bg-slate-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-mono font-bold tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Quick Order button */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                isAr
                  ? 'مرحباً، أود الطلب المباشر من مطعم ومحمصة ROAST دبي'
                  : 'Hello, I would like to place a direct order at ROAST Dubai'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
              title={isAr ? 'تواصل عبر واتساب مباشرة' : 'Direct WhatsApp Order'}
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e1b2b] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-amber-400"
            >
              {isAr ? 'قائمة الطعام والقهوة' : 'Menu & Coffee'}
            </a>
            <a
              href="#direct-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-amber-400"
            >
              {isAr ? 'الطلب المباشر (توفير العمولات)' : 'Direct Order (Save App Markups)'}
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-amber-400"
            >
              {isAr ? 'محمصتنا وقصتنا' : 'Our Roastery'}
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-amber-400"
            >
              {isAr ? 'فروع دبي والإمارات' : 'Dubai & UAE Branches'}
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-200 hover:text-amber-400"
            >
              {isAr ? 'آراء الضيوف' : 'Guest Reviews'}
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl"
              >
                <Calendar className="w-4 h-4" />
                <span>{isAr ? 'حجز طاولة في أي فرع' : 'Reserve a Table'}</span>
              </button>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  isAr ? 'مرحباً، أود الطلب المباشر عبر واتساب' : 'Hello, I want to order via WhatsApp'
                )}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'طلب سريع عبر واتساب (+971)' : 'Quick WhatsApp Order'}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
