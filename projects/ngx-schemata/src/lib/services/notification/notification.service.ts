import { Injectable } from '@angular/core';
import { Notification } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class NotificationDataService extends DatabaseData<Notification> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'notifications');
  }
}
