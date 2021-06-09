import { Injectable } from '@angular/core';
import { Author } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class AuthorDataService extends DatabaseData<Author> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'authors');
  }
}
