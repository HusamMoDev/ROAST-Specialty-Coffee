import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageSquare, ArrowRight, Sparkles, Coffee } from 'lucide-react';
import { ConfirmedOrder } from '../types/cart';
import { RESTAURANT_INFO, UAE_BRANCHES } from '../data/restaurantData';

interface OrderSuccessModalProps {
  order: ConfirmedOrder | null;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  lang,
}) => {
  if (!order) return null;

  const isAr = lang === 'ar';
  const branch = UAE_BRANCHES.find((b) => b.id === order.checkoutDetails.selectedBranchId) || UAE_BRANCHES[0];

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً فريق ROAST، استفسر بخصوص طلبي المباشر رقم: ${order.orderId}`
      : `Hello ROAST team, inquiring about my direct order: ${order.orderId}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#0e1927] border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl my-6 text-right"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Banner with Celebration */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#0e1927] to-amber-950 p-6 text-center border-b border-white/10">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'تم تأكيد طلبك بنجاح وبدون عمولات' : 'Direct Order Confirmed — 0% Markup'}</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {isAr ? 'شكراً لطلبك من ROAST دبي!' : 'Thank you for ordering with ROAST Dubai!'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {isAr ? 'رقم طلبك المباشر:' : 'Your Direct Order ID:'}{' '}
            <span className="font-mono text-amber-400 font-bold tracking-wider">{order.orderId}</span>
          </p>
        </div>

        {/* Live Status Tracker */}
        <div className="p-6 bg-[#0b1320] border-b border-white/5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              {isAr ? 'الوقت المقدر للاستلام / الوصول:' : 'Estimated Time:'}
            </span>
            <span className="font-mono font-black text-emerald-400 text-sm">
              {order.estimatedMinutes} {isAr ? 'دقيقة' : 'minutes'}
            </span>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              ✓ {isAr ? 'تم استلام الطلب' : 'Received'}
            </div>
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold animate-pulse">
              ☕ {isAr ? 'جاري التحضير بالمحمصة' : 'Brewing & Baking'}
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-500">
              🛵 {isAr ? 'في طريق التوصيل' : 'Out for Delivery'}
            </div>
          </div>
        </div>

        {/* Order Receipt Summary */}
        <div className="p-6 space-y-4 max-h-[40vh] overflow-y-auto">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            {isAr ? 'ملخص الفاتورة والأصناف' : 'Receipt & Items'}
          </h3>

          <div className="space-y-2.5">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <div>
                  <div className="text-white font-bold">
                    {item.quantity} × {isAr ? item.product.nameAr : item.product.nameEn}
                  </div>
                  {item.customization && (
                    <div className="text-[10px] text-slate-400">
                      {item.customization.temp === 'iced' ? 'بارد' : 'ساخن'} · {item.customization.milk || 'حليب كامل'}
                    </div>
                  )}
                </div>
                <div className="font-mono text-amber-400 font-bold">
                  {item.itemPrice * item.quantity} د.إ
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-2 text-xs space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
              <span className="font-mono text-white">{order.subtotal} د.إ</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>{isAr ? 'خصم مباشر:' : 'Discount:'}</span>
                <span className="font-mono">-{order.discount} د.إ</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{isAr ? 'رسوم التوصيل في الإمارات:' : 'UAE Delivery:'}</span>
              <span className="font-mono">{order.deliveryFee === 0 ? 'مجاني' : `${order.deliveryFee} د.إ`}</span>
            </div>
            <div className="flex justify-between text-base font-black text-amber-400 pt-2 border-t border-white/10">
              <span>{isAr ? 'المجموع النهائي المدفوع:' : 'Total Amount:'}</span>
              <span className="font-mono">{order.total} د.إ</span>
            </div>
          </div>

          {/* Address / Branch details */}
          <div className="p-3.5 bg-white/5 rounded-2xl text-xs space-y-1 text-slate-300">
            <div className="font-bold text-white flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{order.checkoutDetails.orderMode === 'delivery' ? 'عنوان التوصيل' : 'فرع الاستلام'}</span>
            </div>
            {order.checkoutDetails.orderMode === 'delivery' ? (
              <p className="text-slate-400">
                {order.checkoutDetails.emirate} - {order.checkoutDetails.area}، {order.checkoutDetails.streetAddress} {order.checkoutDetails.buildingOrVilla}
              </p>
            ) : (
              <p className="text-slate-400">
                {branch.nameAr} - {branch.addressAr}
              </p>
            )}
            <p className="text-[11px] text-slate-400">
              📞 المستلم: {order.checkoutDetails.customerName} ({order.checkoutDetails.phone})
            </p>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-[#09111b] border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isAr ? 'متابعة وتأكيد عبر واتساب' : 'Track via WhatsApp'}</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
          >
            {isAr ? 'العودة للمتجر' : 'Done & Return'}
          </button>
        </div>

      </div>
    </div>
  );
};
