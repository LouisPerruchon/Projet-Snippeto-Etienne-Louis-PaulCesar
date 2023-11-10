import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Snippet } from '../models/snippet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetService {
  private apiUrl = 'http://localhost:5555/snippets';
  constructor(private httpClient: HttpClient) {}

  addSnippet(snippet: Partial<Snippet>): Observable<any> {
    const response = this.httpClient.post<Snippet>(this.apiUrl, snippet);
    return response;
  }

  getSnippets(): Observable<Snippet[]> {
    const response = this.httpClient.get<Snippet[]>(this.apiUrl);
    return response;
  }

  patchSnippet(
    snippetId: string,
    partialSnippet: Partial<Snippet>
  ): Observable<Snippet> {
    const patchAPI = this.apiUrl + '/' + snippetId;
    const response = this.httpClient.patch<Snippet>(patchAPI, partialSnippet);
    return response;
  }
}
