import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), pathMatch: 'full' },
  { path: 'article/:id', loadChildren: () => import('./pages/article/article.module').then(m => m.ArticlePageModule) },
  { path: '**', loadChildren: () => import('@lamnhan/nguix-starter').then(m => m.NguixOopsPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
