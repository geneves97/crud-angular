import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http'
import { first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(private httClient: HttpClient) { }

  list() {
    return  this.httClient.get<Course[]>(this.API)
    .pipe(
      first(),
      tap(courses => console.log(courses) )
    );
  }
}