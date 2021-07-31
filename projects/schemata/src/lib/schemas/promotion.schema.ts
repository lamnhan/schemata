import {Ids, Status, Timing} from '../shared.type';

export type PromotionBuiltinKind = 'code' | 'custom' | 'auto';

export interface Promotion extends Ids, Status, Timing {
  // Ids
  uid?: string;
  type?: string;
  // Status
  // Timing
  content?: string;
  value: number;
  kind?: PromotionBuiltinKind;
  locale?: string;
  origin?: string;
}
