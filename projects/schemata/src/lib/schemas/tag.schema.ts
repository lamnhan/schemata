import { Minimum, Basic } from '../shared.type';

export interface TagLite extends Minimum {
  // Minimum
  count?: number;
}

export interface Tag extends Basic {
  // Basic
  count?: number;
}
