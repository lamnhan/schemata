import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { TagDataService } from '../../services/tag/tag.service';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {
  constructor(private dataService: TagDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
