import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comment } from 'src/app/models/comment';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { Tile } from 'src/app/models/tile';
import { CoursService } from 'src/app/services/cours.service';
import { CoursCreationDialogComponent } from '../cours-creation-dialog/cours-creation-dialog.component';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.scss'],
})
export class CoursListComponent implements OnInit {
  courses: Cours[] = [];
  panelOpenState = false;
  selectedCours: Cours | undefined;
  commentSnippet: Snippet | undefined;
  tags = []

  constructor(private coursService: CoursService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.coursService.getCourses().subscribe((data: Cours[]) => {
      this.courses = data;
    });

   
  }

  receiveComments(snippetData: Snippet | undefined) {
    this.commentSnippet = snippetData;

    if (snippetData) {
      if (!snippetData.id) {
        this.coursService.getCourses().subscribe((data: Cours[]) => {
          this.courses = data;
          this.selectedCours = this.courses.find(
            (cours: Cours) => cours.id === snippetData.courseId
          );
        });
      }
    }
  }

  setSelectedCours(selectedCours: Cours) {
    if (selectedCours.id !== this.commentSnippet?.courseId)
      this.commentSnippet = undefined;
    this.selectedCours = selectedCours;
  }

  openCreateCoursDialog() {
    const dialogRef = this.dialog.open(CoursCreationDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.submitForm(result);
      }
      // Handle the form data here
    });
  }
  submitForm(formData: any) {
    const dataToPost: Cours = {
      ...formData,
    };

    this.coursService.addCours(dataToPost).subscribe((data) => {
      this.coursService.getCourses().subscribe((data: Cours[]) => {
        this.courses = data;
      });
    });
  }
}
