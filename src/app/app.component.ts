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
        text: 'Category',
        level: 1,
        routerLink: ['schema', 'category']
      },
      {
        text: 'Tag',
        level: 1,
        routerLink: ['schema', 'tag']
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
    this.appService.init({ splashScreen: true });
    this.settingService.init(
      {
        browserColor: true,
        onReady: () => this.appService.hideSplashScreen(),
      },
      {},
      {
        localstorageService: this.localstorageService,
      },
    );
    this.navService.init(
      {},
      { settingService: this.settingService },
    );
    this.metaService.init(
      {
        title: 'Schemata',
        description: 'Commonly used data models.',
        image: 'https://schemata.lamnhan.com/assets/images/featured.jpg',
        url: 'https://schemata.lamnhan.com/',
        lang: 'en',
        ogLocale: 'en-US',
      },
      {},
      { settingService: this.settingService },
    );
  }
}
