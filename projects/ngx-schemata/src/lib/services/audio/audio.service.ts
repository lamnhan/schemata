import { Injectable } from '@angular/core';
import { Audio } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class AudioDataService extends DatabaseData<Audio> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'audios',
      {
        updateEffects: [
          { collection: 'audios', key: 'relatedAudios' },
        ],
        linkingFields: [
          'createdAt',
          'thumbnails',
          'description',
          'duration',
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
