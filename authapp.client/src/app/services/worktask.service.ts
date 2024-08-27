import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WorkTask {
  id?: number;
  name: string;
  description: string;
  status:number;
  assignedToUserId?:string;
  createdByUserId?:string;

}
@Injectable({
  providedIn: 'root',
})
export class WorkTaskService {
  private apiUrl = 'https://localhost:7265/api/worktask';


  constructor(private http: HttpClient) {}
  getWorkTasks(): Observable<WorkTask[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    console.log(headers);
    return this.http.get<WorkTask[]>(this.apiUrl,{headers});
  }
  addWorkTask(task: WorkTask): Observable<WorkTask> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.post<WorkTask>(this.apiUrl, task,{headers});
  }
  deleteWorkTask(id: number): Observable<WorkTask>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.delete<WorkTask>(`${this.apiUrl}/${id}`,{headers});
  }
  updateWorkTask(task: WorkTask): Observable<WorkTask>{
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.put<WorkTask>(`${this.apiUrl}/updateWorkTask/${task.id}`, task,{headers});
  }
}
