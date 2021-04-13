import {AudioService} from './services/audio.service';
import {BundleService} from './services/bundle.service';
import {CategoryService} from './services/category.service';
import {NotificationService} from './services/notification.service';
import {OptionService} from './services/option.service';
import {OrderService} from './services/order.service';
import {PageService} from './services/page.service';
import {PostService} from './services/post.service';
import {ProductService} from './services/product.service';
import {PromotionService} from './services/promotion.service';
import {TagService} from './services/tag.service';
import {ThreadService} from './services/thread.service';
import {UserService} from './services/user.service';
import {ProfileService} from './services/profile.service';
import {VideoService} from './services/video.service';
import {MetaService} from './services/meta.service';
import {AuthorService} from './services/author.service';

export class Lib {
  public readonly audioService: AudioService;
  public readonly profileService: ProfileService;
  public readonly bundleService: BundleService;
  public readonly categoryService: CategoryService;
  public readonly notificationService: NotificationService;
  public readonly optionService: OptionService;
  public readonly orderService: OrderService;
  public readonly pageService: PageService;
  public readonly postService: PostService;
  public readonly productService: ProductService;
  public readonly promotionService: PromotionService;
  public readonly tagService: TagService;
  public readonly threadService: ThreadService;
  public readonly userService: UserService;
  public readonly videoService: VideoService;
  public readonly metaService: MetaService;
  public readonly authorService: AuthorService;

  constructor() {
    this.audioService = new AudioService();
    this.profileService = new ProfileService();
    this.bundleService = new BundleService();
    this.categoryService = new CategoryService();
    this.notificationService = new NotificationService();
    this.optionService = new OptionService();
    this.orderService = new OrderService();
    this.pageService = new PageService();
    this.postService = new PostService();
    this.productService = new ProductService();
    this.promotionService = new PromotionService();
    this.tagService = new TagService();
    this.threadService = new ThreadService();
    this.userService = new UserService();
    this.videoService = new VideoService();
    this.metaService = new MetaService();
    this.authorService = new AuthorService();
  }
}
