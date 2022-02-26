import { Message } from './login/message.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form/signup-form.component';



@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    Message,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'',
      component: PublicComponent
    }]),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PublicModule { }
