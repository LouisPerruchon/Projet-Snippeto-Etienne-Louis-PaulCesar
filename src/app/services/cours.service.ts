import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours';

@Injectable({
  providedIn: 'root',
})
export class CoursService {
  private apiUrl = 'http://localhost:5000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Cours[]> {
    const response = this.http.get<Cours[]>(this.apiUrl);
    return response;
  }
}
