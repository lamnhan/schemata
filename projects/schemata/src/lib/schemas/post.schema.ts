import {
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Parents,
  Relationships,
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

export interface Post
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Parents,
    Relationships,
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
  // Relationships
  // Taxonomies
  // Statistics
  keyword?: string;
}
