import {Ids, Status, Timing, Images} from '../shared.type';

export interface Category extends Ids, Status, Timing, Images {
  // Ids
  uid?: string;
  // Status
  // Timing
  // Images
  description?: string;
  count?: number;
  only?: string[]; // posts, pages, posts:post, posts:typex, ...
  locale?: string;
  origin?: string;
}
