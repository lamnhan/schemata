import { Injectable } from '@angular/core';
import { Post } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class PostDataService extends DatabaseData<Post> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'posts',
      {
        updateEffects: [
          { collection: 'posts', key: 'relatedPosts' },
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
