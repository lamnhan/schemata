import { Injectable } from '@angular/core';
import { Tag } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class TagDataService extends DatabaseData<Tag> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'tags',
      {
        updateEffects: [
          { collection: 'posts', key: 'tags' },
          { collection: 'audios', key: 'tags' },
          { collection: 'videos', key: 'tags' },
          { collection: 'profiles', key: 'tags' },
        ],
        linkingFields: [
          'count'
        ],
      }
    );
  }
}
