import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { PostDataService } from '../../services/post/post.service';

@Pipe({
  name: 'postDataItem'
})
export class PostPipe implements PipeTransform {
  constructor(private dataService: PostDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
