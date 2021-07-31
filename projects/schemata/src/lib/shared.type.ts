export interface Ids {
  title: string;
  id: string;
}

export interface Status {
  status: 'draft' | 'publish' | 'archive' | 'trash';
}

export interface Timing {
  createdAt: string;
  updatedAt: string;
}

export interface Authors {
  authors?: string[];
}

export interface Images {
  thumbnail?: string;
  image?: string;
}

export interface Content {
  content?: string;
}

export interface Parents {
  parents?: string[];
}

export interface Relationships {
  relationships?: string[]; // collection#id
}

export interface Taxonomies {
  categories?: string[];
  tags?: string[];
}

export interface Statistics {
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  rateCount?: number;
  shareCount?: number;
}
