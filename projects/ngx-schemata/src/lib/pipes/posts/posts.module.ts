import { NgModule } from '@angular/core';

import { PostsPipe } from './posts.pipe';

@NgModule({
  declarations: [PostsPipe],
  imports: [],
  exports: [PostsPipe]
})
export class PostsDataPipeModule {}
