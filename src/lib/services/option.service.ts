import {Ids, Timing} from '../types/shared.type';

export interface Option extends Ids, Timing {
  // Ids
  // Timing
  value: unknown;
}

export class OptionService {
  constructor() {}
}
