import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { AuthorDataService } from '../../services/author/author.service';

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {
  constructor(private dataService: AuthorDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
