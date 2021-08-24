import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { PromotionDataService } from '../../services/promotion/promotion.service';

@Pipe({
  name: 'promotionDataGet'
})
export class PromotionPipe implements PipeTransform {
  constructor(private dataService: PromotionDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
