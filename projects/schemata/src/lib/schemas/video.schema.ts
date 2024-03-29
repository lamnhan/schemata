import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Parents,
  Taxonomies,
  Relationships,
  RepostOptions,
  Statistics,
  ResourceAlike,
} from '../shared.type';

export interface VideoLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnails?: Record<string, ResourceAlike>;
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
    Relationships,
    RepostOptions,
    Statistics {
  // BasicWithLocalization
  // Authors
  // Images
  description?: string;
  // Content
  srcs?: Record<string, ResourceAlike>;
  duration?: number;
  birthday?: string;
  props?: Record<string, unknown>;
  // Parents
  // Taxonomies
  // Relationships
  // RepostOptions
  // Statistics
  keywords?: string[];
}
