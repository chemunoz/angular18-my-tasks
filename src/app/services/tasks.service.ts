import { Injectable, signal } from '@angular/core';
import { Task } from '../tasks/task.model';
import { NewTask } from '../tasks/interfaces/new-task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  #tasks = signal<Task[]>([]);
  allTasks = this.#tasks.asReadonly();

  addTask(task: NewTask): void {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.#tasks.update((tasks) => [...tasks, newTask]);
  }

  constructor() {}
}
