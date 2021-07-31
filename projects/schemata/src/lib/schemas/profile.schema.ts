import {
  Basic,
  Images,
  Content,
  Taxonomies,
  Statistics,
} from '../shared.type';

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
  badges?: string[]; // values of user.claim
  prop?: Record<string, unknown>; // picks of user.additionalData
  // Taxonomies
  // Statistics
  keyword?: string;
}
