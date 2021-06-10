import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { PageDataService } from '../../services/page/page.service';

@Pipe({
  name: 'pages'
})
export class PagesPipe implements PipeTransform {
  constructor(private dataService: PageDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
