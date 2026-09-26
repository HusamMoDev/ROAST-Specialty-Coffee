import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, SlidersHorizontal, Flame, Coffee } from 'lucide-react';
import { Product, MENU_CATEGORIES, PRODUCTS } from '../data/restaurantData';

interface MenuSectionProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  lang: 'ar' | 'en';
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectProduct,
  onQuickAdd,
  lang,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isAr = lang === 'ar';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.nameAr.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.descAr.toLowerCase().includes(query) ||
        item.descEn.toLowerCase().includes(query) ||
        (item.origin && item.origin.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#0b1320] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            {isAr ? 'قائمة الطعام والمشروبات المختصة' : 'Curated Menu & Beverages'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isAr ? 'مختارات طازجة من محمصة ومطبخ دبي' : 'Fresh Creations from Dubai Roastery & Kitchen'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {isAr
              ? 'تذوق أندر محاصيل القهوة المختصة والمشروبات المبتكرة والمخبوزات المجهزة يومياً بكل شغف'
              : 'Savor rare micro-lot specialty beans, artisan breakfast sourdoughs, and freshly baked Basque desserts.'}
          </p>
        </div>

        {/* Search Bar & Category Navigation */}
        <div className="space-y-6 mb-12">
          {/* Search box */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن قهوتك، الحلى، أو وجبتك المفضلة...' : 'Search coffee, sweets, or breakfast dishes...'}
              className="w-full bg-[#101c2c] border border-white/10 text-white placeholder-slate-500 text-sm rounded-2xl py-3 pr-11 pl-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-right"
              dir={isAr ? 'rtl' : 'ltr'}
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-3 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-white/5"
              >
                مسح
              </button>
            )}
          </div>

          {/* Clean Segmented Filter Tabs (Zero-pill discipline: quiet functional buttons) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap rounded-xl transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-[#101b2a] text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {isAr ? cat.nameAr : cat.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#101b2a] rounded-3xl border border-white/5 p-8">
            <Coffee className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <div className="text-lg font-bold text-white mb-1">
              {isAr ? 'لا توجد نتائج تطابق بحثك' : 'No matching items found'}
            </div>
            <p className="text-xs text-slate-400 mb-4">
              {isAr ? 'جرب البحث بكلمات أخرى مثل "V60", "فستق", "كرك"' : 'Try searching with other keywords like "V60", "pistachio", "karak"'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-xl hover:bg-amber-500/20 transition-colors"
            >
              {isAr ? 'عرض كامل القائمة' : 'Show All Items'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="group bg-[#101b2a] rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                >
                  {/* Lead with Imagery */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative h-48 sm:h-52 overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b2a] via-transparent to-black/20" />

                    {/* Subtle text badge */}
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-[#0b1320]/85 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-400">
                        {product.badge}
                      </div>
                    )}

                    {product.prepTime && (
                      <div className="absolute bottom-3 left-3 bg-[#0b1320]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                        ⏱️ {product.prepTime}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex flex-col flex-1 text-right">
                    
                    {/* Origin / Subtitle */}
                    {product.origin && (
                      <div className="text-[11px] text-amber-500/90 font-medium mb-1 truncate">
                        {product.origin}
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {isAr ? product.nameAr : product.nameEn}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">
                      {isAr ? product.descAr : product.descEn}
                    </p>

                    {/* Bottom action zone: Price & Buttons */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-black text-amber-400 font-mono tabular-nums">
                          {product.price} <span className="text-xs font-bold text-slate-300">د.إ</span>
                        </div>
                        {product.calories && (
                          <div className="text-[10px] text-slate-500 font-mono">
                            {product.calories} سعرة
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {product.isCustomizable ? (
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="px-3 py-2 text-xs font-bold text-slate-300 bg-white/5 hover:bg-amber-500 hover:text-slate-950 rounded-xl transition-all border border-white/10"
                          >
                            {isAr ? 'تخصيص' : 'Customize'}
                          </button>
                        ) : null}

                        <button
                          onClick={() => onQuickAdd(product)}
                          className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-transform active:scale-95 flex items-center gap-1 shadow-md shadow-amber-500/20"
                          title={isAr ? 'إضافة سريعة للسلة' : 'Quick add to cart'}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isAr ? 'إضافة' : 'Add'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
