import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ToDoActions from '../actions/todo.action';
import { ToDoHttpService } from '../services/todo.service';
import ToDo from '../models/todo.model';

@Injectable()
export class ToDoEffects {
  constructor(private todoService: ToDoHttpService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap((action) =>
        this.todoService.getToDos().pipe(
          map((data: any) => {
            return ToDoActions.SuccessGetToDoAction({ payload: data.todos });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap((action) =>
        this.todoService.createToDos(action.payload).pipe(
          map((data: ToDo) => {
            return ToDoActions.SuccessCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );
}
