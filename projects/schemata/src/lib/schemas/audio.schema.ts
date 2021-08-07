import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Parents,
  Taxonomies,
  Relationships,
  Statistics,
  ResourceAlike,
} from '../shared.type';
import { CategoryLite } from './category.schema';

export interface AudioLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnails?: Record<string, ResourceAlike>;
  description?: string;
  duration?: number;
}

export interface Audio
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Parents,
    Taxonomies,
    Relationships,
    Statistics {
  // BasicWithLocalization
  // Authors
  // Images
  description?: string;
  // Content
  srcs?: Record<string, ResourceAlike>;
  sheets?: ResourceAlike[];
  duration?: number;
  birthday?: string;
  props?: Record<string, unknown>;
  // Parents
  genres?: Record<string, CategoryLite>;
  // Taxonomies
  // Relationships
  // Statistics
  keywords?: string[];
}
