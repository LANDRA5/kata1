import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private readonly myAppUrl: string = 'http://localhost:3001/';
    private readonly contextLogin: string = 'api/tasks/';
    private readonly methodCreate: string = 'V1/createTask';
    private readonly methodGetAll: string = 'V1/getAllTask';
    private readonly methodUpdate: string = 'V1/updateTask';
    private readonly methodDelete: string = 'V1/deleteTask';

    constructor(private http: HttpClient) {}

    createTask(task: Task): Observable<any> {
      const finalUrl = this.getUrl('create');
      const options = this.addHeaders();
      return this.http.post(`${finalUrl}`, task, options);
    }

    getAllTask(): Observable<any> {
      const finalUrl = this.getUrl('getAll');
      const options = this.addHeaders();
      return this.http.get(`${finalUrl}`, options);
    }

    updateTask(task: Task): Observable<any> {
      const finalUrl = this.getUrl('update');
      const options = this.addHeaders();
      return this.http.put(`${finalUrl}`, task, options);
    }

    deleteTask(task: Task): Observable<any> {
      const finalUrl = this.getUrl('delete');
      const url = `${finalUrl}/${task.id}`;
      const options = this.addHeaders();
      return this.http.delete(`${url}`, options);
    }

    private getUrl(method: string): string {
      switch (method) {
        case 'create':
          return `${this.myAppUrl}${this.contextLogin}${this.methodCreate}`;
        case 'getAll':
          return `${this.myAppUrl}${this.contextLogin}${this.methodGetAll}`;
        case 'update':
          return `${this.myAppUrl}${this.contextLogin}${this.methodUpdate}`;
        case 'delete':
          return `${this.myAppUrl}${this.contextLogin}${this.methodDelete}`;
        default:
          return `${this.myAppUrl}${this.contextLogin}${this.methodGetAll}`;
      }
    }

    private addHeaders(): any{
      const token = localStorage.getItem('token');
      return{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
    }
}