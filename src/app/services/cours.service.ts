import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  private apiUrl = 'http://localhost:5555/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Cours[]> {
    const response = this.http.get<Cours[]>(this.apiUrl);
    return response;
  }

  addCours(data: Partial<Cours>): Observable<any> {
    const response = this.http.post<Cours>(this.apiUrl, data);
    return response;
  }

  patchCours(coursId: string, partialCours: Partial<Cours>): Observable<Cours> {
    const patchAPI = this.apiUrl + '/' + coursId;
    const response = this.http.patch<Cours>(patchAPI, partialCours);
    return response;
  }
}
