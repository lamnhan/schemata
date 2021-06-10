import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { NotificationDataService } from '../../services/notification/notification.service';

@Pipe({
  name: 'notifications'
})
export class NotificationsPipe implements PipeTransform {
  constructor(private dataService: NotificationDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
