import {Ids} from '../types/shared.type';

export interface Notification extends Ids {
  // Ids
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
