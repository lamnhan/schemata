import {Ids, Timing} from '../types/shared.type';

export type PromotionBuiltinKinds = 'code' | 'custom' | 'auto';

export interface Promotion extends Ids, Timing {
  // Ids
  // Timing
  content?: string;
  value: number;
  kind?: string | PromotionBuiltinKinds;
  locale?: string;
  origin?: string;
}

export class PromotionService {
  constructor() {}
}
