import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/core/services/todo.service';
import { TaskDto } from 'src/app/shared/models/dtos/tasks-dto';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/shared/models/task';
import { TaskComponent } from 'src/app/shared/components/task/task.component';

const components = [TaskComponent];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ...components],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  tasks!: Task[];
  activeTask!: Task;

  @ViewChild('dialog') dialog!: ElementRef;

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.todoService.getTasks().subscribe(tasksDto => {
      this.tasks = tasksDto.map(taskDto => new Task(
        taskDto.id,
        taskDto.title,
        taskDto.description,
        taskDto.dueDate,
        taskDto.status,
        taskDto.appUserId,
        taskDto.appUser
      ))

      console.log('this.tasks',this.tasks);
      this.cdr.detectChanges();
    });
  }

  updateTaskStatus(task: Task) {
    this.todoService.updateTaskStatus(task.id, task.status ? 1:0).subscribe(x => {


    });
  }

  taskAdded(taskDto: TaskDto) {

    const task = new Task(
      taskDto.id,
      taskDto.title,
      taskDto.description,
      taskDto.dueDate,
      taskDto.status,
      taskDto.appUserId,
      taskDto.appUser
    )
    this.tasks = [task, ...this.tasks];

    this.cdr.detectChanges();
  }

  openDialog(): void {
    (this.dialog.nativeElement as HTMLDialogElement).showModal();
  }

  closeDialog(): void {
    (this.dialog.nativeElement as HTMLDialogElement).close();
  }

}
