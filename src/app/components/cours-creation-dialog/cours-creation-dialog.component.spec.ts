import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursCreationDialogComponent } from './cours-creation-dialog.component';

describe('CoursCreationDialogComponent', () => {
  let component: CoursCreationDialogComponent;
  let fixture: ComponentFixture<CoursCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursCreationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
