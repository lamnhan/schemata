import { NgModule } from '@angular/core';

import { CategoryDataPipeModule } from './pipes/category/category.module';
import { CategoriesDataPipeModule } from './pipes/categories/categories.module';
import { TagDataPipeModule } from './pipes/tag/tag.module';
import { TagsDataPipeModule } from './pipes/tags/tags.module';
import { PageDataPipeModule } from './pipes/page/page.module';
import { PagesDataPipeModule } from './pipes/pages/pages.module';
import { PostDataPipeModule } from './pipes/post/post.module';
import { PostsDataPipeModule } from './pipes/posts/posts.module';
import { AuthorDataPipeModule } from './pipes/author/author.module';
import { AuthorsDataPipeModule } from './pipes/authors/authors.module';
import { ProfileDataPipeModule } from './pipes/profile/profile.module';
import { ProfilesDataPipeModule } from './pipes/profiles/profiles.module';
import { MetaDataPipeModule } from './pipes/meta/meta.module';
import { MetasDataPipeModule } from './pipes/metas/metas.module';
import { OptionDataPipeModule } from './pipes/option/option.module';
import { OptionsDataPipeModule } from './pipes/options/options.module';
import { UserDataPipeModule } from './pipes/user/user.module';
import { UsersDataPipeModule } from './pipes/users/users.module';

import {CategoryDataService} from './services/category/category.service';
import {TagDataService} from './services/tag/tag.service';
import {PageDataService} from './services/page/page.service';
import {PostDataService} from './services/post/post.service';
import {OptionDataService} from './services/option/option.service';
import {MetaDataService} from './services/meta/meta.service';
import {AuthorDataService} from './services/author/author.service';
import {ProfileDataService} from './services/profile/profile.service';
import {UserDataService} from './services/user/user.service';

@NgModule({
  declarations: [],
  imports: [
    CategoryDataPipeModule,
    CategoriesDataPipeModule,
    TagDataPipeModule,
    TagsDataPipeModule,
    PageDataPipeModule,
    PagesDataPipeModule,
    PostDataPipeModule,
    PostsDataPipeModule,
    AuthorDataPipeModule,
    AuthorsDataPipeModule,
    ProfileDataPipeModule,
    ProfilesDataPipeModule,
    MetaDataPipeModule,
    MetasDataPipeModule,
    OptionDataPipeModule,
    OptionsDataPipeModule,
    UserDataPipeModule,
    UsersDataPipeModule,
  ],
  providers: [
    CategoryDataService,
    TagDataService,
    PageDataService,
    PostDataService,
    OptionDataService,
    MetaDataService,
    AuthorDataService,
    ProfileDataService,
    UserDataService,
  ],
  exports: [
    CategoryDataPipeModule,
    TagDataPipeModule,
    PageDataPipeModule,
    PostDataPipeModule,
    AuthorDataPipeModule,
    ProfileDataPipeModule,
    MetaDataPipeModule,
    OptionDataPipeModule,
    UserDataPipeModule,
  ]
})
export class SchemataModule {}
