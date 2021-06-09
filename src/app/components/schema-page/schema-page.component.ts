import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as pluralize from 'pluralize';

@Component({
  selector: 'app-schema-page',
  templateUrl: './schema-page.component.html',
  styleUrls: ['./schema-page.component.scss']
})
export class SchemaPageComponent implements OnInit, OnChanges {
  @Input() name!: string;
  titleName = '';
  pluralName = '';
  pluralTitleName = '';
  collectionUrl = '';

  usageContent = '';
  securitySrc = '';
  apiSrc = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.titleName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.pluralName = pluralize(this.name);
    this.pluralTitleName = this.pluralName.charAt(0).toUpperCase() + this.pluralName.slice(1);
    this.collectionUrl = `https://console.firebase.google.com/project/[PROJECT_ID]/firestore/data~2F${this.pluralName}`;
    this.usageContent =
`
Use the interface:
\`\`\`ts
import { ${this.titleName} } from '@lamnhan/schemata';

const list: ${this.titleName}[] = [];
const item: ${this.titleName} = {
  id: '...',
  title: '...'
};
\`\`\`

Use the service ([@lamnhan/ngx-schemata](/guide/ngx-schemata)):
\`\`\`ts
import { ${this.titleName}Service } from '@lamnhan/ngx-schemata';

// inject the service
constructor(private ${this.name}Service: ${this.titleName}Service) {}

// use methods
public readonly list$ = this.${this.name}Service.flatCollection();
\`\`\`

Use the pipe ([@lamnhan/ngx-schemata](/guide/ngx-schemata)):
\`\`\`ts
// listing pipe
import { ${this.pluralTitleName}PipeModule } from '@lamnhan/ngx-schemata';
// getting pipe
import { ${this.titleName}PipeModule } from '@lamnhan/ngx-schemata';
\`\`\`

\`\`\`html
<!-- listing -->
<div *ngIf="queryFn | ${this.pluralName} | async; let items">
  <ul *ngIf="items.length">
    <li *ngFor="let item of items">{{ item.title }}</li>
  </ul>
</div>

<!-- getting -->
<div *ngIf="'foo' | ${this.name} | async; let item">
  <h1>{{ item.title }}</h1>
</div>
\`\`\`
`;
    this.securitySrc = `/content/rules/${this.name}.md`;
    this.apiSrc = `https://raw.githubusercontent.com/lamnhan/schemata/main/docs/content/schemas/${this.name}.md`;
  }

}
