import { Fields, Controls } from './../modal/public';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fg = this.createForm();
    console.log(this.fg);
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
  }
}
