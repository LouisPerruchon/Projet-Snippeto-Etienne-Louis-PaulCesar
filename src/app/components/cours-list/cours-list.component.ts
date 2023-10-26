import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { Tile } from 'src/app/models/tile';
import { CoursService } from 'src/app/services/cours.service';

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

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.coursService.getCourses().subscribe((data: Cours[]) => {
      this.courses = data;
    });
  }

  receiveComments(commentData: Snippet) {
    this.commentSnippet = commentData;
  }

  setSelectedCours(selectedCours: Cours) {
    this.selectedCours = selectedCours;
  }
}
