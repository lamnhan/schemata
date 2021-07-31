import {Ids, Status, Timing, Images} from '../shared.type';

export interface Category extends Ids, Status, Timing, Images {
  // Ids
  for: string; // collection:type
  uid?: string;
  type?: string;
  // Status
  // Timing
  // Images
  description?: string;
  count?: number;
  locale?: string;
  origin?: string;
}
