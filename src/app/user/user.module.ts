import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    RegisterComponent,
    AuthComponent,
    LoginComponent,
    ProfileComponent,
    EditComponent
  ],
  imports: [
    //BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule
  ],
})
export class UserModule { }