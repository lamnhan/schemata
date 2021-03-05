import {Ids, Images} from '../types/shared.type';

export interface Category extends Ids, Images {
  // Ids
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
