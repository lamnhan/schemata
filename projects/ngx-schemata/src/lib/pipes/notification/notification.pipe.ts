import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { NotificationDataService } from '../../services/notification/notification.service';

@Pipe({
  name: 'notificationDataGet'
})
export class NotificationPipe implements PipeTransform {
  constructor(private dataService: NotificationDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
