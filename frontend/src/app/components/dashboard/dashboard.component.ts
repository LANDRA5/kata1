import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import {TaskComponent} from "./components/task/task.component";
import { CreateEditTaskComponent } from "./components/create-edit-task/create-edit-task.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NavbarComponent, TaskComponent, CreateEditTaskComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
