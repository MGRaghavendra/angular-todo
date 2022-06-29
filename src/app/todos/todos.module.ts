import { NgModule } from '@angular/core';
import { TodosComponent } from 'src/app/todos/components/todos/todos.component';
import { TodosRouting } from 'src/app/todos/todos-routing.module';
import { HeaderComponent } from 'src/app/todos/components/header/header.component';
import { TodosService } from 'src/app/todos/services/todos.service';
import { MainComponent } from 'src/app/todos/components/main/main.component';
import { CommonModule } from '@angular/common';
import { TodoComponent } from 'src/app/todos/components/todo/todo.component';
import { FooterComponent } from 'src/app/todos/components/footer/footer.component';

@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    MainComponent,
    TodoComponent,
    FooterComponent,
  ],
  imports: [TodosRouting, CommonModule],
  providers: [TodosService],
})
export class TodosModule {}
