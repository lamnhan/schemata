import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { PromotionDataService } from '../../services/promotion/promotion.service';

@Pipe({
  name: 'promotionDataList'
})
export class PromotionsPipe implements PipeTransform {
  constructor(private dataService: PromotionDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
