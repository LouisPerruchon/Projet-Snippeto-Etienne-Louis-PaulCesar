import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Snippet } from 'src/app/models/snippet';
import { SnippetCreationDialogComponent } from '../snippet-creation-dialog/snippet-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
  selector: 'app-cours-list-item-snippet',
  templateUrl: './cours-list-item-snippet.component.html',
  styleUrls: ['./cours-list-item-snippet.component.scss'],
})
export class CoursListItemSnippetComponent implements OnInit {
  @Input()
  snippet!: Snippet;
  @Output() snippetChange = new EventEmitter<Snippet>();

  constructor(
    private snippetsService: SnippetService,
    public dialog: MatDialog
  ) {}

  showComments() {
    setTimeout(() => {
      this.snippetChange.emit(this.snippet);
    }, 500);
  }

  hideComments() {
    setTimeout(() => {
      this.snippetChange.emit(undefined);
    }, 200);
  }

  ngOnInit(): void {}

  openPatchSnippet(event: Event) {
    event.stopPropagation();

    const partialSnippetData: Partial<Snippet> = {
      code: this.snippet?.code,
      description: this.snippet?.description,
      explanation: this.snippet?.explanation,
      tags: this.snippet?.tags,
    };

    const dialogRef = this.dialog.open(SnippetCreationDialogComponent, {
      width: '50%',
      data: partialSnippetData,
    });

    dialogRef.afterClosed().subscribe((result: Partial<Snippet>) => {
      if (result !== null) {
        this.patchSnippets(result);
      }
    });
  }

  patchSnippets(formData: Partial<Snippet>) {
    this.snippetsService
      .patchSnippet(this.snippet!.id, formData)
      .subscribe((data) => {
        this.snippet = data;
      });
  }
}
