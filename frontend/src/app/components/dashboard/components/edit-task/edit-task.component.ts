import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {TaskService} from "../../../../services/task.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [TaskService],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  listTask: any;
  EditTaskFormGroup: FormGroup;
  idTask: string | undefined;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private taskService: TaskService
    ){
      this.EditTaskFormGroup = this.fb.group({
        'id': ['', Validators.required],
        'name': ['', Validators.required],
        'description': ['', Validators.required]
      });

      this.loadEditTask();

    }

    loadEditTask(){
      const localTask:any = JSON.parse(<string>localStorage.getItem('task'));
      this.idTask = localTask.id;
      this.EditTaskFormGroup.patchValue({
        id: localTask.id,
        name: localTask.name,
        description: localTask.description
      })
    }

    editTask(){
      if (this.EditTaskFormGroup.invalid) {
        alert('Debes diligenciar todos los campos');
      } else {
        const updateData = {
          id: this.EditTaskFormGroup.value.id,
          name: this.EditTaskFormGroup.value.name,
          description: this.EditTaskFormGroup.value.description
        }

      this.taskService.updateTask(updateData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.removeItem('task');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error);
        alert('No se pudo actualizar la tarea');
      }
    });
  }
  }
  }

