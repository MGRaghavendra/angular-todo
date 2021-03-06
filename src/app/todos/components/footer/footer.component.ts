import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodosService } from 'src/app/todos/services/todos.service';
import { FilterEnum } from 'src/app/todos/types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todosService: TodosService) {
    this.noTodoClass$ = todosService.todos$.pipe(
      map((todos) => todos.length == 0)
    );
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.filter$ = this.todosService.filter$;
  }
  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }
}
