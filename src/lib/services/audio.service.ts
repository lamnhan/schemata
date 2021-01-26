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
  Rating,
  Sharing,
  Statistics,
  Extras,
} from '../types/shared.type';

export interface Audio
  extends Ids,
    Status,
    Timing,
    Authors,
    Images,
    Content,
    Parents,
    Relationships,
    Taxonomies,
    Rating,
    Sharing,
    Statistics,
    Extras {
  // Ids
  type?: string;
  // Status
  // Timing
  // Authors
  // Images
  description?: string;
  // Content
  src?:
    | string
    | {
        [type: string]: unknown; // { mp3: ..., webm: ... }
      };
  sheet?:
    | string
    | {
        [type: string]: unknown; // { jpg: ..., pdf: ... }
      };
  duration?: number;
  birthday?: number | string;
  props?: {
    [prop: string]: unknown;
  };
  locale?: string;
  origin?: string;
  // Parents
  // Relationships
  genres?:
    | string
    | {
        [id: string]: unknown;
      };
  // Taxonomies
  // Rating
  // Sharing
  // Statistics
  keywords?: string;
  // Extras
}

export class AudioService {
  constructor() {}
}
