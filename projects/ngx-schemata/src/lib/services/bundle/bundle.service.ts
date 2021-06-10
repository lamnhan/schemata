import { Injectable } from '@angular/core';
import { Bundle } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class BundleDataService extends DatabaseData<Bundle> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'bundles');
  }
}
