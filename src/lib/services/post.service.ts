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

export interface PostTOCItem {
  text: string;
  level: number;
  id?: string;
  href?: string;
  routerLink?: string | string[];
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
  excerpt?: string;
  toc?: PostTOCItem[];
  tldr?: string | string[];
  // Content
  slides?: {
    [slide: string]: Post;
  };
  duration?: number;
  locale?: string;
  origin?: string;
  // Parents
  // Relationships
  // Taxonomies
  // Rating
  // Sharing
  // Statistics
  keywords?: string;
  // Extras
}

export class PostService {
  constructor() {}
}
