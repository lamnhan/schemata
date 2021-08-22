import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { BundleDataService } from '../../services/bundle/bundle.service';

@Pipe({
  name: 'bundleDataList'
})
export class BundlesPipe implements PipeTransform {
  constructor(private dataService: BundleDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.list(ref => ref.limit(limit), caching);
  }
}
