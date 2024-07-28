import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task, TaskStatus } from '../../task.model';
import { TaskStatusOptions } from '../task-list-filter.enum';
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
  taskStatusOptions = TaskStatusOptions;

  #taskService = inject(TasksService);

  taskStatus = computed(() => {
    switch (this.task().status) {
      case TaskStatusOptions.OPEN:
        return 'Open';
      case TaskStatusOptions.IN_PROGRESS:
        return 'Working on it';
      case TaskStatusOptions.DONE:
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = TaskStatusOptions.OPEN;

    switch (status) {
      case TaskStatusOptions.OPEN:
        newStatus = TaskStatusOptions.OPEN;
        break;
      case TaskStatusOptions.IN_PROGRESS:
        newStatus = TaskStatusOptions.IN_PROGRESS;
        break;
      case TaskStatusOptions.DONE:
        newStatus = TaskStatusOptions.DONE;
        break;
      default:
        break;
    }

    this.#taskService.updateTaskStatus(taskId, newStatus);
  }
}
