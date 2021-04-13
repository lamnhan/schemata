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
} from '../types/shared.type';

import {Category} from './category.service';

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
    Statistics {
  // Ids
  type?: string;
  // Status
  // Timing
  // Authors
  // Images
  description?: string;
  // Content
  src?: string;
  srcs?: {
    [type: string]: unknown; // { mp3: ..., webm: ... }
  };
  sheet?: string;
  sheets?: {
    [type: string]: unknown; // { jpg: ..., pdf: ... }
  };
  duration?: number;
  birthday?: string;
  props?: {
    [name: string]: unknown;
  };
  locale?: string;
  origin?: string;
  // Parents
  // Relationships
  genres?: {
    [id: string]: Category;
  };
  // Taxonomies
  // Statistics
  keywords?: string;
}

export class AudioService {
  constructor() {}
}
