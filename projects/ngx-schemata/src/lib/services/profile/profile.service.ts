import { Injectable } from '@angular/core';
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
        updateEffects: [
          { collection: 'profiles', key: 'relatedProfiles' },
          { collection: 'posts', key: 'authors' },
          { collection: 'audios', key: 'authors' },
          { collection: 'videos', key: 'authors' },
        ],
        linkingFields: [
          'createdAt',
          'thumbnails',
          'description',
          'badges',
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

