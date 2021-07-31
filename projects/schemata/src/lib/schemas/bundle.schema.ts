import {
  BasicWithLocalization,
  Authors,
  Images,
  Content,
  Relationships,
  Taxonomies,
  Statistics,
} from '../shared.type';

export interface Bundle
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Relationships,
    Taxonomies,
    Statistics {
  // BasicWithLocalization
  only: string; // collection:type
  // Authors
  // Images
  description?: string;
  // Content
  count?: number;
  // Relationships
  // Taxonomies
  // Statistics
  keyword?: string;
}
