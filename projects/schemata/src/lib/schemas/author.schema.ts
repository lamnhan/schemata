import {
  Ids,
  Status,
  Timing,
  Images,
  Content,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface Author
  extends Ids,
    Status,
    Timing,
    Images,
    Content,
    Taxonomies,
    Statistics {
  // Ids
  // Status
  // Timing
  // Images
  description?: string;
  // Content
  uid?: string;
  email?: string;
  phoneNumber?: string;
  url?: string;
  badges?: string[];
  props?: Record<string, unknown>;
  locale?: string;
  origin?: string;
  // Taxonomies
  // Statistics
  keywords?: string;
}
