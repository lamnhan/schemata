import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Profile } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService extends DatabaseData<Profile> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'profiles',
      {
        manualDocumentCounting: true,
        manualSearchIndexing: true,
        updateEffects: [
          { collection: 'profiles', key: 'relatedProfiles' },
          { collection: 'posts', key: 'authors' },
          { collection: 'audios', key: 'authors' },
          { collection: 'videos', key: 'authors' },
          { collection: 'bundles', key: 'authors' },
        ],
        linkingFields: [
          'createdAt',
          'thumbnails',
          'description',
          'role',
          'rank',
          'legit',
          'badges',
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
          const { collection, data } = context;
          const countingName = `${collection}_${data.type}`;
          // mode = create
          if (mode === 'create') {
            return dataService.update(
              item.id,
              { [`counting.${countingName}`]: dataService.databaseService.getValueIncrement() },
              item,
            );
          }
          // mode = delete
          else if (mode === 'delete') {
            return dataService.update(
              item.id,
              { [`counting.${countingName}`]: dataService.databaseService.getValueIncrement(-1) },
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

