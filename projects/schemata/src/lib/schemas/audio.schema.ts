import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Parents,
  Taxonomies,
  Statistics,
} from '../shared.type';
import { CategoryLite } from './category.schema';

export interface AudioLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnail?: string;
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
    Statistics {
  // BasicWithLocalization
  // Authors
  // Images
  description?: string;
  // Content
  src?: string;
  sheets?: string[];
  duration?: number;
  birthday?: string;
  props?: Record<string, unknown>;
  // Parents
  genres?: Record<string, CategoryLite>;
  // Taxonomies
  // Statistics
  keyword?: string;
}
