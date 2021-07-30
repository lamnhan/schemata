import {Ids, Status, Timing} from '../shared.type';

export type PromotionBuiltinKinds = 'code' | 'custom' | 'auto';

export interface Promotion extends Ids, Status, Timing {
  // Ids
  uid?: string;
  type?: string;
  // Status
  // Timing
  content?: string;
  value: number;
  kind?: PromotionBuiltinKinds;
  locale?: string;
  origin?: string;
}
