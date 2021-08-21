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
import { UserRole, UserRank, UserLegit } from './user.schema';

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
