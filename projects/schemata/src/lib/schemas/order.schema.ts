import { Basic } from '../shared.type';
import { ProductLite } from './product.schema';

export interface OrderItem {
  updatedAt: string;
  qty: number;
  product: ProductLite;
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
    [id: string]: OrderItem;
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
