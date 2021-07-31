import { BasicWithLocalization, Images } from '../shared.type';

export interface Category extends BasicWithLocalization, Images {
  // BasicWithLocalization
  only: string; // collection:type
  // Images
  description?: string;
  count?: number;
}
