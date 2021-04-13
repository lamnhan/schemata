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

export interface Video
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
        [type: string]: unknown; // { mp4: ..., webm: ... }
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
  // Taxonomies
  // Statistics
  keywords?: string;
}

export class VideoService {
  constructor() {}
}
