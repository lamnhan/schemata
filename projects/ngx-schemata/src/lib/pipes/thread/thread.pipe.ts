import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { ThreadDataService } from '../../services/thread/thread.service';

@Pipe({
  name: 'threadDataGet'
})
export class ThreadPipe implements PipeTransform {
  constructor(private dataService: ThreadDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
