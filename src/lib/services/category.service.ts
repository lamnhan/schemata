import {Ids, Timing, Images} from '../types/shared.type';

export interface Category extends Ids, Timing, Images {
  // Ids
  // Timing
  // Images
  description?: string;
  count?: number;
  only?: string | string[];
  locale?: string;
  origin?: string;
}

export class CategoryService {
  constructor() {}
}
