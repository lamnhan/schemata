import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { MetaDataService } from '../../services/meta/meta.service';

@Pipe({
  name: 'metaDataList'
})
export class MetasPipe implements PipeTransform {
  constructor(private dataService: MetaDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.list(ref => ref.limit(limit), caching);
  }
}
