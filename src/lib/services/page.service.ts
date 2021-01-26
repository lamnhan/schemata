import {
  Ids,
  Status,
  Timing,
  Images,
  Content,
  Extras,
} from '../types/shared.type';

export interface Page extends Ids, Status, Timing, Images, Content, Extras {
  // Ids
  type?: string;
  // Status
  // Timing
  // Images
  excerpt?: string;
  // Content
  locale?: string;
  origin?: string;
  // Extras
}

export class PageService {
  constructor() {}
}
