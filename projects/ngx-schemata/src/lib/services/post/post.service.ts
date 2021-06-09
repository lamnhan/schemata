import { Injectable } from '@angular/core';
import { Post } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class PostDataService extends DatabaseData<Post> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'posts');
  }
}
