import { Injectable } from '@angular/core';
import { Promotion } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class PromotionDataService extends DatabaseData<Promotion> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'promotions');
  }
}
