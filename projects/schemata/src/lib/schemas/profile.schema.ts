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
import { UserRole } from './user.schema';

export type UserRank = string;

export type UserLegit = 'average' | 'official' | 'suspicious';

export interface ProfileLite extends Minimum {
  // Minimum
  role: UserRole;
  createdAt: string;
  thumbnails?: Record<string, ResourceAlike>;
  description?: string;
  rank?: UserRank;
  legit?: UserLegit;
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
  role: UserRole;
  // Images
  description?: string;
  // Content
  email?: string;
  phoneNumber?: string;
  url?: string;
  rank?: UserRank;
  legit?: UserLegit;
  badges?: string[];
  props?: Record<string, unknown>; // picks of user.additionalData
  // Taxonomies
  // Relationships
  // Statistics
  keywords?: string[];
}
