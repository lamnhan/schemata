import {Ids, Extras} from '../types/shared.type';

export type PromotionBuiltinKinds = 'code' | 'custom' | 'auto';

export interface Promotion extends Ids, Extras {
  // Ids
  content?: string;
  value: number;
  kind?: string | PromotionBuiltinKinds;
  locale?: string;
  origin?: string;
  // Extras
}

export class PromotionService {
  constructor() {}
}
