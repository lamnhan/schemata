import {Ids, Status, Timing} from '../shared.type';

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

export interface Order extends Ids, Status, Timing {
  // Ids
  type?: string;
  // Status
  // Timing
  stage: 'new' | 'confirmed' | 'delivering' | 'done' | 'cancelled';
  items: {
    [key: string]: OrderItem;
  };
  count?: number;
  total?: number;
  subtotal?: number;
  discountTotal?: number;
  uid?: string;
  note?: string;
  paymentType?: string;
  transactionId?: string;
  discountData?: {
    [kind: string]: OrderDiscount;
  };
  adjustments?: OrderAdjustment[];
}
