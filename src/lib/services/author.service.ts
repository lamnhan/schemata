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
  Extras,
} from '../types/shared.type';

export interface Author
  extends Ids,
    Status,
    Timing,
    Images,
    Content,
    Taxonomies,
    Rating,
    Sharing,
    Statistics,
    Extras {
  // Ids
  type?: string;
  // Status
  // Timing
  // Images
  description?: string;
  // Content
  email?: string;
  phoneNumber?: number | string;
  url?: string;
  stats?: {
    [name: string]: unknown;
  };
  locale?: string;
  origin?: string;
  // Taxonomies
  // Rating
  // Sharing
  // Statistics
  keywords?: string;
  // Extras
}

export class AuthorService {
  constructor() {}
}
