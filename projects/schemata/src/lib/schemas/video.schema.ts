import {
  Ids,
  Status,
  Timing,
  Authors,
  Images,
  Content,
  Parents,
  Relationships,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface Video
  extends Ids,
    Status,
    Timing,
    Authors,
    Images,
    Content,
    Parents,
    Relationships,
    Taxonomies,
    Statistics {
  // Ids
  uid?: string;
  type?: string;
  // Status
  // Timing
  // Authors
  // Images
  description?: string;
  // Content
  src?: string;
  duration?: number;
  birthday?: string;
  prop?: Record<string, unknown>;
  locale?: string;
  origin?: string;
  // Parents
  // Relationships
  // Taxonomies
  // Statistics
  keyword?: string;
}
