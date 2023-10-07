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
    
  courses : Cours[] = []
  tiles: Tile[] = []

  constructor(private coursService : CoursService) {
    this.tiles = [
      {text: 'One', cols: 1, rows: 3, color: 'lightblue'},
      {text: 'Two', cols: 2, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 2, color: 'lightpink'},
      {text: 'Four', cols: 3, rows: 1, color: '#DDBDF1'},
    ];
    console.log(this.tiles);
  }
  

  ngOnInit(): void {
    console.log('test');
    this.coursService.getCourses().subscribe(
      (data: Cours[]) => 
      this.courses = data);
  }

}
