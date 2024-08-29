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
      //delay(3000),
      tap(courses => console.log(courses) )
    );
  }

  loadById(id: string){
    return this.httClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>){
    if(record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>){
    return this.httClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return  this.httClient.put<Course>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: string){
    return  this.httClient.delete(`${this.API}/${id}`).pipe(first());
  }
}