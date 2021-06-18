import {Ids, Status, Timing, Authors, Images, Content} from '../shared.type';

export interface Page extends Ids, Status, Timing, Authors, Images, Content {
  // Ids
  uid?: string;
  type?: string;
  // Status
  // Timing
  // Authors
  // Images
  description?: string;
  // Content
  locale?: string;
  origin?: string;
}
