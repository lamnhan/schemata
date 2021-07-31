import {
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Parents,
  Relationships,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface Audio
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Parents,
    Relationships,
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
  prop?: Record<string, unknown>;
  // Parents
  // Relationships
  genres?: string[];
  // Taxonomies
  // Statistics
  keyword?: string;
}
