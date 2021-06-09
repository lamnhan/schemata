import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPageComponent } from './schema-page.component';

describe('SchemaPageComponent', () => {
  let component: SchemaPageComponent;
  let fixture: ComponentFixture<SchemaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
