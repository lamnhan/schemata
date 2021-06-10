# Schemata

Commonly used data models.

[![License][license_badge]][license_url] [![Support me on Patreon][patreon_badge]][patreon_url] [![PayPal][paypal_donate_badge]][paypal_donate_url] [![Ask me anything][ask_me_badge]][ask_me_url]

[license_badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[license_url]: https://github.com/lamnhan/schemata/blob/master/LICENSE
[patreon_badge]: https://lamnhan.com/assets/badges/patreon.svg
[patreon_url]: https://www.patreon.com/lamnhan
[paypal_donate_badge]: https://lamnhan.com/assets/badges/paypal_donate.svg
[paypal_donate_url]: https://www.paypal.me/lamnhan
[ask_me_badge]: https://img.shields.io/badge/ask/me-anything-1abc9c.svg
[ask_me_url]: https://m.me/lamhiennhan

## Install & usage

- Interface package:

```sh
npm install --save @lamnhan/schemata
```

Use the interface:

```ts
import { Post } from '@lamnhan/schemata';

const posts: Post[] = [];
const recordPosts: Record<string, Post> = {};
const post: Post = {
  id: '...',
  title: '...',
};
```

- Angular utilities:

```sh
npm install --save @lamnhan/ngx-schemata
```

Use services:

```ts
import { PostDataService } from '@lamnhan/ngx-schemata';

class Foo {
  public readonly posts$ = this.postDataService.getCollection();
  public readonly post$ = this.postDataService.getDoc('foo');
}
```

Use pipes:

```ts
// listing pipe
import { PostsDataPipeModule } from '@lamnhan/ngx-schemata';
// getting pipe
import { PostDataPipeModule } from '@lamnhan/ngx-schemata';
```

```html
<!-- listing -->
<div *ngIf="10 | posts | async; let items">
  <ul *ngIf="items.length">
    <li *ngFor="let item of items">{{ item.title }}</li>
  </ul>
</div>

<!-- getting -->
<div *ngIf="'foo' | post | async; let item">
  <h1>{{ item.title }}</h1>
</div>
```

## Models

### :blue_heart: Category `categories` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/category.service.ts)

### :blue_heart: Tag `tags` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/tag.service.ts)

### :blue_heart: Page `pages` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/page.service.ts)

### :blue_heart: Post `posts` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/post.service.ts)

### :blue_heart: Author `authors` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/author.service.ts)

### :blue_heart: Thread `threads` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/thread.service.ts)

### :blue_heart: User `users` :x:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/user.service.ts)

### :blue_heart: Option `options` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/option.service.ts)

### :green_heart: Bundle `bundles` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/bundle.service.ts)

### :green_heart: Audio `audios` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/audio.service.ts)
### :green_heart: Video `videos` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/video.service.ts)

### :green_heart: Product `products` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/product.service.ts)

### :heart: Order `orders` :x:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/order.service.ts)

### :purple_heart: Notification `notifications` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/notification.service.ts)

### :purple_heart: Promotion `promotions` :earth_asia:

[Source](https://github.com/sheetbase/models/blob/master/src/lib/services/promotion.service.ts)

## License

**@lamnhan/schemata** is released under the [MIT](https://github.com/lamnhan/schemata/blob/master/LICENSE) license.
