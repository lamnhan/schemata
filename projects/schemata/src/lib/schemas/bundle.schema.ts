import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Taxonomies,
  Relationships,
  Statistics,
  ResourceAlike,
} from '../shared.type';

export interface BundleLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnails?: Record<string, ResourceAlike>;
  description?: string;
  count?: number;
}

export interface Bundle
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Taxonomies,
    Relationships,
    Statistics {
  // BasicWithLocalization
  only: string; // collection:type
  // Authors
  // Images
  description?: string;
  // Content
  count?: number;
  // Taxonomies
  // Relationships
  // Statistics
  keyword?: string;
}
