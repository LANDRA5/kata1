import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   loginFormGroup: FormGroup;

   constructor(
     private userService: UserService,
     private fb: FormBuilder,
     private router: Router
   ){
     this.loginFormGroup = this.fb.group({
       'user': ['', Validators.required],
       'password': ['', Validators.required],
       'check': [false],
     });
     this.loadCredentials();
     this.deleteToken();
   }

   loadCredentials(): void {
     const user = localStorage.getItem('user');
     const password = localStorage.getItem('password');
     if (user && password) {
       this.loginFormGroup.patchValue({
         user: user,
         password: password,
         check: true
       });
     }
   }

   login(){
      if (this.loginFormGroup.invalid) {
        alert('Debes diligenciar todos los campos');
      } else {
        const isSaveCredentials = this.loginFormGroup.value.check;
        this.saveCredentials(isSaveCredentials);

        const loginData = {
          user: this.loginFormGroup.value.user,
          password: this.loginFormGroup.value.password
        }

        this.userService.login(loginData).subscribe({
          next: (response) => {
            console.log(`Data login correcta:`);
            console.log(response);
            const {token} = response
            this.saveToken(token);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.log(error);
            alert('No se pudo iniciar sesión');
          }
        });
      }
   }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  deleteToken(): void {
     localStorage.removeItem('token');
  }

   private saveCredentials(isSaveCredentials: boolean): void {
     if (isSaveCredentials) {
       localStorage.setItem('user', this.loginFormGroup.value.user);
       localStorage.setItem('password', this.loginFormGroup.value.password);
     } else {
       localStorage.removeItem('user');
       localStorage.removeItem('password');
     }
   }
}
