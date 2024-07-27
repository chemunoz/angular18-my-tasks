import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '@app/services/tasks.service';
import { TaskListFilter } from './task-list-filter.enum';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  #taskService = inject(TasksService);
  #selectedFilter = signal<TaskListFilter>(TaskListFilter.ALL);
  taskListFilter = TaskListFilter;

  // Tasks from the service are filtered based on the selected filter
  tasks = computed(() => {
    switch (this.#selectedFilter()) {
      case this.taskListFilter.ALL:
        return this.#taskService.allTasks();
      case this.taskListFilter.OPEN:
        return this.#taskService
          .allTasks()
          .filter((task) => task.status === this.taskListFilter.OPEN);
      case this.taskListFilter.IN_PROGRESS:
        return this.#taskService
          .allTasks()
          .filter((task) => task.status === this.taskListFilter.IN_PROGRESS);
      case this.taskListFilter.DONE:
        return this.#taskService
          .allTasks()
          .filter((task) => task.status === this.taskListFilter.DONE);
      default:
        return this.#taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: TaskListFilter): void {
    this.#selectedFilter.set(filter);
  }
}
