import {
  Minimum,
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Parents,
  Taxonomies,
  Relationships,
  Statistics,
  RepostOptions,
  ResourceAlike,
} from '../shared.type';

export interface PostTOCItem {
  text: string;
  level: number;
  id?: string;
  href?: string;
  routerLink?: string;
}

export interface PostLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnails?: Record<string, ResourceAlike>;
  description?: string;
  duration?: number;
}

export interface Post
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
  toc?: PostTOCItem[];
  tldr?: string;
  // Content
  slides?: Post[];
  audio?: string;
  video?: string;
  duration?: number;
  // Parents
  // Taxonomies
  // Relationships
  // RepostOptions
  // Statistics
  keywords?: string[];
}
