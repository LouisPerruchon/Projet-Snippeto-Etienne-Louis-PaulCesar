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
    private snippetsService: SnippetService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.prepareSnippets();
  }

  openCreateSnippetDialog() {
    const dialogRef = this.dialog.open(SnippetCreationDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.submitForm(result);
      }
      // Handle the form data here
    });
  }
  receiveComments(commentData: Snippet) {
    this.snippetChange.emit(commentData);
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

  submitForm(formData: any) {
    const dataToPost: Snippet = {
      ...formData,
      courseId: this.cours!.id,
      comments: [],
    };

    this.snippetsService.addSnippet(dataToPost).subscribe((data) => {
      this.snippetChange.emit(dataToPost);
      this.snippetsService.getSnippets().subscribe((data: Snippet[]) => {
        this.snippets = this.filteredSnippets(data);
      });
    });
  }
}
