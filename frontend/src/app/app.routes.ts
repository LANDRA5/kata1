import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateEditTaskComponent } from './components/dashboard/components/create-edit-task/create-edit-task.component';
import { EditTaskComponent } from './components/dashboard/components/edit-task/edit-task.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signIn', component: SignInComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'create', component: CreateEditTaskComponent},
    { path: 'edit', component: EditTaskComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];
