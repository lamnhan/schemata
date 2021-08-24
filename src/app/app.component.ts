import { Component } from '@angular/core';

import { LocalstorageService, AppService, MetaService, NavService, NavItem, SettingService } from '@lamnhan/ngx-useful';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems: NavItem[] = [
    {
      text: 'Guides',
      level: 0,
    },
      {
        text: 'Introduction',
        level: 1,
        routerLink: ['guide', 'introduction']
      },
      {
        text: 'For Angular',
        level: 1,
        routerLink: ['guide', 'ngx-schemata']
      },
      {
        text: 'Security helpers',
        level: 1,
        routerLink: ['guide', 'security-helpers']
      },
    {
      text: 'List of schemas',
      level: 0,
    },
      {
        text: 'Audio',
        level: 1,
        routerLink: ['schema', 'audio']
      },
      {
        text: 'Bundle',
        level: 1,
        routerLink: ['schema', 'bundle']
      },
      {
        text: 'Category',
        level: 1,
        routerLink: ['schema', 'category']
      },
      {
        text: 'Meta',
        level: 1,
        routerLink: ['schema', 'meta']
      },
      {
        text: 'Notification',
        level: 1,
        routerLink: ['schema', 'notification']
      },
      {
        text: 'Option',
        level: 1,
        routerLink: ['schema', 'option']
      },
      {
        text: 'Order',
        level: 1,
        routerLink: ['schema', 'order']
      },
      {
        text: 'Page',
        level: 1,
        routerLink: ['schema', 'page']
      },
      {
        text: 'Post',
        level: 1,
        routerLink: ['schema', 'post']
      },
      {
        text: 'Product',
        level: 1,
        routerLink: ['schema', 'product']
      },
      {
        text: 'Profile',
        level: 1,
        routerLink: ['schema', 'profile']
      },
      {
        text: 'Promotion',
        level: 1,
        routerLink: ['schema', 'promotion']
      },
      {
        text: 'Tag',
        level: 1,
        routerLink: ['schema', 'tag']
      },
      {
        text: 'Thread',
        level: 1,
        routerLink: ['schema', 'thread']
      },
      {
        text: 'User',
        level: 1,
        routerLink: ['schema', 'user']
      },
      {
        text: 'Video',
        level: 1,
        routerLink: ['schema', 'video']
      },
  ];

  
  constructor(
    private localstorageService: LocalstorageService,
    private appService: AppService,
    private metaService: MetaService,
    private navService: NavService,
    private settingService: SettingService,
  ) {
    this.initialize();
  }

  private initialize() {
    this.localstorageService.init();
    this.appService
      .setOptions({ splashScreen: true })
      .init();
    this.settingService
      .setOptions({
        browserColor: true,
        onReady: () => this.appService.hideSplashScreen(),
      })
      .setIntegrations({
        localstorageService: this.localstorageService,
      })
      .init();
    this.navService
      .setIntegrations({ settingService: this.settingService })
      .init();
    this.metaService
      .setIntegrations({ settingService: this.settingService })
      .init({
        locale: 'en-US',
        title: 'Schemata',
        description: 'Commonly used data models.',
        image: 'https://schemata.lamnhan.com/assets/images/featured.jpg',
        url: 'https://schemata.lamnhan.com/',
      });
  }
}
