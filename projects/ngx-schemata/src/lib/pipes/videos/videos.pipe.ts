import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { VideoDataService } from '../../services/video/video.service';

@Pipe({
  name: 'videoDataList'
})
export class VideosPipe implements PipeTransform {
  constructor(private dataService: VideoDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
