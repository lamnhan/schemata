import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Parents,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface VideoLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnail?: string;
  description?: string;
  duration?: number;
}

export interface Video
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Parents,
    Taxonomies,
    Statistics {
  // BasicWithLocalization
  // Authors
  // Images
  description?: string;
  // Content
  src?: string;
  duration?: number;
  birthday?: string;
  props?: Record<string, unknown>;
  // Parents
  // Taxonomies
  // Statistics
  keyword?: string;
}
