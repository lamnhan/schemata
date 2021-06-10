import { Injectable } from '@angular/core';
import { Product } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService extends DatabaseData<Product> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'products');
  }
}
