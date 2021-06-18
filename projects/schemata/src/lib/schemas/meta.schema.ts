import {Ids, Status, Timing} from '../shared.type';

export interface Meta extends Ids, Status, Timing {
  // Ids
  uid?: string;
  // Status
  // Timing
  value: unknown;
}
