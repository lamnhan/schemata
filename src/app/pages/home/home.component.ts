import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  installContent =
`Install models:
\`\`\`sh
npm install --save @lamnhan/schemata@0.0.8
\`\`\`

For Angular app (services, pipes):
\`\`\`sh
npm install --save @lamnhan/ngx-schemata@0.0.1
\`\`\`
`;

  constructor() { }

  ngOnInit(): void {
  }

}
