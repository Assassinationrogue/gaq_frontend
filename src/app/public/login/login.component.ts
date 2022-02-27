import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { MessageModule } from './../../shared/message/message.module';
import { CommonModule } from '@angular/common';
import { Fields, Controls } from './../modal/public';
import { Component, OnInit, Output, EventEmitter, NgModule} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
  @Output() loadSignUp = new EventEmitter<boolean>();
  fields: Fields = {
    username: {
      label: 'Username',
      field: 'username',
      readonly: false,
      required: true,
    },
    password: {
      label: 'Password',
      field: 'passwrod',
      readonly: false,
      required: true,
    },
  };
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fg = this.createForm();
   
  }

  createForm(): FormGroup {
    const controls: Controls = {};
    Object.keys(this.fields).forEach((field) => {
      controls[field] = [
        { value: null, disabled: false },

        [
          this.fields[field].required
            ? Validators.required
            : Validators.nullValidator,
        ],
      ];
    });
    return this.fb.group(controls);
  }

  onSubmit(): void {
    console.log(this.fg.getRawValue());
    this.userService.postLoginInfo(this.fg.getRawValue()).subscribe(data=>{
      if(data.statusCode === 200){
        this.router.navigate(['user'])
      }
    })
  }

  goToSignUp() {
    this.loadSignUp.emit(true);
  }
}


@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MessageModule],
})
class SingInFormModule {}
