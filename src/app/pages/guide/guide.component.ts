import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  public readonly contentSrc$ = this.activatedRoute.params.pipe(
    map(params => `/content/guides/${params.id}.md`),
  );

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
