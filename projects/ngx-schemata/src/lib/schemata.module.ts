import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { CategoryDataPipeModule } from './pipes/category/category.module';
import { CategoriesDataPipeModule } from './pipes/categories/categories.module';
import { TagDataPipeModule } from './pipes/tag/tag.module';
import { TagsDataPipeModule } from './pipes/tags/tags.module';
import { PageDataPipeModule } from './pipes/page/page.module';
import { PagesDataPipeModule } from './pipes/pages/pages.module';
import { PostDataPipeModule } from './pipes/post/post.module';
import { PostsDataPipeModule } from './pipes/posts/posts.module';
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

import { CategoryDataService } from './services/category/category.service';
import { TagDataService } from './services/tag/tag.service';
import { PageDataService } from './services/page/page.service';
import { PostDataService } from './services/post/post.service';
import { OptionDataService } from './services/option/option.service';
import { MetaDataService } from './services/meta/meta.service';
import { ProfileDataService } from './services/profile/profile.service';
import { UserDataService } from './services/user/user.service';
import { AudioDataService } from './services/audio/audio.service';
import { BundleDataService } from './services/bundle/bundle.service';
import { NotificationDataService } from './services/notification/notification.service';
import { OrderDataService } from './services/order/order.service';
import { ProductDataService } from './services/product/product.service';
import { PromotionDataService } from './services/promotion/promotion.service';
import { ThreadDataService } from './services/thread/thread.service';
import { VideoDataService } from './services/video/video.service';

import { CategoryState } from './states/category/category.state';
import { TagState } from './states/tag/tag.state';
import { PageState } from './states/page/page.state';
import { PostState } from './states/post/post.state';
import { OptionState } from './states/option/option.state';
import { MetaState } from './states/meta/meta.state';
import { ProfileState } from './states/profile/profile.state';
import { UserState } from './states/user/user.state';
import { AudioState } from './states/audio/audio.state';
import { BundleState } from './states/bundle/bundle.state';
import { NotificationState } from './states/notification/notification.state';
import { OrderState } from './states/order/order.state';
import { ProductState } from './states/product/product.state';
import { PromotionState } from './states/promotion/promotion.state';
import { ThreadState } from './states/thread/thread.state';
import { VideoState } from './states/video/video.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot(
      [
        CategoryState,
        TagState,
        PageState,
        PostState,
        OptionState,
        MetaState,
        ProfileState,
        UserState,
        AudioState,
        BundleState,
        NotificationState,
        OrderState,
        ProductState,
        PromotionState,
        ThreadState,
        VideoState,
      ],
      { developmentMode: false }
    ),
    CategoryDataPipeModule,
    CategoriesDataPipeModule,
    TagDataPipeModule,
    TagsDataPipeModule,
    PageDataPipeModule,
    PagesDataPipeModule,
    PostDataPipeModule,
    PostsDataPipeModule,
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
    ProfileDataService,
    UserDataService,
    AudioDataService,
    BundleDataService,
    NotificationDataService,
    OrderDataService,
    ProductDataService,
    PromotionDataService,
    ThreadDataService,
    VideoDataService,
  ],
  exports: [
    CategoryDataPipeModule,
    CategoriesDataPipeModule,
    TagDataPipeModule,
    TagsDataPipeModule,
    PageDataPipeModule,
    PagesDataPipeModule,
    PostDataPipeModule,
    PostsDataPipeModule,
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
  ]
})
export class SchemataModule {}
