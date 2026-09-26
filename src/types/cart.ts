import { Product, UAEBranch } from '../data/restaurantData';

export type MilkOption = 'oat' | 'almond' | 'coconut' | 'fresh_dairy' | 'skimmed';
export type SweetnessOption = 'none' | 'low' | 'regular' | 'extra';
export type TempOption = 'hot' | 'iced';
export type BeanGrindOption = 'whole_beans' | 'v60_filter' | 'espresso' | 'french_press' | 'aeropress';

export interface CartCustomization {
  milk?: MilkOption;
  sweetness?: SweetnessOption;
  temp?: TempOption;
  extraShot?: boolean;
  beanGrind?: BeanGrindOption;
  notes?: string;
}

export interface CartItem {
  id: string; // unique item id inside cart: productId + timestamp / hash
  product: Product;
  quantity: number;
  customization?: CartCustomization;
  itemPrice: number; // base + extras
}

export type OrderMode = 'delivery' | 'pickup' | 'dine_in';

export interface CheckoutDetails {
  customerName: string;
  phone: string;
  emirate: string;
  area: string;
  streetAddress: string;
  buildingOrVilla: string;
  notes: string;
  selectedBranchId: string;
  paymentMethod: 'apple_pay' | 'card' | 'cod';
  orderMode: OrderMode;
}

export interface TableBookingDetails {
  branchId: string;
  customerName: string;
  phone: string;
  guestCount: number;
  date: string;
  timeSlot: string;
  seatingZone: 'indoor' | 'terrace' | 'vip_lounge';
  specialNotes?: string;
}

export interface ConfirmedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  checkoutDetails: CheckoutDetails;
  status: 'received' | 'roasting_brewing' | 'dispatched' | 'ready_for_pickup';
  estimatedMinutes: number;
}
