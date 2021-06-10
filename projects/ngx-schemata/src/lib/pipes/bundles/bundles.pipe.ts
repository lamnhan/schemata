import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { BundleDataService } from '../../services/bundle/bundle.service';

@Pipe({
  name: 'bundles'
})
export class BundlesPipe implements PipeTransform {
  constructor(private dataService: BundleDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
