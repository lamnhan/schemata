import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { ProductDataService } from '../../services/product/product.service';

@Pipe({
  name: 'productDataItem'
})
export class ProductPipe implements PipeTransform {
  constructor(private dataService: ProductDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.getDoc(id, caching);
  }
}
