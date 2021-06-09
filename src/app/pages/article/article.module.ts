import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NguixContentComponentModule} from '@lamnhan/nguix-starter';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    NguixContentComponentModule,
    ArticleRoutingModule
  ]
})
export class ArticlePageModule {}
