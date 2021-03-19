import {Ids, Status, Timing} from '../types/shared.type';

export interface Notification extends Ids, Status, Timing {
  // Ids
  // Status
  // Timing
  thumbnail?: string;
  content?: string;
  link?: string;
  schedule?: string | number;
  locale?: string;
  origin?: string;
}

export class NotificationService {
  constructor() {}
}
