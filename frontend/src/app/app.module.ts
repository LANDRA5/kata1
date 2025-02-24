import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { routes } from './app.routes'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {UserService} from "./services/user.service";
import {AppComponent} from "./app.component";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppComponent
  ],
  bootstrap: [],

})
export class AppModule { }
