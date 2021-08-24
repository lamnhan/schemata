import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { OptionDataService } from '../../services/option/option.service';

@Pipe({
  name: 'optionDataGet'
})
export class OptionPipe implements PipeTransform {
  constructor(private dataService: OptionDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }}
