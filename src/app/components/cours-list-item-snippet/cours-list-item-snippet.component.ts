import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  @Output() snippetChange = new EventEmitter<Snippet>();

  showComments() {
    this.snippetChange.emit(this.snippet);
  }

  hideComments() {
    this.snippetChange.emit(undefined);
  }

  ngOnInit(): void {}
}
