import { Injectable } from '@angular/core';
import { Profile } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService extends DatabaseData<Profile> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'profiles');
  }
}

