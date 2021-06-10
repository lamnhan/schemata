import { NgModule } from '@angular/core';

import { CategoriesPipe } from './categories.pipe';

@NgModule({
  declarations: [CategoriesPipe],
  imports: [],
  exports: [CategoriesPipe]
})
export class CategoriesDataPipeModule {}
