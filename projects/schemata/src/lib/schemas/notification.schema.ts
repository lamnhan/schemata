import {BasicWithLocalization} from '../shared.type';

export interface Notification extends BasicWithLocalization {
  // Basic
  thumbnail?: string;
  content?: string;
  link?: string;
  schedule?: string;
}
