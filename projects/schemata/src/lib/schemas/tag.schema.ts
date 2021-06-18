import {Ids, Status, Timing} from '../shared.type';

export interface Tag extends Ids, Status, Timing {
  // Ids
  uid?: string;
  // Status
  // Timing
  count?: number;
}
