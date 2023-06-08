import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddTaskDto, TaskDto } from 'src/app/shared/models/dtos/tasks-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  baseUrl = `${environment.baseURL}/mytask`;

  constructor(private http: HttpClient) { }

  // TODO Need to create interceptor of adding token dynamically
  token = "11eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYTg3MmZhMi04NDliLTQ2ODQtYTczNi02YTZmYTVlYThjMTgiLCJlbWFpbCI6ImJodXZpQHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6IkJodXZhbmVzaCIsIm5iZiI6MTY4NTg4Mjg0OSwiZXhwIjoxNjg2NDg3NjQ5LCJpYXQiOjE2ODU4ODI4NDl9.XgaevsKHC3Wl_QCdsOA_nMy94QHh-trNHjxGKpOFhxytaQlp8OXH9NwCp1D0BPvEg1dgw-r5UIYDk7tnkMvt6Q";
  getTasks(): Observable<TaskDto[]> {
    //add bearer token in the below request
    return this.http.get<TaskDto[]>(`${this.baseUrl}`, {});
  }



  addTask(task: AddTaskDto): Observable<TaskDto> {
    //add bearer token in the below request
    return this.http.post<any>(this.baseUrl, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, task);
  }

  deleteTask(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  updateTaskStatus(id: string, status: number): Observable<TaskDto> {
    const url = `${this.baseUrl}/${id}/${status}`;

    return this.http.patch<any>(url, null, {});

  }

}
