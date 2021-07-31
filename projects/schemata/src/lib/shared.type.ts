export interface BasicWithLocalization extends Basic, I18n {
  // Basic
  // I18n
}

export interface Basic extends Status, Timing {
  uid: string;
  id: string;
  title: string;
  type: string;
  // Status
  // Timing
}

export interface Status {
  status: 'draft' | 'publish' | 'archive' | 'trash';
}

export interface Timing {
  createdAt: string;
  updatedAt: string;
}

export interface I18n {
  locale: string;
  origin: string;
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
