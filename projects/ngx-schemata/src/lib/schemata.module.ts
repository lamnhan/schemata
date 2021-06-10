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
import { AudioDataPipeModule } from './pipes/audio/audio.module';
import { AudiosDataPipeModule } from './pipes/audios/audios.module';
import { BundleDataPipeModule } from './pipes/bundle/bundle.module';
import { BundlesDataPipeModule } from './pipes/bundles/bundles.module';
import { NotificationDataPipeModule } from './pipes/notification/notification.module';
import { NotificationsDataPipeModule } from './pipes/notifications/notifications.module';
import { OrderDataPipeModule } from './pipes/order/order.module';
import { OrdersDataPipeModule } from './pipes/orders/orders.module';
import { ProductDataPipeModule } from './pipes/product/product.module';
import { ProductsDataPipeModule } from './pipes/products/products.module';
import { PromotionDataPipeModule } from './pipes/promotion/promotion.module';
import { PromotionsDataPipeModule } from './pipes/promotions/promotions.module';
import { ThreadDataPipeModule } from './pipes/thread/thread.module';
import { ThreadsDataPipeModule } from './pipes/threads/threads.module';
import { VideoDataPipeModule } from './pipes/video/video.module';
import { VideosDataPipeModule } from './pipes/videos/videos.module';

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
    AudioDataPipeModule,
    AudiosDataPipeModule,
    BundleDataPipeModule,
    BundlesDataPipeModule,
    NotificationDataPipeModule,
    NotificationsDataPipeModule,
    OrderDataPipeModule,
    OrdersDataPipeModule,
    ProductDataPipeModule,
    ProductsDataPipeModule,
    PromotionDataPipeModule,
    PromotionsDataPipeModule,
    ThreadDataPipeModule,
    ThreadsDataPipeModule,
    VideoDataPipeModule,
    VideosDataPipeModule,
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
    AudioDataPipeModule,
    AudiosDataPipeModule,
    BundleDataPipeModule,
    BundlesDataPipeModule,
    NotificationDataPipeModule,
    NotificationsDataPipeModule,
    OrderDataPipeModule,
    OrdersDataPipeModule,
    ProductDataPipeModule,
    ProductsDataPipeModule,
    PromotionDataPipeModule,
    PromotionsDataPipeModule,
    ThreadDataPipeModule,
    ThreadsDataPipeModule,
    VideoDataPipeModule,
    VideosDataPipeModule,
  ]
})
export class SchemataModule {}
