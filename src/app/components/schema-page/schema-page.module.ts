import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkDirectiveModule } from '@lamnhan/ngx-useful';
import { NguixContentComponentModule } from '@lamnhan/nguix-starter';

import { SchemaPageComponent } from './schema-page.component';

@NgModule({
  declarations: [SchemaPageComponent],
  imports: [
    CommonModule,
    RouterLinkDirectiveModule,
    NguixContentComponentModule,
  ],
  exports: [SchemaPageComponent]
})
export class SchemaPageComponentModule { }
