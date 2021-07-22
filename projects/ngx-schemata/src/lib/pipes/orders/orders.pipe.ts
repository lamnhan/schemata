import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { OrderDataService } from '../../services/order/order.service';

@Pipe({
  name: 'orderDataList'
})
export class OrdersPipe implements PipeTransform {
  constructor(private dataService: OrderDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
