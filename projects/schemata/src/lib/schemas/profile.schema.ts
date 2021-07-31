import {
  Minimum,
  Basic,
  Images,
  Content,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface ProfileLite extends Minimum {
  // Minimum
  createdAt: string;
  thumbnail?: string;
  description?: string;
  badges?: string[];
}

export interface Profile
  extends Basic,
    Images,
    Content,
    Taxonomies,
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
  // Statistics
  keyword?: string;
}
