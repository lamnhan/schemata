import { CategoryLite } from './schemas/category.schema';
import { TagLite } from './schemas/tag.schema';
import { PostLite } from './schemas/post.schema';
import { AudioLite } from './schemas/audio.schema';
import { VideoLite } from './schemas/video.schema';
import { BundleLite } from './schemas/bundle.schema';
import { ProfileLite } from './schemas/profile.schema';
import { ProductLite } from './schemas/product.schema';

export interface BasicWithLocalization extends Basic, I18n {
  // Basic
  // I18n
}

export interface Basic extends Minimum, Status, Timestamps {
  uid: string;
  // Minimum
  // Status
  // Timestamps
}

export interface Minimum {
  id: string;
  title: string;
  type: string;
}

export interface Status {
  status: 'draft' | 'publish' | 'archive' | 'trash';
}

export interface Timestamps {
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
  thumbnails?: Record<string, ResourceAlike>;
  images?: Record<string, ResourceAlike>;
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

export interface Relationships {
  relatedPosts?: PostLite[];
  relatedAudios?: AudioLite[];
  relatedVideos?: VideoLite[];
  relatedBundles?: BundleLite[];
  relatedProfiles?: ProfileLite[];
  relatedProducts?: ProductLite[];
}

export interface RepostOptions {
  original?: boolean;
  source?: {name: string, url: string, createdAt: string};
  repostable?: boolean;
}

export interface Statistics {
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  rateCount?: number;
  shareCount?: number;
}

export interface ResourceAlike {
  name: string;
  src: string;
}