import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { TaskService } from '../../../../services/task.service';
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, RouterLink],
  providers: [TaskService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  listTask: any;
  constructor(
    private taskService: TaskService
   ){
      this.loadTask();
    }
  
    
  
  loadTask(){
    this.taskService.getAllTask().subscribe({
      next: (response) => {
        console.log(`consulta correcta:`);
        console.log(response);
        this.listTask = response.data;
      },
      error: (error) => {
        console.log(error);
        alert('No se pudo iniciar sesión');
      }
    });
  }

  deleteTask(task: any){
    console.log('eliminar',task);
    this.taskService.deleteTask(task).subscribe({
      next: (response) => {
        console.log(`consulta correcta:`);
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        alert('No se pudo iniciar sesión');
      }
    });
  }

}
