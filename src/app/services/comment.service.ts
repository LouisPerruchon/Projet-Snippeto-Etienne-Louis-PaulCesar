import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:5000/comments';

  private commentSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<
    Comment[]
  >([]);
  public comments$: Observable<Comment[]> = this.commentSubject.asObservable();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl).pipe(
      tap((data) => {
        // Update the data in the service
        this.commentSubject.next(data);
        this._snackBar.open('Comments have been refreshed', 'OK', {
          duration: 1500,
        });
      }),
      catchError((error) => {
        // Handle errors
        console.error('Error fetching data', error);
        this._snackBar.open('Error fetching comments', 'OK', {
          duration: 1500,
        });
        throw error;
      })
    );
  }
  getCommentBySnippetId(snippetId: string): Observable<Comment[]> {
    return this.comments$.pipe(
      map((data) => {
        return data.filter((item: Comment) => item.snippet_id === snippetId);
      })
    );
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post<Comment>(this.apiUrl, comment).pipe(
      tap(() => {
        // After successfully posting, fetch the updated snippets
        this.getComments().subscribe((updatedSnippets) => {
          // Assuming this.getSnippets() returns an observable, you can update the observable
          this.commentSubject.next(updatedSnippets);
          this._snackBar.open('Comment has been successfully added', 'OK', {
            duration: 1500,
          });
        });
      })
    );
  }
}
