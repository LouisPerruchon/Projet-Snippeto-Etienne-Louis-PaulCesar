import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
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
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-cours-list-item',
  templateUrl: './cours-list-item.component.html',
  styleUrls: ['./cours-list-item.component.scss'],
})
export class CoursListItemComponent implements OnInit {
  @Input() cours: Cours | undefined;
  @Output() snippetChange = new EventEmitter<Snippet>();
  @Output() coursChange = new EventEmitter<Cours>();
  public filteredSnippets: Snippet[] = [];

  constructor(
    private coursService: CoursService,
    private snippetsService: SnippetService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.snippetsService.getSnippetsById(this.cours!.id).subscribe((data) => {
      this.filteredSnippets = data.reverse();
    });
  }

  public openCreateSnippetDialog(event: Event): void {
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

  public emitSnippet(snippetData: Snippet | undefined): void {
    this.snippetChange.emit(snippetData);
  }

  public emitCours(): void {
    setTimeout(() => {
      this.coursChange.emit(this.cours);
      this.snippetChange.emit(undefined);
    }, 500);
  }

  public resetSideBar(): void {
    setTimeout(() => {
      this.coursChange.emit(undefined);
      this.snippetChange.emit(undefined);
    }, 200);
  }

  private submitForm(formData: Partial<Snippet>): void {
    const dataToPost: Partial<Snippet> = {
      ...formData,
      courseId: this.cours!.id,
      comments: [],
    };

    this.snippetsService.addSnippet(dataToPost).subscribe((data: Snippet) => {
      this.snippetChange.emit(data);
    });
  }

  public openPatchCours(event: Event): void {
    event.stopPropagation();

    const partialCoursData: Partial<Cours> = {
      title: this.cours?.title,
      description: this.cours?.description,
      id: this.cours?.id,
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

  private patchCours(formData: Partial<Cours>): void {
    this.coursService.patchCours(this.cours!.id, formData).subscribe((data) => {
      this.cours = data;
    });
  }
}
