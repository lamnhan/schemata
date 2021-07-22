import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { OptionDataService } from '../../services/option/option.service';

@Pipe({
  name: 'optionDataList'
})
export class OptionsPipe implements PipeTransform {
  constructor(private dataService: OptionDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
