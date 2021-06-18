import {Category} from './schemas/category.schema';
import {Tag} from './schemas/tag.schema';
import {Bundle} from './schemas/bundle.schema';
import {Profile} from './schemas/profile.schema';
import {Author} from './schemas/author.schema';

export interface Ids {
  title: string;
  id: string;
}

export interface Status {
  status?: 'draft' | 'publish' | 'archive' | 'trash'; // blank = 'draft'
}

export interface Timing {
  createdAt?: string; // ISO string
  updatedAt?: string;
}

export interface Authors {
  authors?: {
    // author-1: ...
    // author-2: ...
    [id: string]: Profile | Author;
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
    [to: string]: boolean;
  };
}

export interface Taxonomies {
  categories?: {
    // cat-1: ...
    // cat-2: ...
    [id: string]: Category;
  };
  // tag-1: ...
  // tag-2: ...
  tags?: {
    [id: string]: Tag;
  };
}

export interface Statistics {
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  rateCount?: number;
  shareCount?: number;
}
