import {Ids, Timing} from '../types/shared.type';

export interface Meta extends Ids, Timing {
  // Ids
  // Timing
  value: unknown;
}

export class MetaService {
  constructor() {}
}
