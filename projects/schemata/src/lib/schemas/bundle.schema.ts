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
  for: string; // collection:type
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
  keyword?: string;
}
