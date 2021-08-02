import { BasicWithLocalization, ResourceAlike } from '../shared.type';

export interface Notification extends BasicWithLocalization {
  // Basic
  thumbnails?: Record<string, ResourceAlike>;
  content?: string;
  link?: string;
  schedule?: string;
}
