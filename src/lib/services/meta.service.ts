import {Ids, Status, Timing} from '../types/shared.type';

export interface Meta extends Ids, Status, Timing {
  // Ids
  // Status
  // Timing
  value: unknown;
}

export class MetaService {
  constructor() {}
}
