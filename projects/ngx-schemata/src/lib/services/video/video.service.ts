import { Injectable } from '@angular/core';
import { Video } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService extends DatabaseData<Video> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'videos',
      {
        updateEffects: [
          { collection: 'videos', key: 'relatedVideos' },
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
