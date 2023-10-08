import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursListItemSnippetComponent } from './cours-list-item-snippet.component';

describe('CoursListItemSnippetComponent', () => {
  let component: CoursListItemSnippetComponent;
  let fixture: ComponentFixture<CoursListItemSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursListItemSnippetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursListItemSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
