import {Ids, Status, Timing} from '../types/shared.type';

export interface Option extends Ids, Status, Timing {
  // Ids
  // Status
  // Timing
  value: unknown;
}

export class OptionService {
  constructor() {}
}
