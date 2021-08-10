import { Injectable } from '@angular/core';
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
        }
      }
    );
  }
}
