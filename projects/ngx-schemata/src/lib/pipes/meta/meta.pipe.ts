import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { MetaDataService } from '../../services/meta/meta.service';

@Pipe({
  name: 'metaDataItem'
})
export class MetaPipe implements PipeTransform {
  constructor(private dataService: MetaDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.getDoc(id, caching);
  }
}
