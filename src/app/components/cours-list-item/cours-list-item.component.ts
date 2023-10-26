import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { Tile } from 'src/app/models/tile';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
  selector: 'app-cours-list-item',
  templateUrl: './cours-list-item.component.html',
  styleUrls: ['./cours-list-item.component.scss'],
})
export class CoursListItemComponent implements OnInit {
  @Input() cours: Cours | undefined;
  @Output() snippetChange = new EventEmitter<Snippet>();

  snippets: Snippet[] = [];
  constructor(private snippetsService: SnippetService) {}
  code: string = '';
  id: string = '';
  description: string = '';
  explanation: string = '';
  tags: string = '';

  ngOnInit(): void {
    this.prepareSnippets();
    console.log(this.snippets);
  }

  receiveComments(commentData: Snippet) {
    this.snippetChange.emit(commentData);
  }

  prepareSnippets() {
    this.snippetsService.getSnippets().subscribe((data: Snippet[]) => {
      this.snippets = this.filteredSnippets(data);
    });
  }

  filteredSnippets(snippets: Snippet[]): Snippet[] {
    return snippets.filter(
      (snippet: Snippet) => snippet.courseId === this.cours?.id
    );
  }

  onSubmit() {
    const formData: Snippet = {
      id: '',
      code: this.code,
      courseId: this.cours!.id,
      description: this.description,
      explanation: this.explanation,
      tags: this.tags.split(','), // Assuming tags are comma-separated
      comments: [],
    };

    this.snippetsService.addSnippet(formData).subscribe((data) => {
      this.snippetsService.getSnippets().subscribe((data: Snippet[]) => {
        this.snippets = this.filteredSnippets(data);
      });
    });
  }
}
