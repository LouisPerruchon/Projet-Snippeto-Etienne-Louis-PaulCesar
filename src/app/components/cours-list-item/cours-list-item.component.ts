import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { Tile } from 'src/app/models/tile';

@Component({
  selector: 'app-cours-list-item',
  templateUrl: './cours-list-item.component.html',
  styleUrls: ['./cours-list-item.component.scss'],
})
export class CoursListItemComponent implements OnInit {
  @Input() cours: Cours | undefined;

  ngOnInit(): void {
    console.log(this.cours);
  }
}
