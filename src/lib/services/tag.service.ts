import {Ids, Timing} from '../types/shared.type';

export interface Tag extends Ids, Timing {
  // Ids
  // Timing
  count?: number;
}

export class TagService {
  constructor() {}
}
