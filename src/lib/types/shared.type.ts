export interface Ids {
  '#'?: number;
  title: string;
  id: string;
  // alias of id
  $key?: string;
  // alias of id / clean version of the title (if the id is un-readable)
  slug?: string;
}

export interface Status {
  // blank = 'draft'
  status?: 'draft' | 'published' | 'archived';
}

export interface Timing {
  createdAt?: string;
  updatedAt?: string;
}

export interface Authors {
  // John Doe
  // John Doe, Another John
  // { author-1: ..., author-2: ... }
  authors?:
    | string
    | {
        [id: string]: unknown;
      };
}

export interface Images {
  thumbnail?: string;
  image?: string;
}

export interface Content {
  content?: string;
}

export interface Parents {
  // { bundle-1: ... }
  parents?: {
    [id: string]: unknown;
  };
}

export interface Relationships {
  // { "posts/post-1": ... }
  relationships?: {
    [to: string]: unknown;
  };
}

export interface Taxonomies {
  // Cat 1
  // Cat 1, Cat 2
  // { cat-1: ..., cat-2: ... }
  categories?:
    | string
    | {
        [id: string]: unknown;
      };
  // Tag 1
  // Tag 1, Tag 2
  // { tag-1: ..., tag-2: ... }
  tags?:
    | string
    | {
        [id: string]: unknown;
      };
}

export interface Rating {
  rateCount?: number; // number of stars: 0-5 (directly, no rateTotal) or total stars
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
  meta?: Record<string, unknown>;
}
