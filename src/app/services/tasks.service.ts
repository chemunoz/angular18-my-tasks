import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../tasks/task.model';
import { NewTask } from '../tasks/interfaces/new-task.interface';
import { LoggingService } from './logging.service';
import { TaskListFilter } from '@app/tasks/tasks-list/task-list-filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  #tasks = signal<Task[]>([]);
  allTasks = this.#tasks.asReadonly();
  #loggingService = inject(LoggingService);

  addTask(task: NewTask): void {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: TaskListFilter.OPEN,
    };
    this.#tasks.update((tasks) => [...tasks, newTask]);
    this.#loggingService.log(`Task added: ${newTask.title}`);
  }

  updateTaskStatus(id: string, status: TaskStatus): void {
    this.#tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
    this.#loggingService.log(`Task status updated to: ${status}`);
  }
}
