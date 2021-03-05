import {
  Ids,
  Status,
  Timing,
  Images,
  Content,
  Taxonomies,
  Rating,
  Sharing,
  Statistics,
} from '../types/shared.type';

export interface Profile
  extends Ids,
    Status,
    Timing,
    Images,
    Content,
    Taxonomies,
    Rating,
    Sharing,
    Statistics {
  // Ids
  // Status
  // Timing
  // Images
  description?: string;
  // Content
  official?: boolean;
  uid?: string;
  email?: string;
  phoneNumber?: number | string;
  url?: string;
  roles?: Record<string, unknown>;
  props?: Record<string, unknown>;
  locale?: string;
  origin?: string;
  // Taxonomies
  // Rating
  // Sharing
  // Statistics
  keywords?: string;
}

export class ProfileService {
  constructor() {}
}
