import { Injectable } from '@angular/core';
import { Thread } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class ThreadDataService extends DatabaseData<Thread> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'threads');
  }
}
