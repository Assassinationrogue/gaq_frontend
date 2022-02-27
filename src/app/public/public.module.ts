import { Message } from '../shared/message/message.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from '../shared/message/message.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PublicComponent,
      },
    ]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MessageModule,
  ],
})
export class PublicModule {}
