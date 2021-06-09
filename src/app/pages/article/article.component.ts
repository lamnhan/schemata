import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public readonly contentSrc$ = this.activatedRoute.params.pipe(
    map(params => `/content/${params.id}.md`),
  );

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
