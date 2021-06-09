import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { ProfileDataService } from '../../services/profile/profile.service';

@Pipe({
  name: 'profileDoc'
})
export class ProfilePipe implements PipeTransform {
  constructor(private dataService: ProfileDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.getDoc(id, caching);
  }
}
