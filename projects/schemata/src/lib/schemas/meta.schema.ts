import {Ids, Status, Timing} from '../shared.type';

export interface Meta extends Ids, Status, Timing {
  // Ids
  master: string; // <collection>/<doc> (posts/post-1)
  uid?: string;
  type?: string;
  // Status
  // Timing
  value: unknown;
}
