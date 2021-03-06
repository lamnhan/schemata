import {Ids, Status, Timing} from '../shared.type';

export interface Notification extends Ids, Status, Timing {
  // Ids
  uid?: string;
  // Status
  // Timing
  thumbnail?: string;
  content?: string;
  link?: string;
  schedule?: string;
  locale?: string;
  origin?: string;
}
