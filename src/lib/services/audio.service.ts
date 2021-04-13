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
  srcs?:
    | string
    | {
        [type: string]: unknown; // { mp3: ..., webm: ... }
      };
  sheets?:
    | string
    | {
        [type: string]: unknown; // { jpg: ..., pdf: ... }
      };
  duration?: number;
  birthday?: number | string;
  props?: {
    [name: string]: unknown;
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
  // Statistics
  keywords?: string;
}

export class AudioService {
  constructor() {}
}
