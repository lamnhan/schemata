import { NgModule } from '@angular/core';

import { ProductsPipe } from './products.pipe';

@NgModule({
  declarations: [ProductsPipe],
  imports: [],
  exports: [ProductsPipe]
})
export class ProductsDataPipeModule {}
