import { Basic } from '../shared.type';

export interface Meta extends Basic {
  // Basic
  master: string; // collection, collection#doc
  group?: string;
  value: any;
}
