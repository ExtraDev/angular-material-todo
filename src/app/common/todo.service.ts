import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './models/task';
import { Observable, tap, map, Subject, debounceTime, distinctUntilChanged, switchMap, of, delay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private baseUrl: string = 'http://localhost:3000';

    private search = new Subject();
    public todos$: Observable<Task[]> = new Observable();

    constructor(private http: HttpClient) { }

    getTodos$(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}/tasks`).pipe(
            tap((x) => console.table(x)),
            delay(300)
        );
    }

    getTodosList$(term: string): Observable<Task[]> {
        if (term.length <= 1) {
            return of([]);
        }
        return this.http.get<Task[]>(`${this.baseUrl}/tasks/?name=${term}`).pipe();
    }

    createTodo$(task: Task): Observable<Task | undefined> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.post<Task>(`${this.baseUrl}/tasks`, task, { headers: header });
    }

    updateTodo$(task: Task): Observable<Task | undefined> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.put<Task>(`${this.baseUrl}/tasks/${task.id}`, task, { headers: header });
    }

    deleteTodo$(task: Task): Observable<any> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.delete<Task>(`${this.baseUrl}/tasks/${task.id}`, { headers: header })
    }

    searchForTodo(terms: string): void {
        this.todos$ = this.search.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term) => this.getTodosList$(terms))
        );
    }
}
