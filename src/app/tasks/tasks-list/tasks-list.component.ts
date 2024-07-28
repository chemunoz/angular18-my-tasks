import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '@app/services/tasks.service';
import { TaskStatusOptions } from './task-list-filter.enum';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  #taskService = inject(TasksService);
  #selectedFilter = signal<TaskStatusOptions>(TaskStatusOptions.ALL);
  taskStatusOptions = TaskStatusOptions;

  // Tasks from the service are filtered based on the selected filter
  tasks = computed(() => {
    switch (this.#selectedFilter()) {
      case TaskStatusOptions.ALL:
        return this.#taskService.allTasks();
      case TaskStatusOptions.OPEN:
        return this.#taskService
          .allTasks()
          .filter((task) => task.status === TaskStatusOptions.OPEN);
      case TaskStatusOptions.IN_PROGRESS:
        return this.#taskService
          .allTasks()
          .filter((task) => task.status === TaskStatusOptions.IN_PROGRESS);
      case TaskStatusOptions.DONE:
        return this.#taskService
          .allTasks()
          .filter((task) => task.status === TaskStatusOptions.DONE);
      default:
        return this.#taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string): void {
    this.#selectedFilter.set(filter as TaskStatusOptions);
  }
}
