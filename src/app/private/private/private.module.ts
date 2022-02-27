import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PostComponent } from '../post/post.component';



@NgModule({
  declarations: [
    PrivateComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component: PrivateComponent
      },

    ])
  ]
})
export class PrivateModule { }
