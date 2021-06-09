import {Ids, Status, Timing, Images, Content} from '../shared.type';

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
