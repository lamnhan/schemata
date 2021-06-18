import {
  Ids,
  Status,
  Timing,
  Authors,
  Images,
  Content,
  Relationships,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface Bundle
  extends Ids,
    Status,
    Timing,
    Authors,
    Images,
    Content,
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
  count?: number;
  locale?: string;
  origin?: string;
  // Relationships
  // Taxonomies
  // Statistics
  keywords?: string;
}
