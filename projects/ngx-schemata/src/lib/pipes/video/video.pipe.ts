import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { VideoDataService } from '../../services/video/video.service';

@Pipe({
  name: 'videoDataItem'
})
export class VideoPipe implements PipeTransform {
  constructor(private dataService: VideoDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.getDoc(id, caching);
  }
}
