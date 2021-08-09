import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Taxonomies,
  Relationships,
  RepostOptions,
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
    RepostOptions,
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
  // RepostOptions
  // Statistics
  keywords?: string[];
}
