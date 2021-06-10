import { NgModule } from '@angular/core';

import { UserPipe } from './user.pipe';

@NgModule({
  declarations: [UserPipe],
  imports: [],
  exports: [UserPipe]
})
export class UserDataPipeModule {}
