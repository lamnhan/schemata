import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { CategoryDataService } from '../../services/category/category.service';

@Pipe({
  name: 'categoryDataList'
})
export class CategoriesPipe implements PipeTransform {
  constructor(private dataService: CategoryDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
