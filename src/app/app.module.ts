import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  LocalstorageService,
  AppService,
  MetaService,
  NavService,
  SettingService,
} from '@lamnhan/ngx-useful';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LocalstorageService,
    AppService,
    MetaService,
    NavService,
    SettingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
