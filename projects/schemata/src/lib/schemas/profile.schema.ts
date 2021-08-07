import {
  Minimum,
  Basic,
  Images,
  Content,
  Taxonomies,
  Relationships,
  Statistics,
  ResourceAlike,
} from '../shared.type';

export interface ProfileLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnails?: Record<string, ResourceAlike>;
  description?: string;
  badges?: string[];
}

export interface Profile
  extends Basic,
    Images,
    Content,
    Taxonomies,
    Relationships,
    Statistics {
  // Basic
  // Images
  description?: string;
  // Content
  email?: string;
  phoneNumber?: string;
  url?: string;
  badges?: string[]; // values of user.claims
  props?: Record<string, unknown>; // picks of user.additionalData
  // Taxonomies
  // Relationships
  // Statistics
  keywords?: string[];
}
