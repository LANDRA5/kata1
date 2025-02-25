import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { TaskService } from '../../../../services/task.service';
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterLink} from '@angular/router';
import {CreateEditTaskComponent} from '../create-edit-task/create-edit-task.component'


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, RouterLink, CreateEditTaskComponent],
  providers: [TaskService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  listTask: any;
  //create: boolean;
  
  constructor(
    private taskService: TaskService
   ){
      this.loadTask();
      //this.create = false;
    }
  
   
  /*onForm(){
    this.create = !this.create
  }*/

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
        this.loadTask();
      },
      error: (error) => {
        console.log(error);
        alert('No se pudo iniciar sesión');
      }
    });
  }

}
