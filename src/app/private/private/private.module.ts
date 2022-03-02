import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';



@NgModule({
  declarations: [
    PrivateComponent,
    PostComponent,
    CommentComponent
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
