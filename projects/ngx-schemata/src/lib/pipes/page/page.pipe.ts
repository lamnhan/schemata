import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { PageDataService } from '../../services/page/page.service';

@Pipe({
  name: 'pageDataGet'
})
export class PagePipe implements PipeTransform {
  constructor(private dataService: PageDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
