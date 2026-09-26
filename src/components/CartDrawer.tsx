import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Check, MessageSquare } from 'lucide-react';
import { CartItem, OrderMode } from '../types/cart';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderMode: OrderMode;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onOrderDirectWhatsApp: () => void;
  lang: 'ar' | 'en';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  orderMode,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOrderDirectWhatsApp,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
  const isFreeDelivery = orderMode === 'pickup' || subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = orderMode === 'pickup' ? 0 : (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const applyCoupon = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'DUBAI10' || code === 'ROAST10' || code === 'EMIRATES') {
      setDiscountPercent(10);
      setPromoSuccess(isAr ? 'تم تطبيق خصم 10% على طلبك المباشر!' : '10% Direct Order Discount applied!');
    } else {
      setPromoError(isAr ? 'كود الخصم غير صالح. جرب كود DUBAI10' : 'Invalid coupon code. Try DUBAI10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10 text-right"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="w-screen max-w-md bg-[#0e1927] border-r border-white/10 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0b1320]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-black text-white">
                {isAr ? 'سلة طلبك المباشر' : 'Your Order Bag'}
              </h2>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {items.length} {isAr ? 'أصناف' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Direct order savings banner */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 flex items-center justify-between text-xs">
            <span className="text-amber-300 font-bold">
              {isAr ? '✨ طلبك مباشر بدون عمولات تطبيقات التوصيل' : '✨ 0% markup direct roastery order'}
            </span>
            <span className="text-emerald-400 font-bold font-mono">توفير 15-20%</span>
          </div>

          {/* Delivery threshold bar (if delivery) */}
          {orderMode === 'delivery' && (
            <div className="bg-[#132235] px-4 py-2 text-[11px] border-b border-white/5">
              {subtotal >= RESTAURANT_INFO.freeDeliveryThreshold ? (
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مبروك! طلبك مؤهل للتوصيل المجاني إلى أي مكان بدبي' : 'Congrats! Free delivery unlocked across Dubai'}</span>
                </div>
              ) : (
                <div className="text-slate-300">
                  {isAr ? (
                    <>
                      أضف منتجات بقيمة{' '}
                      <span className="text-amber-400 font-bold font-mono">
                        {RESTAURANT_INFO.freeDeliveryThreshold - subtotal} د.إ
                      </span>{' '}
                      للحصول على توصيل مجاني!
                    </>
                  ) : (
                    <>
                      Add <span className="text-amber-400 font-bold font-mono">{RESTAURANT_INFO.freeDeliveryThreshold - subtotal} AED</span> more for free delivery!
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-3" />
                <div className="text-base font-bold text-white mb-1">
                  {isAr ? 'سلة الطلب فارغة حتى الآن' : 'Your cart is empty'}
                </div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
                  {isAr
                    ? 'اختر من قهوة V60 المختصة، السبانش لاتيه، أو حلويات الفستق الطازجة لإضافتها لطلبك'
                    : 'Add freshly extracted Geisha coffee, iced lattes, or pastries to get started.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow"
                >
                  {isAr ? 'تصفح المنيو الآن' : 'Browse Menu'}
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="bg-[#122032] border border-white/5 rounded-2xl p-3.5 flex gap-3 items-start"
                >
                  <img
                    src={cartItem.product.image}
                    alt={cartItem.product.nameAr}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white truncate">
                        {isAr ? cartItem.product.nameAr : cartItem.product.nameEn}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(cartItem.id)}
                        className="text-slate-500 hover:text-rose-400 p-0.5"
                        title={isAr ? 'حذف من السلة' : 'Remove'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization specifics */}
                    {cartItem.customization && (
                      <div className="text-[11px] text-slate-400 mt-1 space-y-0.5">
                        {cartItem.customization.temp && (
                          <span>{cartItem.customization.temp === 'iced' ? '❄️ بارد' : '🔥 ساخن'} · </span>
                        )}
                        {cartItem.customization.milk && (
                          <span>حليب: {cartItem.customization.milk} · </span>
                        )}
                        {cartItem.customization.sweetness && (
                          <span>حلاوة: {cartItem.customization.sweetness} · </span>
                        )}
                        {cartItem.customization.extraShot && <span>شوت إضافي · </span>}
                        {cartItem.customization.beanGrind && <span>طحن: {cartItem.customization.beanGrind}</span>}
                      </div>
                    )}

                    {/* Price and Quantity Stepper */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-amber-400 font-mono font-black text-sm">
                        {cartItem.itemPrice * cartItem.quantity} د.إ
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                          className="text-slate-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                          className="text-slate-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#0b1320] border-t border-white/10 space-y-4">
              
              {/* Promo code input */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={isAr ? 'كود الخصم (جرب DUBAI10)' : 'Promo code (try DUBAI10)'}
                    className="flex-1 bg-[#132235] border border-white/10 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2 uppercase tracking-wider focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-2 bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold rounded-xl transition-colors"
                  >
                    {isAr ? 'تطبيق' : 'Apply'}
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-400 font-bold">{promoSuccess}</p>}
              </div>

              {/* Summary line items */}
              <div className="space-y-1.5 text-xs text-slate-400 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="font-mono text-white">{subtotal} د.إ</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>{isAr ? 'خصم الطلب المباشر (10%):' : 'Direct Order Discount (10%):'}</span>
                    <span className="font-mono">-{discountAmount} د.إ</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{isAr ? 'رسوم التوصيل:' : 'Delivery Fee:'}</span>
                  <span className="font-mono text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">{isAr ? 'مجاني' : 'FREE'}</span>
                    ) : (
                      `${deliveryFee} د.إ`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                  <span>{isAr ? 'المجموع الإجمالي:' : 'Total Amount:'}</span>
                  <span className="font-mono text-amber-400 text-base">{total} د.إ</span>
                </div>
              </div>

              {/* Direct WhatsApp Order CTA + Web Checkout CTA */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl flex items-center justify-between shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <span>{isAr ? 'متابعة الدفع وتأكيد العنوان' : 'Proceed to Checkout'}</span>
                  <span className="font-mono">{total} د.إ</span>
                </button>

                <button
                  onClick={onOrderDirectWhatsApp}
                  className="w-full py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'إرسال الطلب فوراً عبر واتساب المحمصة' : 'Send Order to WhatsApp Directly'}</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
