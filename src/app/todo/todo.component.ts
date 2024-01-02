import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status, Task } from '../common/models/task';
import { TodoService } from '../common/todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
    @Input() task?: Task;
    @Output() todoDeleted: EventEmitter<any> = new EventEmitter();

    constructor(private todoService: TodoService) { }

    changeState(): void {
        if (this.task) {

            if (this.task.status === Status.Todo) this.task.status = Status.InProgress
            else if (this.task.status === Status.InProgress) this.task.status = Status.Done
            else this.task.status = Status.Todo

            this.todoService.updateTodo$(this.task).subscribe();
        }
    }

    deleteTodo(): void {
        if (this.task) {
            this.todoService.deleteTodo$(this.task).subscribe((x) => {
                this.todoDeleted.emit();
            });
        }

    }
}
