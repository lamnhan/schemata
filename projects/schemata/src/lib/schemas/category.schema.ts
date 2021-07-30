import {Ids, Status, Timing, Images} from '../shared.type';

export interface Category extends Ids, Status, Timing, Images {
  // Ids
  uid?: string;
  type?: string; // post-default, post-article, page-default, ...
  // Status
  // Timing
  // Images
  description?: string;
  count?: number;
  locale?: string;
  origin?: string;
}
