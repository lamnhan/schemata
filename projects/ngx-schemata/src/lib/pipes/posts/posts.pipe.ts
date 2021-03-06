import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { PostDataService } from '../../services/post/post.service';

@Pipe({
  name: 'posts'
})
export class PostsPipe implements PipeTransform {
  constructor(private dataService: PostDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
