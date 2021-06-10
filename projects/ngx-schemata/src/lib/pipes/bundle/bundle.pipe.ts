import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { BundleDataService } from '../../services/bundle/bundle.service';

@Pipe({
  name: 'bundle'
})
export class BundlePipe implements PipeTransform {
  constructor(private dataService: BundleDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.getDoc(id, caching);
  }
}
