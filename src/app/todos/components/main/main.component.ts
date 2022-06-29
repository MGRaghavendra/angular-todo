import { Component } from '@angular/core';
import { Observable, map, combineLatestWith } from 'rxjs';
import { TodosService } from 'src/app/todos/services/todos.service';
import { FilterEnum } from 'src/app/todos/types/filter.enum';
import { TodoInterface } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  isAllTodosSelected$: Observable<boolean>;
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length == 0)
    );

    this.visibleTodos$ = this.todosService.filter$.pipe(
      combineLatestWith(this.todosService.todos$),
      map(([filter, todos]: [FilterEnum, TodoInterface[]]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        } else {
          return todos;
        }
      })
    );
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
