import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { TagDataService } from '../../services/tag/tag.service';

@Pipe({
  name: 'tagDataItem'
})
export class TagPipe implements PipeTransform {
  constructor(private dataService: TagDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
