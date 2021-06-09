import { Injectable } from '@angular/core';
import { Category } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService extends DatabaseData<Category> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'categories');
  }
}
