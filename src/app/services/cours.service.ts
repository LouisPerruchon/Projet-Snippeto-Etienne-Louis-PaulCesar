import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Cours } from '../models/cours';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  private apiUrl = 'http://localhost:5000/courses';
  private coursSubject: BehaviorSubject<Cours[]> = new BehaviorSubject<Cours[]>(
    []
  );
  public courses$: Observable<Cours[]> = this.coursSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiUrl).pipe(
      tap((data) => {
        // Update the data in the service
        this.coursSubject.next(data);
      }),
      catchError((error) => {
        // Handle errors
        console.error('Error fetching data', error);
        throw error;
      })
    );
  }

  addCours(data: Partial<Cours>): Observable<any> {
    return this.http.post<Cours>(this.apiUrl, data).pipe(
      tap(() => {
        // After successfully posting, fetch the updated cours
        this.getCourses().subscribe((updatedCourses) => {
          // update the observable
          this.coursSubject.next(updatedCourses);
        });
      })
    );
  }

  patchCours(coursId: string, partialCours: Partial<Cours>): Observable<Cours> {
    const patchAPI = this.apiUrl + '/' + coursId;

    return this.http.patch<Cours>(patchAPI, partialCours).pipe(
      tap(() => {
        // After successfully patching, fetch the updated courses
        this.getCourses().subscribe((updatedCourses) => {
          // update the observable
          this.coursSubject.next(updatedCourses);
        });
      })
    );
  }
}
