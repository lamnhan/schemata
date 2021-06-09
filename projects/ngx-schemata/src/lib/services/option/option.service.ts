import { Injectable } from '@angular/core';
import { Option } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class OptionDataService extends DatabaseData<Option> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'options');
  }
}
