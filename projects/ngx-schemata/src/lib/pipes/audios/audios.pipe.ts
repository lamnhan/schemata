import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { AudioDataService } from '../../services/audio/audio.service';

@Pipe({
  name: 'audioDataList'
})
export class AudiosPipe implements PipeTransform {
  constructor(private dataService: AudioDataService) {}
  transform(limit: number, caching?: false | CacheConfig) {
    return this.dataService.getCollection(ref => ref.limit(limit), caching);
  }
}
