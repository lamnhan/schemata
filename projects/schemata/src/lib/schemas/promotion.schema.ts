import {BasicWithLocalization} from '../shared.type';

export type PromotionBuiltinKind = 'code' | 'custom' | 'auto';

export interface Promotion extends BasicWithLocalization {
  // BasicWithLocalization
  kind?: PromotionBuiltinKind;
  value: number;
  content?: string;
}
