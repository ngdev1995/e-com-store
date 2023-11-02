import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as ToDoActions from "../store/actions/todo.action";
import ToDo from "../store/models/todo.model";
import ToDoState from "../store/todo.store";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select("todos"));
  }

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map((x) => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  todo$: Observable<ToDoState>;
  ToDoSubscription!: Subscription;
  ToDoList: ToDo[] = [];

  todo: string = "";
  completed: boolean = false;

  todoError: Error|null = null;

  createToDo() {
    const todo: ToDo = { todo: this.todo, completed: this.completed, userId : 26 };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.todo = "";
    this.completed = false;
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}