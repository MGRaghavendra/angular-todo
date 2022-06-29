import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { FilterEnum } from 'src/app/todos/types/filter.enum';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };

    const updatesTodos = [...this.todos$.getValue(), newTodo];

    this.todos$.next(updatesTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updatesTodos = this.todos$
      .getValue()
      .map((todo) => ({ ...todo, isCompleted }));
    this.todos$.next(updatesTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string) {
    const updateTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      } else {
        return todo;
      }
    });
    this.todos$.next(updateTodos);
  }

  removeTodo(id: string) {
    const updatesTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);
    this.todos$.next(updatesTodos);
  }

  toggleTodo(id: string) {
    const updatesTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatesTodos);
  }
}
