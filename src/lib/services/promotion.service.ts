import {Ids, Status, Timing} from '../types/shared.type';

export type PromotionBuiltinKinds = 'code' | 'custom' | 'auto';

export interface Promotion extends Ids, Status, Timing {
  // Ids
  // Status
  // Timing
  content?: string;
  value: number;
  kind?: PromotionBuiltinKinds;
  locale?: string;
  origin?: string;
}

export class PromotionService {
  constructor() {}
}
