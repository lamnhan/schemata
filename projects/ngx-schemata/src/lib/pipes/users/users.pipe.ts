import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { UserDataService } from '../../services/user/user.service';

@Pipe({
  name: 'userDataList'
})
export class UsersPipe implements PipeTransform {
  constructor(private dataService: UserDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.list(ref => ref.limit(limit), caching);
  }
}
