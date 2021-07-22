import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { ThreadDataService } from '../../services/thread/thread.service';

@Pipe({
  name: 'threadDataList'
})
export class ThreadsPipe implements PipeTransform {
  constructor(private dataService: ThreadDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
