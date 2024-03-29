import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Category } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService extends DatabaseData<Category> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'categories',
      {
        updateEffects: [
          { collection: 'posts', key: 'categories' },
          { collection: 'audios', key: 'categories' },
          { collection: 'audios', key: 'genres' },
          { collection: 'videos', key: 'categories' },
          { collection: 'profiles', key: 'categories' },
        ],
        linkingFields: [
          'thumbnails',
          'description',
          'count'
        ],
        effectDataPickers: {
          thumbnails: data => (!data ? undefined : {
            default: {
              name: 'default',
              src: (data.md || data.default).src,
            }
          }),
        },
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
