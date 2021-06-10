import { NgModule } from '@angular/core';

import { UsersPipe } from './users.pipe';

@NgModule({
  declarations: [UsersPipe],
  imports: [],
  exports: [UsersPipe]
})
export class UsersDataPipeModule {}
