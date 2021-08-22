import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { PageDataService } from '../../services/page/page.service';

@Pipe({
  name: 'pageDataList'
})
export class PagesPipe implements PipeTransform {
  constructor(private dataService: PageDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.list(ref => ref.limit(limit), caching);
  }
}
