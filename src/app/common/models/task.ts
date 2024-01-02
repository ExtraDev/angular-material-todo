export enum Status {
    Todo = 'Todo',
    InProgress = 'In Progress',
    Done = 'Done'
}

export interface Task {
    id: number,
    name: string,
    status: Status
}