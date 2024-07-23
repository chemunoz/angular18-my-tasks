import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../tasks/task.model';
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

  updateTaskStatus(id: string, status: TaskStatus): void {
    this.#tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }
}
