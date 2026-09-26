import React, { useState } from 'react';
import { X, Plus, Minus, Check, Coffee, Sparkles } from 'lucide-react';
import { Product } from '../data/restaurantData';
import { CartCustomization, MilkOption, SweetnessOption, TempOption, BeanGrindOption } from '../types/cart';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, customization?: CartCustomization, finalPrice?: number) => void;
  lang: 'ar' | 'en';
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!product) return null;

  const isAr = lang === 'ar';
  const isCoffeeBeverage = product.category === 'specialty_coffee' || product.category === 'espresso_latte' || product.category === 'chai_karak';
  const isBeans = product.category === 'retail_beans';

  const [quantity, setQuantity] = useState(1);
  const [milk, setMilk] = useState<MilkOption>('fresh_dairy');
  const [sweetness, setSweetness] = useState<SweetnessOption>('regular');
  const [temp, setTemp] = useState<TempOption>(product.id.includes('iced') ? 'iced' : 'hot');
  const [extraShot, setExtraShot] = useState(false);
  const [beanGrind, setBeanGrind] = useState<BeanGrindOption>('whole_beans');
  const [notes, setNotes] = useState('');

  // Calculate dynamic price
  const milkExtraCost = (milk === 'oat' || milk === 'almond' || milk === 'coconut') ? 4 : 0;
  const extraShotCost = extraShot ? 5 : 0;
  const singleItemPrice = product.price + (isCoffeeBeverage ? milkExtraCost + extraShotCost : 0);
  const totalItemPrice = singleItemPrice * quantity;

  const handleAdd = () => {
    const custom: CartCustomization = {
      milk: isCoffeeBeverage ? milk : undefined,
      sweetness: isCoffeeBeverage ? sweetness : undefined,
      temp: isCoffeeBeverage ? temp : undefined,
      extraShot: isCoffeeBeverage ? extraShot : undefined,
      beanGrind: isBeans ? beanGrind : undefined,
      notes: notes.trim() || undefined,
    };
    onAddToCart(product, quantity, custom, singleItemPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#0f1a28] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 text-right"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 text-slate-400 hover:text-white bg-black/50 backdrop-blur-md rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 bg-slate-950 overflow-hidden">
          <img
            src={product.image}
            alt={product.nameAr}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28] via-transparent to-black/30" />
          
          <div className="absolute bottom-4 right-6 left-6">
            {product.origin && (
              <span className="text-xs font-semibold text-amber-400 bg-black/60 px-2.5 py-1 rounded-md mb-2 inline-block">
                📍 {product.origin}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {isAr ? product.nameAr : product.nameEn}
            </h2>
            <div className="text-amber-400 font-black text-lg font-mono mt-1">
              {singleItemPrice} د.إ
            </div>
          </div>
        </div>

        {/* Modal Body & Customization options */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr ? product.descAr : product.descEn}
          </p>

          {/* Beverage Customizations */}
          {isCoffeeBeverage && (
            <>
              {/* Temperature / Serving */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  {isAr ? 'درجة الحرارة وطريقة التقديم:' : 'Temperature / Serving:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTemp('hot')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      temp === 'hot'
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    🔥 {isAr ? 'ساخن (استخلاص طازج)' : 'Hot'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemp('iced')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      temp === 'iced'
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    🧊 {isAr ? 'بارد ومثلج (Iced)' : 'Iced'}
                  </button>
                </div>
              </div>

              {/* Milk Option */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>{isAr ? 'نوع الحليب المفضل:' : 'Milk Preference:'}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{isAr ? 'بدائل الحليب النباتية متاحة' : 'Plant-based options available'}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'fresh_dairy', labelAr: 'حليب كامل الدسم', price: '+0' },
                    { id: 'skimmed', labelAr: 'حليب قليل الدسم', price: '+0' },
                    { id: 'oat', labelAr: 'حليب شوفان عضوي', price: '+4 د.إ' },
                    { id: 'almond', labelAr: 'حليب لوز محمص', price: '+4 د.إ' },
                    { id: 'coconut', labelAr: 'حليب جوز الهند', price: '+4 د.إ' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilk(m.id as MilkOption)}
                      className={`p-2.5 rounded-xl text-right text-xs font-semibold border transition-all flex flex-col justify-between ${
                        milk === m.id
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span>{m.labelAr}</span>
                      <span className="text-[10px] text-slate-400 font-mono mt-1">{m.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  {isAr ? 'مستوى الحلاوة / السكر:' : 'Sweetness Level:'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'none', label: isAr ? 'بدون سكر' : '0%' },
                    { id: 'low', label: isAr ? 'خفيف (50%)' : '50%' },
                    { id: 'regular', label: isAr ? 'عادي (موزون)' : '100%' },
                    { id: 'extra', label: isAr ? 'حلو زيادة' : 'Extra' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSweetness(s.id as SweetnessOption)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                        sweetness === s.id
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Espresso Shot */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer" onClick={() => setExtraShot(!extraShot)}>
                <div>
                  <div className="text-xs font-bold text-white">
                    {isAr ? 'إضافة شوت إسبريسو مركز إضافي (+5 د.إ)' : 'Add Extra Espresso Shot (+5 AED)'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isAr ? 'استخلاص طازج لتركيز ونكهة أعلى' : 'Fresh extraction for extra caffeine boost'}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${extraShot ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-500'}`}>
                  {extraShot && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </>
          )}

          {/* Whole Bean Grind Selection */}
          {isBeans && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                {isAr ? 'درجة طحن البن المطلوبة:' : 'Grind Preference:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'whole_beans', label: 'حبوب كاملة (بدون طحن)' },
                  { id: 'v60_filter', label: 'طحن ترشيح V60 / كيمكس' },
                  { id: 'espresso', label: 'طحن ماكينة إسبريسو' },
                  { id: 'french_press', label: 'طحن خشن فرنش بريس' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setBeanGrind(g.id as BeanGrindOption)}
                    className={`p-2.5 text-right rounded-xl text-xs font-semibold border transition-all ${
                      beanGrind === g.id
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes for barista */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">
              {isAr ? 'ملاحظات خاصة للباريستا أو المطبخ:' : 'Special Instructions for Barista:'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isAr ? 'مثال: رغوة زيادة، ثلج قليل، بدون غطاء بلاستيك...' : 'E.g., extra foam, light ice...'}
              className="w-full bg-[#142233] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#0c1622] border-t border-white/10 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-slate-400 hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-sm text-white w-5 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-between shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <span>{isAr ? 'إضافة إلى طلبك' : 'Add to Order'}</span>
            <span className="font-mono text-base font-extrabold">{totalItemPrice} د.إ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
