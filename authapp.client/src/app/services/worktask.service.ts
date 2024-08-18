import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WorkTask {
  id?: number;
  name: string;
  description: string;
}
@Injectable({
  providedIn: 'root',
})
export class WorkTaskService {
  private apiUrl = 'https://localhost:7265/api/worktask';

  constructor(private http: HttpClient) {}
  getWorkTasks(): Observable<WorkTask[]> {
    return this.http.get<WorkTask[]>(this.apiUrl);
  }
  addWorkTask(task: WorkTask): Observable<WorkTask> {
    return this.http.post<WorkTask>(this.apiUrl, task);
  }
  deleteWorkTask(id: number): Observable<WorkTask>{
    return this.http.delete<WorkTask>(`${this.apiUrl}/${id}`);
  }
}
