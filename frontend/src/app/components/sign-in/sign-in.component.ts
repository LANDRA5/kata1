import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  signInFormGroup: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ){
    this.signInFormGroup = this.fb.group({
      'user': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  addUser(){

    if (this.signInFormGroup.invalid) {
      alert('Debes diligenciar todos los campos');
    } else {
      const registerData = {
        user: this.signInFormGroup.value.user,
        password: this.signInFormGroup.value.password
      }

      this.userService.signIn(registerData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
          alert('No se pudo crear el usuario');
        }
      });
    }
  }


}
