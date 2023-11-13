import { Injectable } from '@angular/core';
import { Snippet } from '../models/snippet';
import { SnippetService } from './snippet.service';
import { Cours } from '../models/cours';

@Injectable({
  providedIn: 'root',
})
export class QcmGeneratorService {
  private cours: Cours[] = [];
  private tags: string[] = [];
  private snippets: Snippet[] = [];

  constructor(snippetService: SnippetService) {
    snippetService.getSnippets().subscribe((snippets) => {
      this.snippets = snippets;
    });
  }

  setCourses(cours: Cours[]): void {
    this.cours = cours;
  }

  setTags(tags: string[]): void {
    this.tags = tags;
  }

  getSnippetsFromCourses() : Snippet[] {
    return this.cours.flatMap(cour => cour.snippets);
  }

  getSnippetsFromTags() : Snippet[] {
    const filteredSnippets = this.snippets.filter((snippet) =>
      snippet.tags.some((tag) => this.tags.includes(tag))
    );
    return filteredSnippets
  }


}
