import { NgModule } from '@angular/core';

import { OrdersPipe } from './orders.pipe';

@NgModule({
  declarations: [OrdersPipe],
  imports: [],
  exports: [OrdersPipe]
})
export class OrdersDataPipeModule {}
