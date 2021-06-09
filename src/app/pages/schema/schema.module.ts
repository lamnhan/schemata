import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaPageComponentModule } from '../../components/schema-page/schema-page.module';

import { SchemaRoutingModule } from './schema-routing.module';
import { SchemaComponent } from './schema.component';

@NgModule({
  declarations: [
    SchemaComponent
  ],
  imports: [
    CommonModule,
    SchemaPageComponentModule,
    SchemaRoutingModule
  ]
})
export class SchemaPageModule {}
