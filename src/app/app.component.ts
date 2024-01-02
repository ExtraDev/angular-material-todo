import { Component } from '@angular/core';
import { Status, Task } from './common/models/task';
import { Observable } from 'rxjs';
import { TodoService } from './common/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'material-todolist';

    public todos$: Observable<Task[] | undefined> = this.todosService.getTodos$();

    public nameControl = new FormControl<string>('', Validators.required);


    constructor(private todosService: TodoService) { }

    public createTodo(): void {
        console.log(this.nameControl.value);
        this.todosService.createTodo$({
            id: 0,
            name: this.nameControl.value || ' ',
            status: Status.Todo
        }).subscribe((task) => {
            this.updateTodosList();
            this.nameControl.reset();
        })
    }

    public updateTodosList(): void {
        this.todos$ = this.todosService.getTodos$();
    }
}
