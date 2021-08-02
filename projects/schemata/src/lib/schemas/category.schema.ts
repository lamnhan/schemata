import { Minimum, BasicWithLocalization, Images, ResourceAlike } from '../shared.type';

export interface CategoryLite extends Minimum {
  // Minimum
  thumbnails?: Record<string, ResourceAlike>;
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
