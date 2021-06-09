import {
  Ids,
  Status,
  Timing,
  Images,
  Content,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface Profile
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
  badges?: string[]; // values of user.claims
  props?: Record<string, unknown>; // picks of user.additionalData
  // Taxonomies
  // Statistics
  keywords?: string;
}
