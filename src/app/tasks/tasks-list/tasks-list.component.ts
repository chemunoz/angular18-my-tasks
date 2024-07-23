import { Component, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '@app/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  #taskService = inject(TasksService);
  selectedFilter = signal<string>('all');
  tasks = this.#taskService.allTasks;

  onChangeTasksFilter(filter: string): void {
    this.selectedFilter.set(filter);
  }
}
