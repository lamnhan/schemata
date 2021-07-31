import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface BundleLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnail?: string;
  description?: string;
  count?: number;
}

export interface Bundle
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Taxonomies,
    Statistics {
  // BasicWithLocalization
  only: string; // collection:type
  // Authors
  // Images
  description?: string;
  // Content
  count?: number;
  // Taxonomies
  // Statistics
  keyword?: string;
}
