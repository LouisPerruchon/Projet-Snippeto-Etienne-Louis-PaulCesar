import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetCreationDialogComponent } from './snippet-creation-dialog.component';

describe('SnippetCreationDialogComponent', () => {
  let component: SnippetCreationDialogComponent;
  let fixture: ComponentFixture<SnippetCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetCreationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnippetCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
