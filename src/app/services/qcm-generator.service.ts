import { Injectable } from '@angular/core';
import { Snippet } from '../models/snippet';
import { SnippetService } from './snippet.service';
import { Cours } from '../models/cours';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QcmGeneratorService {
  private apiUrl = 'http://localhost:5000/snippets';
  private cours: Cours[] = [];
  private tags: string[] = [];
  private snippets: Snippet[] = [];

  private snippetsToLearnSubject: BehaviorSubject<Snippet[]> =
    new BehaviorSubject<Snippet[]>([]);
  public snippetsToLearn$: Observable<Snippet[]> =
    this.snippetsToLearnSubject.asObservable();

  constructor(private httpClient: HttpClient, snippetService: SnippetService) {}

  getSnippetsToLearn(): Observable<Snippet[]> {
    return this.httpClient.get<Snippet[]>(this.apiUrl).pipe(
      tap((data) => {
        this.snippetsToLearnSubject.next([]);
        this.snippets = data;
      })
    );
  }

  getSnippetsToLearnByCourses(): Observable<Snippet[]> {
    const result = this.snippetsToLearn$.pipe(
      map((data) => {
        return data.filter((item: Snippet) =>
          this.cours.map((item) => item.id).includes(item.courseId)
        );
      })
    );
    return result;
  }

  getLearningSnippetsFromTags(tags: string[]): void {
    const result = this.snippets.filter((item: Snippet) => {
      return tags.some((tag) => item.tags.includes(tag));
    });
    this.snippetsToLearnSubject.next(result);
  }

  getLearningSnippetsFromCourses(courses: Cours[]): void {
    const result = this.snippets.filter((item: Snippet) =>
      courses.map((item) => item.id).includes(item.courseId)
    );

    this.snippetsToLearnSubject.next(result);
  }
}
