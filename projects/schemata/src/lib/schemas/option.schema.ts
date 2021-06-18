import {Ids, Status, Timing} from '../shared.type';

export interface Option extends Ids, Status, Timing {
  // Ids
  uid?: string;
  // Status
  // Timing
  value: unknown;
}
