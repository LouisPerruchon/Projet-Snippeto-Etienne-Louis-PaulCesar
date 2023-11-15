import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { CoursService } from 'src/app/services/cours.service';
import { CoursCreationDialogComponent } from '../cours-creation-dialog/cours-creation-dialog.component';
import { SnippetService } from 'src/app/services/snippet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.scss'],
})
export class CoursListComponent implements OnInit {
  public panelOpenState: boolean = false;
  public selectedCours: Cours | undefined;
  public selectedSnippet: Snippet | undefined;
  public courses$: Observable<Cours[]> = this.coursService.courses$;

  constructor(
    private coursService: CoursService,
    private snippetsService: SnippetService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.snippetsService.getSnippets().subscribe();
    this.coursService.getCourses().subscribe();
  }

  public snippetChange(snippetData: Snippet | undefined): void {
    this.selectedSnippet = snippetData;
  }

  public coursChange(selectedCours: Cours | undefined): void {
    this.selectedCours = selectedCours;
  }

  public openCreateCoursDialog(): void {
    this.dialog.open(CoursCreationDialogComponent, {
      width: '50%',
    });
  }
}
