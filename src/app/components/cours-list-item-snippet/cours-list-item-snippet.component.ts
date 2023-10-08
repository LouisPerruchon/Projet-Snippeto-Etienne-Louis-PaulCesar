import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Snippet } from 'src/app/models/snippet';

@Component({
  selector: 'app-cours-list-item-snippet',
  templateUrl: './cours-list-item-snippet.component.html',
  styleUrls: ['./cours-list-item-snippet.component.scss'],
})
export class CoursListItemSnippetComponent implements OnInit {
  constructor() {}
  @Input()
  snippet!: Snippet;
  isExpanded = false;

  expandToWholePage(): void {
    this.isExpanded = !this.isExpanded;
  }

  @HostListener('window:keydown.escape')
  closeExpandedDiv() {
    this.isExpanded = false;
  }

  ngOnInit(): void {}
}
