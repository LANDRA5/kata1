import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {TaskService} from "../../../../services/task.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-create-edit-task',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-edit-task.component.html',
  styleUrl: './create-edit-task.component.css'
})
export class CreateEditTaskComponent {

  CreateEditTaskFormGroup: FormGroup;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private taskService: TaskService
    ){
      this.CreateEditTaskFormGroup = this.fb.group({
        'id': ['', Validators.required],
        'name': ['', Validators.required],
        'description': ['', Validators.required]
      });
    }

  

  addTask(){

    if (this.CreateEditTaskFormGroup.invalid) {
      alert('Debes diligenciar todos los campos');
    } else {
      const registerData = {
        id: this.CreateEditTaskFormGroup.value.id,
        name: this.CreateEditTaskFormGroup.value.name,
        description: this.CreateEditTaskFormGroup.value.description
      }

      this.taskService.createTask(registerData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error);
          alert('No se pudo crear la tarea');
        }
      });
    }
  }

  /*deleteTask(){

    this.taskService.deleteTask().subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error);
          alert('No se pudo eliminar la tarea');
        }
      });
    }*/
  
}
