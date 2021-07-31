import {Basic} from '../shared.type';

export interface OrderProduct {
  id: string;
  title: string;
  sku: string;
  price: number;
  unit?: string;
  thumbnail?: string;
}

export interface OrderItem {
  updatedAt: string;
  qty: number;
  product: OrderProduct;
}

export interface OrderDiscount {
  title: string;
  value: number; // positive only
}

export interface OrderAdjustment {
  updatedAt: string;
  reason: string;
  value: number; // positive or nagative
}

export interface Order extends Basic {
  // Basic
  stage: 'new' | 'confirmed' | 'delivering' | 'done' | 'cancelled';
  note?: string;
  items: {
    [key: string]: OrderItem;
  };
  count?: number;
  total?: number;
  subtotal?: number;
  discountTotal?: number;
  paymentType?: string;
  transactionId?: string;
  discountData?: {
    [kind: string]: OrderDiscount;
  };
  adjustments?: OrderAdjustment[];
}
