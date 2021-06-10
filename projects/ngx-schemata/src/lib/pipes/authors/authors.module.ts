import { NgModule } from '@angular/core';

import { AuthorsPipe } from './authors.pipe';

@NgModule({
  declarations: [AuthorsPipe],
  imports: [],
  exports: [AuthorsPipe]
})
export class AuthorsDataPipeModule {}
