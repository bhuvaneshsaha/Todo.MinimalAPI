import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { Task } from '../../models/task';
import { TaskDto } from '../../models/dtos/tasks-dto';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task?: Task;
  @Output() addedTask = new EventEmitter<TaskDto>();
  @Output() cancelOperation = new EventEmitter<void>();

  taskForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  todoService = inject(TodoService);
  cdr = inject(ChangeDetectorRef);

  constructor() {

  }

  ngOnInit(): void {
    const initialDate = formatDate(this.task?.dueDate ?? new Date() , 'yyyy-MM-dd', 'en-US');
    this.taskForm = this.formBuilder.group({
      title: [this.task?.title ??'', Validators.required],
      description: this.task?.description ?? '',
      dueDate: [initialDate, Validators.required],
    });

    this.cdr.detectChanges();
  }

  cancel() {
    this.cancelOperation.emit();
  }

  addOrUpdateTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const taskToAdd = this.taskForm.value as AddTaskDto;

    this.todoService.addTask(taskToAdd).subscribe(x => {
      this.addedTask.emit(x);
    });

  }

}

export interface AddTaskDto {
  title: string
  description: string
  dueDate: Date
}
