import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NguixContentComponentModule} from '@lamnhan/nguix-starter';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';


@NgModule({
  declarations: [
    GuideComponent
  ],
  imports: [
    CommonModule,
    NguixContentComponentModule,
    GuideRoutingModule
  ]
})
export class GuidePageModule { }
