import {Ids, Status, Timing, Images} from '../types/shared.type';

export interface Category extends Ids, Status, Timing, Images {
  // Ids
  // Status
  // Timing
  // Images
  description?: string;
  count?: number;
  only?: string[]; // posts, pages, posts:post, posts:typex, ...
  locale?: string;
  origin?: string;
}

export class CategoryService {
  constructor() {}
}
