import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http'
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httClient: HttpClient) { }

  list() {
    return  this.httClient.get<Course[]>(this.API)
    .pipe(
      first(),
      //delay(5000),
      tap(courses => console.log(courses) )
    );
  }

  save(record: Course){
    return this.httClient.post<Course>(this.API, record).pipe(first());
  }
}