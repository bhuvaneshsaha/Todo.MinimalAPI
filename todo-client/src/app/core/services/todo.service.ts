import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  baseUrl = '/mytask';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, task);
  }

  deleteTask(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  updateTaskStatus(id: string, status: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/${status}`;
    return this.http.patch<any>(url, {});
  }

}
