import {
  Ids,
  Status,
  Timing,
  Images,
  Content,
  Taxonomies,
  Statistics,
} from '../types/shared.type';

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
  official?: boolean;
  uid?: string;
  email?: string;
  phoneNumber?: string;
  url?: string;
  roles?: Record<string, unknown>;
  props?: Record<string, unknown>;
  locale?: string;
  origin?: string;
  // Taxonomies
  // Statistics
  keywords?: string;
}

export class AuthorService {
  constructor() {}
}
