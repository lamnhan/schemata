import {
  Ids,
  Status,
  Timing,
  Authors,
  Images,
  Content,
  Relationships,
  Taxonomies,
  Rating,
  Sharing,
  Statistics,
} from '../types/shared.type';

export interface Bundle
  extends Ids,
    Status,
    Timing,
    Authors,
    Images,
    Content,
    Relationships,
    Taxonomies,
    Rating,
    Sharing,
    Statistics {
  // Ids
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
  // Rating
  // Sharing
  // Statistics
  keywords?: string;
}

export class BundleService {
  constructor() {}
}
