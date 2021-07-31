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

export interface Video
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
  duration?: number;
  birthday?: string;
  prop?: Record<string, unknown>;
  // Parents
  // Relationships
  // Taxonomies
  // Statistics
  keyword?: string;
}
