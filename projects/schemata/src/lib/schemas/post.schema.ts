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
  thumbnail?: string;
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
  // Statistics
  keyword?: string;
}
