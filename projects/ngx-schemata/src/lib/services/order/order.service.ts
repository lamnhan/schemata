import { Injectable } from '@angular/core';
import { Order } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService extends DatabaseData<Order> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'orders');
  }
}
