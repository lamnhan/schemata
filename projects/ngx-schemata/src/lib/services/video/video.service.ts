import { Injectable } from '@angular/core';
import { Video } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService extends DatabaseData<Video> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'videos');
  }
}
