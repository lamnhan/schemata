import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-schema-page',
  templateUrl: './schema-page.component.html',
  styleUrls: ['./schema-page.component.scss']
})
export class SchemaPageComponent implements OnInit {
  @Input() name!: string;
  titleName = '';

  usageContent = '';
  securitySrc = '';
  apiSrc = '';

  constructor() { }

  ngOnInit(): void {
    this.titleName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
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
// import the pipe module
import { ${this.titleName}PipeModule } from '@lamnhan/ngx-schemata';
\`\`\`

\`\`\`html
<!-- use the pipe -->
<div *ngIf="'foo' | ${this.name} | async; let item">
  <h1>{{ item.title }}</h1>
</div>
\`\`\`
`;
    this.securitySrc = `/content/rules/${this.name}.md`;
    this.apiSrc = `https://raw.githubusercontent.com/lamnhan/schemata/main/docs/content/schemas/${this.name}.md`;
  }

}
