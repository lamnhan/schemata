import {Ids, Status, Timing, Images} from '../types/shared.type';

export interface Category extends Ids, Status, Timing, Images {
  // Ids
  // Status
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
