import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:5555/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    const response = this.http.get<Comment[]>(this.apiUrl);
    return response;
  }

  addComment(comment: Comment): Observable<any> {
    const response = this.http.post<Comment>(this.apiUrl, comment);
    return response;
  }
}
