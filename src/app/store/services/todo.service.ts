import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ToDo from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'https://dummyjson.com/todos';
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.httpclient.get<ToDo[]>(this.ApiURL);
  }

  createToDos(payload: ToDo): Observable<ToDo> {
    return this.httpclient.post<ToDo>(`${this.ApiURL}/add`, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}