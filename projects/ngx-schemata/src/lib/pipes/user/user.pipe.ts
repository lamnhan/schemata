import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { UserDataService } from '../../services/user/user.service';

@Pipe({
  name: 'userDataGet'
})
export class UserPipe implements PipeTransform {
  constructor(private dataService: UserDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
