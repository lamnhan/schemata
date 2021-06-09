import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {
  public readonly schemaName$ = this.activatedRoute.params.pipe(
    map(params => params.id),
  );

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
