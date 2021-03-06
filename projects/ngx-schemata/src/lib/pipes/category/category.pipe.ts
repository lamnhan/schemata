import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { CategoryDataService } from '../../services/category/category.service';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  constructor(private dataService: CategoryDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.getDoc(id, caching);
  }
}
