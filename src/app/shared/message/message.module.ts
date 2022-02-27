import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from './message.component';



@NgModule({
  declarations: [Message],
  imports: [
    CommonModule
  ],
  exports:[Message]
})
export class MessageModule { }
