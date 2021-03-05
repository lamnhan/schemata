import {Ids, Status, Timing, Images, Content} from '../types/shared.type';

export interface Page extends Ids, Status, Timing, Images, Content {
  // Ids
  type?: string;
  // Status
  // Timing
  // Images
  excerpt?: string;
  // Content
  locale?: string;
  origin?: string;
}

export class PageService {
  constructor() {}
}
