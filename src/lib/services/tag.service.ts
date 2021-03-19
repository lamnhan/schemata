import {Ids, Status, Timing} from '../types/shared.type';

export interface Tag extends Ids, Status, Timing {
  // Ids
  // Status
  // Timing
  count?: number;
}

export class TagService {
  constructor() {}
}
