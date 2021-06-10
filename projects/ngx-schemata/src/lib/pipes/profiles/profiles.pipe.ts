import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { ProfileDataService } from '../../services/profile/profile.service';

@Pipe({
  name: 'profiles'
})
export class ProfilesPipe implements PipeTransform {
  constructor(private dataService: ProfileDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
