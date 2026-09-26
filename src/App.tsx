import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { TableReservationModal } from './components/TableReservationModal';
import { StorySection } from './components/StorySection';
import { DirectOrderBanner } from './components/DirectOrderBanner';
import { BranchesSection } from './components/BranchesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

import { Product, PRODUCTS, UAEBranch, UAE_BRANCHES, RESTAURANT_INFO } from './data/restaurantData';
import { CartItem, CartCustomization, OrderMode, CheckoutDetails, ConfirmedOrder } from './types/cart';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [orderMode, setOrderMode] = useState<OrderMode>('delivery');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  // Initial cart with a signature UAE favorite for instant delightful interactive experience
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-spanish-latte',
      product: PRODUCTS[1], // Spanish Latte
      quantity: 1,
      itemPrice: 28,
      customization: {
        temp: 'iced',
        milk: 'fresh_dairy',
        sweetness: 'regular',
      },
    },
  ]);

  // Keep html dir in sync
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Cart total count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cart Handlers
  const handleQuickAdd = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && !item.customization);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${product.id}`,
          product,
          quantity: 1,
          itemPrice: product.price,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddCustomizedToCart = (
    product: Product,
    quantity: number,
    customization?: CartCustomization,
    finalPrice?: number
  ) => {
    const itemPrice = finalPrice || product.price;
    setCartItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}-${product.id}`,
        product,
        quantity,
        customization,
        itemPrice,
      },
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Build WhatsApp text from cart
  const generateWhatsAppOrderText = (details?: CheckoutDetails): string => {
    const isAr = lang === 'ar';
    const subtotal = cartItems.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
    const isFreeDelivery = orderMode === 'pickup' || subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
    const deliveryFee = orderMode === 'pickup' ? 0 : (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee);
    const total = subtotal + deliveryFee;

    let text = isAr
      ? `*طلب مباشر جديد من منصة ROAST دبي ☕*\n`
      : `*New Direct Order from ROAST Dubai ☕*\n`;

    text += `--------------------------------\n`;
    text += isAr ? `*نوع الطلب:* ${orderMode === 'delivery' ? 'توصيل للمنزل' : 'استلام من الفرع'}\n` : `*Type:* ${orderMode}\n`;

    if (details) {
      text += isAr ? `*الاسم:* ${details.customerName}\n` : `*Name:* ${details.customerName}\n`;
      text += isAr ? `*الهاتف:* ${details.phone}\n` : `*Phone:* ${details.phone}\n`;
      if (details.orderMode === 'delivery') {
        text += isAr
          ? `*العنوان:* ${details.emirate} - ${details.area}، ${details.streetAddress} ${details.buildingOrVilla}\n`
          : `*Address:* ${details.emirate}, ${details.streetAddress}\n`;
      }
      if (details.notes) {
        text += isAr ? `*ملاحظات:* ${details.notes}\n` : `*Notes:* ${details.notes}\n`;
      }
    }

    text += `\n*قائمة الأصناف المطلوبة:*\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.quantity}× ${item.product.nameAr} (${item.itemPrice * item.quantity} د.إ)\n`;
      if (item.customization) {
        if (item.customization.temp) text += `   - ${item.customization.temp === 'iced' ? 'بارد ومثلج' : 'ساخن'}\n`;
        if (item.customization.milk) text += `   - حليب: ${item.customization.milk}\n`;
        if (item.customization.sweetness) text += `   - سكر: ${item.customization.sweetness}\n`;
        if (item.customization.extraShot) text += `   - شوت إسبريسو إضافي\n`;
        if (item.customization.beanGrind) text += `   - طحن: ${item.customization.beanGrind}\n`;
        if (item.customization.notes) text += `   - ملاحظة: ${item.customization.notes}\n`;
      }
    });

    text += `\n--------------------------------\n`;
    text += isAr ? `*المجموع الفرعي:* ${subtotal} د.إ\n` : `*Subtotal:* ${subtotal} AED\n`;
    text += isAr ? `*التوصيل:* ${deliveryFee === 0 ? 'مجاني' : `${deliveryFee} د.إ`}\n` : `*Delivery:* ${deliveryFee === 0 ? 'FREE' : `${deliveryFee} AED`}\n`;
    text += isAr ? `*المجموع الإجمالي:* ${total} د.إ\n` : `*Total Amount:* ${total} AED\n`;
    text += isAr ? `\nيرجى تأكيد الاستلام وتجهيز الطلب مباشرة. شكراً!` : `\nPlease confirm and prepare my order. Thanks!`;

    return text;
  };

  const handleOrderDirectWhatsAppFromCart = () => {
    const text = generateWhatsAppOrderText();
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleConfirmOrder = (details: CheckoutDetails) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
    const isFreeDelivery = details.orderMode === 'pickup' || subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
    const deliveryFee = details.orderMode === 'pickup' ? 0 : (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee);
    const total = subtotal + deliveryFee;

    const newOrder: ConfirmedOrder = {
      orderId: `DXB-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleTimeString('ar-AE'),
      items: [...cartItems],
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      checkoutDetails: details,
      status: 'received',
      estimatedMinutes: details.orderMode === 'pickup' ? 15 : 30,
    };

    setConfirmedOrder(newOrder);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleWhatsAppOrderFromCheckout = (details: CheckoutDetails) => {
    const text = generateWhatsAppOrderText(details);
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleConfirmOrder(details);
  };

  const handleSelectPickupBranch = (branch: UAEBranch) => {
    setOrderMode('pickup');
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1320] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section with UAE context & fulfillment modes */}
        <Hero
          orderMode={orderMode}
          onSelectOrderMode={(mode) => setOrderMode(mode)}
          onOpenReservation={() => setIsReservationOpen(true)}
          lang={lang}
        />

        {/* Interactive Menu Section */}
        <MenuSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
          lang={lang}
        />

        {/* Direct Order Benefits Banner */}
        <DirectOrderBanner
          onOpenMenu={() => {
            const menuEl = document.getElementById('menu');
            menuEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          lang={lang}
        />

        {/* Roastery Story & Dubai Heritage */}
        <StorySection lang={lang} />

        {/* UAE Branches & Pickup Selector */}
        <BranchesSection
          onSelectPickupBranch={handleSelectPickupBranch}
          lang={lang}
        />

        {/* Verified Reviews Section */}
        <ReviewsSection lang={lang} />
      </main>

      {/* Footer with Dubai contact & credits */}
      <Footer lang={lang} />

      {/* Modals & Overlays */}
      {/* 1. Customization Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddCustomizedToCart}
        lang={lang}
      />

      {/* 2. Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        orderMode={orderMode}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onOrderDirectWhatsApp={handleOrderDirectWhatsAppFromCart}
        lang={lang}
      />

      {/* 3. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderMode={orderMode}
        onConfirmOrder={handleConfirmOrder}
        onWhatsAppOrder={handleWhatsAppOrderFromCheckout}
        lang={lang}
      />

      {/* 4. Table Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        lang={lang}
      />

      {/* 5. Live Order Confirmation & Tracking Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        lang={lang}
      />

    </div>
  );
}
