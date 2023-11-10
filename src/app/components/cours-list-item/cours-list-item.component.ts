import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { SnippetService } from 'src/app/services/snippet.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SnippetCreationDialogComponent } from '../snippet-creation-dialog/snippet-creation-dialog.component';
import { CoursService } from 'src/app/services/cours.service';
import { CoursCreationDialogComponent } from '../cours-creation-dialog/cours-creation-dialog.component';

@Component({
  selector: 'app-cours-list-item',
  templateUrl: './cours-list-item.component.html',
  styleUrls: ['./cours-list-item.component.scss'],
})
export class CoursListItemComponent implements OnInit {
  @Input() cours: Cours | undefined;
  @Output() snippetChange = new EventEmitter<Snippet>();

  snippets: Snippet[] = [];
  constructor(
    private coursService: CoursService,
    private snippetsService: SnippetService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.prepareSnippets();
  }

  openCreateSnippetDialog(event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(SnippetCreationDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result: Partial<Snippet>) => {
      if (result !== null) {
        this.submitForm(result);
      }
    });
  }

  receiveComments(snippetData: Snippet | undefined) {
    this.snippetChange.emit(snippetData);
  }

  hideComments() {
    this.snippetChange.emit(undefined);
  }

  prepareSnippets() {
    this.snippetsService.getSnippets().subscribe((data: Snippet[]) => {
      this.snippets = this.filteredSnippets(data);
    });
  }

  filteredSnippets(snippets: Snippet[]): Snippet[] {
    return snippets.filter(
      (snippet: Snippet) => snippet.courseId === this.cours?.id
    );
  }

  submitForm(formData: Partial<Snippet>) {
    const dataToPost: Partial<Snippet> = {
      ...formData,
      courseId: this.cours!.id,
      comments: [],
    };

    this.snippetsService.addSnippet(dataToPost).subscribe((data: Snippet) => {
      this.snippetChange.emit(data);
      this.snippetsService.getSnippets().subscribe((data: Snippet[]) => {
        this.snippets = this.filteredSnippets(data);
      });
    });
  }

  openPatchCours(event: Event) {
    event.stopPropagation();

    const partialCoursData: Partial<Cours> = {
      title: this.cours?.title,
      description: this.cours?.description,
    };
    const dialogRef = this.dialog.open(CoursCreationDialogComponent, {
      width: '50%',
      data: partialCoursData,
    });

    dialogRef.afterClosed().subscribe((result: Partial<Cours>) => {
      if (result !== null) {
        this.patchCours(result);
      }
    });
  }

  patchCours(formData: Partial<Cours>) {
    this.coursService.patchCours(this.cours!.id, formData).subscribe((data) => {
      this.cours = data;
    });
  }
}
