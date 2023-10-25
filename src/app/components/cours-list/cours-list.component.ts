import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
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

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.coursService.getCourses().subscribe((data: Cours[]) => {
      this.courses = data;
    });
  }
}
