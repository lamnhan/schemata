import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Bundle } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class BundleDataService extends DatabaseData<Bundle> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'bundles',
      {
        updateEffects: [
          { collection: 'bundles', key: 'relatedBundles' },
          { collection: 'posts', key: 'parents' },
          { collection: 'audios', key: 'parents' },
          { collection: 'videos', key: 'parents' },
        ],
        linkingFields: [
          'createdAt',
          'thumbnails',
          'description',
          'count',
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
