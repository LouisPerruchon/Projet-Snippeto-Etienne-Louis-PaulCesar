import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursListItemComponent } from './cours-list-item.component';

describe('CoursListItemComponent', () => {
  let component: CoursListItemComponent;
  let fixture: ComponentFixture<CoursListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
