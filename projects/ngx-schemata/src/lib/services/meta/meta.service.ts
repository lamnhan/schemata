import { Injectable } from '@angular/core';
import { Meta } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService extends DatabaseData<Meta> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'metas');
  }
}
