import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  LocalstorageService,
  AppService,
  MetaService,
  NavService,
  SettingService,
} from '@lamnhan/ngx-useful';

import {HeaderComponentModule} from './components/header/header.module';
import {FooterComponentModule} from './components/footer/footer.module';
import {MenuComponentModule} from './components/menu/menu.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponentModule,
    FooterComponentModule,
    MenuComponentModule,
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
