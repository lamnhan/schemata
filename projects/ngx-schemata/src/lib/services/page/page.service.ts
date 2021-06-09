import { Injectable } from '@angular/core';
import { Page } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class PageDataService extends DatabaseData<Page> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'pages');
  }
}
