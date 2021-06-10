import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { UserDataService } from '../../services/user/user.service';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {
  constructor(private dataService: UserDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
