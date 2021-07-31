import { CategoryLite } from './schemas/category.schema';
import { TagLite } from './schemas/tag.schema';
import { BundleLite } from './schemas/bundle.schema';
import { ProfileLite } from './schemas/profile.schema';

export interface BasicWithLocalization extends Basic, I18n {
  // Basic
  // I18n
}

export interface Basic extends Minimum, Status, Timing {
  uid: string;
  // Minimum
  // Status
  // Timing
}

export interface Minimum {
  id: string;
  title: string;
  type: string;
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
  authors?: Record<string, ProfileLite>;
}

export interface Images {
  thumbnail?: string;
  image?: string;
}

export interface Content {
  content?: string;
}

export interface Parents {
  parents?: Record<string, BundleLite>;
}

export interface Taxonomies {
  categories?: Record<string, CategoryLite>;
  tags?: Record<string, TagLite>;
}

export interface Statistics {
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  rateCount?: number;
  shareCount?: number;
}
