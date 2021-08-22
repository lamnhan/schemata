import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { OrderDataService } from '../../services/order/order.service';

@Pipe({
  name: 'orderDataItem'
})
export class OrderPipe implements PipeTransform {
  constructor(private dataService: OrderDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
