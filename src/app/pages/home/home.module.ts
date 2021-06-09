import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkDirectiveModule } from '@lamnhan/ngx-useful';
import { NguixContentComponentModule } from '@lamnhan/nguix-starter';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterLinkDirectiveModule,
    NguixContentComponentModule,
    HomeRoutingModule
  ]
})
export class HomePageModule {}
