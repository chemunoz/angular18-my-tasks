import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task, TaskStatus } from '../../task.model';
import { TaskListFilter } from '../task-list-filter.enum';
import { TitleCasePipe } from '@angular/common';
import { TasksService } from '@app/services/tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  task = input.required<Task>();
  taskListFilter = TaskListFilter;

  #taskService = inject(TasksService);

  taskStatus = computed(() => {
    switch (this.task().status) {
      case this.taskListFilter.OPEN:
        return 'Open';
      case this.taskListFilter.IN_PROGRESS:
        return 'Working on it';
      case this.taskListFilter.DONE:
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = this.taskListFilter.OPEN;

    switch (status) {
      case this.taskListFilter.OPEN:
        newStatus = this.taskListFilter.OPEN;
        break;
      case this.taskListFilter.IN_PROGRESS:
        newStatus = this.taskListFilter.IN_PROGRESS;
        break;
      case this.taskListFilter.DONE:
        newStatus = this.taskListFilter.DONE;
        break;
      default:
        break;
    }

    this.#taskService.updateTaskStatus(taskId, newStatus);
  }
}
