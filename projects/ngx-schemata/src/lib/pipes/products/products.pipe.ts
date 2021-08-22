import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { ProductDataService } from '../../services/product/product.service';

@Pipe({
  name: 'productDataList'
})
export class ProductsPipe implements PipeTransform {
  constructor(private dataService: ProductDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.list(ref => ref.limit(limit), caching);
  }
}
