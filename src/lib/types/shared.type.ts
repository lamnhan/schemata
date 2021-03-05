import {Category} from '../services/category.service';
import {Tag} from '../services/tag.service';
import {Profile} from '../services/profile.service';
import {Bundle} from '../services/bundle.service';

export interface Ids {
  '#'?: number; // row number or index or numerical id
  title: string;
  id: string;
  $key?: string; // alias of id
  slug?: string; // alias of id / clean version of the title (if the id is un-readable)
}

export interface Status {
  status?: 'draft' | 'publish' | 'archive' | 'trash'; // blank = 'draft'
}

export interface Timing {
  createdAt?: string; // ISO string
  updatedAt?: string;
}

export interface Authors {
  // John Doe
  // John Doe, Another John
  textAuthors?: string;
  authors?: {
    // author-1: ...
    // author-2: ...
    [id: string]: Profile;
  };
}

export interface Images {
  thumbnail?: string;
  image?: string;
}

export interface Content {
  content?: string;
  contentSrc?: string;
}

export interface Parents {
  parents?: {
    // bundle-1: ...
    [id: string]: Bundle;
  };
}

export interface Relationships {
  relationships?: {
    // "posts#post-1": ...
    // "pages#page-2": ...
    [to: string]: unknown;
  };
}

export interface Taxonomies {
  // Cat 1
  // Cat 1, Cat 2
  textCategories?: string;
  categories?: {
    // cat-1: ...
    // cat-2: ...
    [id: string]: Category;
  };
  // Tag 1
  // Tag 1, Tag 2
  textTags?: string;
  // tag-1: ...
  // tag-2: ...
  tags?: {
    [id: string]: Tag;
  };
}

export interface Rating {
  rateCount?: number; // number of stars: <=5 (directly/no rateTotal) or total stars
  rateTotal?: number; // number of rating
}

export interface Sharing {
  shareCount?: number;
  shareDetail?: {
    // facebook, twitter, email, sms, link, ...
    [provider: string]: number;
  };
}

export interface Statistics {
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
}

export interface Extras {
  metaId?: string; // standalone meta
  metas?: Record<string, unknown>; // direct metas
}
