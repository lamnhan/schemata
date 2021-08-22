import { Pipe, PipeTransform } from '@angular/core';
import { CacheConfig } from '@lamnhan/ngx-useful';

import { AudioDataService } from '../../services/audio/audio.service';

@Pipe({
  name: 'audioDataItem'
})
export class AudioPipe implements PipeTransform {
  constructor(private dataService: AudioDataService) {}
  transform(id: string, caching?: false | CacheConfig) {
    return this.dataService.get(id, caching);
  }
}
