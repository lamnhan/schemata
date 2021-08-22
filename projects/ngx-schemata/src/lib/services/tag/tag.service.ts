import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
        linkingHook: (mode, item, context, dataService) => {
          // mode = create
          if (mode === 'create') {
            return dataService.update(
              item.id,
              { count: dataService.databaseService.getValueIncrement() },
              item,
            );
          }
          // mode = delete
          else if (mode === 'delete') {
            return dataService.update(
              item.id,
              { count: dataService.databaseService.getValueIncrement(-1) },
              item,
            );
          }
          // mode = update
          else {
            return of(false);
          }
        },
      }
    );
  }
}
