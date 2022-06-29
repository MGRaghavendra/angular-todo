import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from 'src/app/todos/components/todos/todos.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TodosRouting {}
