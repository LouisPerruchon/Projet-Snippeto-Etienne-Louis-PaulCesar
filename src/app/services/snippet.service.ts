import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Snippet } from '../models/snippet';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetService {
  private apiUrl = 'http://localhost:5000/snippets';

  private snippetSubject: BehaviorSubject<Snippet[]> = new BehaviorSubject<
    Snippet[]
  >([]);
  public snippets$: Observable<Snippet[]> = this.snippetSubject.asObservable();

  private selectedSnippetSubject: BehaviorSubject<Snippet | null> =
    new BehaviorSubject<Snippet | null>(null);
  public selectedSnippet$: Observable<Snippet | null> =
    this.selectedSnippetSubject.asObservable();

  constructor(private httpClient: HttpClient) {}
  getSnippets(): Observable<Snippet[]> {
    return this.httpClient.get<Snippet[]>(this.apiUrl).pipe(
      tap((data) => {
        // Update the data in the service
        this.snippetSubject.next(data);
      }),
      catchError((error) => {
        // Handle errors
        console.error('Error fetching data', error);
        throw error;
      })
    );
  }

  addSnippet(snippet: Partial<Snippet>): Observable<any> {
    return this.httpClient.post<Snippet>(this.apiUrl, snippet).pipe(
      tap(() => {
        // After successfully posting, fetch the updated snippets
        this.getSnippets().subscribe((updatedSnippets) => {
          // update the observable
          this.snippetSubject.next(updatedSnippets);
        });
      })
    );
  }

  getSnippetsById(courseId: string): Observable<Snippet[]> {
    const result = this.snippets$.pipe(
      map((data) => {
        return data.filter((item: Snippet) => item.courseId === courseId);
      })
    );
    return result;
  }

  patchSnippet(
    snippetId: string | undefined,
    partialSnippet: Partial<Snippet>
  ): Observable<Snippet> {
    const patchAPI = this.apiUrl + '/' + snippetId;
    return this.httpClient.patch<Snippet>(patchAPI, partialSnippet).pipe(
      tap(() => {
        // After successfully patching, fetch the updated snippets
        this.getSnippets().subscribe((updatedSnippets) => {
          // update the observable
          this.snippetSubject.next(updatedSnippets);
        });
      })
    );
  }

  setSelectedSnippet(obj: Snippet | null): void {
    this.selectedSnippetSubject.next(obj);
  }
}
