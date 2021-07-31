import { Minimum, BasicWithLocalization, Images } from '../shared.type';

export interface CategoryLite extends Minimum {
  // Minimum
  thumbnail?: string;
  description?: string;
  count?: number;
}

export interface Category extends BasicWithLocalization, Images {
  // BasicWithLocalization
  only: string; // collection:type
  // Images
  description?: string;
  count?: number;
}
