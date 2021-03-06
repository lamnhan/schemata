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
} from '../shared.type';

export interface PostTOCItem {
  text: string;
  level: number;
  id?: string;
  href?: string;
  routerLink?: string;
}

export interface Post
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
  uid?: string;
  type?: string;
  // Status
  // Timing
  // Authors
  // Images
  description?: string;
  toc?: PostTOCItem[];
  tldr?: string;
  // Content
  slides?: {
    [id: string]: Post;
  };
  audio?: string;
  video?: string;
  duration?: number;
  locale?: string;
  origin?: string;
  // Parents
  // Relationships
  // Taxonomies
  // Statistics
  keywords?: string;
}
