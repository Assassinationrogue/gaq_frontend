import { MessageModule } from './../../shared/message/message.module';
import { CommonModule } from '@angular/common';
import { UserService } from './../services/user.service';
import { AbstractControl, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Controls, Fields } from './../modal/public';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';


/**
 * Checks minimum number of characters in the password
 * @returns ValidatorFn
 */
function minimumCharacters(): ValidatorFn {
  return (
    controls: AbstractControl
  ): { [errorName: string]: boolean } | null => {
    if (
      !(controls.value as string)?.match(
        /^(?=.*[a-zA-Z\d!@#$%^&*()_\-\=?\/\\,.><[\]])[a-zA-Z\d!@#$%^&*()_\-\=?\/\\,.><[\]]{8,}$/
      )
    ) {
      return { minVal: true };
    }
    return null;
  };
}

/**
 * Checks lowercase characters in the password
 * @returns ValidatorFn
 */
function shouldContainSmallCap(): ValidatorFn {
  return (
    controls: AbstractControl
  ): { [errorName: string]: boolean } | null => {
    if (!(controls.value as string)?.match(/(?=.*[a-z])[a-z]{1,}/)) {
      return { shouldContainSmallCap: true };
    }
    return null;
  };
}

/**
 * Checks Checks uppercase characters in the password
 * @returns ValidatorFn
 */
function shouldContainUpperCap(): ValidatorFn {
  return (
    controls: AbstractControl
  ): { [errorName: string]: boolean } | null => {
    if (!(controls.value as string)?.match(/(?=.*[A-Z])[A-Z]{1,}/)) {
      return { shouldContainUpperCap: true };
    }
    return null;
  };
}

/**
 * Checks Checks digits in the password
 * @returns ValidatorFn
 */
function shouldContainDigit(): ValidatorFn {
  return (
    controls: AbstractControl
  ): { [errorName: string]: boolean } | null => {
    if (!(controls.value as string)?.match(/(?=.*\d)\d{1,}/)) {
      return { shouldContainDigit: true };
    }
    return null;
  };
}

/**
 * Checks Checks digits in the password
 * @returns ValidatorFn
 */
function shouldContainSpecialCharacter(): ValidatorFn {
  return (
    controls: AbstractControl
  ): { [errorName: string]: boolean } | null => {
    if (
      !(controls.value as string)?.match(
        /(?=.*[`~!#$%^&*()-_=+\\\/,.<>;:"'\[\]{}|])[`~!#$%^&*()-_=+\\\/,.<>;:"'\[\]{}|]{1,}/
      )
    ) {
      return { shouldContainSpecialCharacter: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  fg: FormGroup;
  @Output() loadSignIn = new EventEmitter<boolean>();
  fields: Fields = {
    username: {
      label: 'Username',
      field: 'username',
      readonly: false,
      required: true,
    },
    email: {
      label: 'Email',
      field: 'email',
      readonly: false,
      required: true,
    },
    password: {
      label: 'Password',
      field: 'password',
      readonly: false,
      required: true,
    },
    confirmPassword: {
      label: 'Confirm Password',
      field: 'confirmPasswrod',
      readonly: false,
      required: true,
    },
  };
  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.fg = this.createForm();
  }

  /**
   * Creates a form with null value and validators
   * @param none
   * @returns FormGroup
   */
  private createForm(): FormGroup {
    const controls: Controls = {};
    Object.keys(this.fields).forEach((field) => {
      controls[field] = [
        { value: null, disabled: false },

        [
          this.fields[field].required
            ? Validators.required
            : Validators.nullValidator,
          field === 'password' ? minimumCharacters() : Validators.nullValidator,
          field === 'password'
            ? shouldContainSmallCap()
            : Validators.nullValidator,
          field == 'password'
            ? shouldContainUpperCap()
            : Validators.nullValidator,
          field === 'password'
            ? shouldContainDigit()
            : Validators.nullValidator,
          field === 'password'
            ? shouldContainSpecialCharacter()
            : Validators.nullValidator,
        ],
      ];
    });
    return this.fb.group(controls);
  }

  onSubmit(): void {
    this.fg.markAllAsTouched();
    console.log(this.fg.getRawValue());
    this.userService.postUser(this.fg.getRawValue()).subscribe(data=>{
      if(data['statusCode'] === 200){
        this.router.navigate(['user'])
      }
    })
  }

  goToSignIn(){
    this.loadSignIn.emit(true);
  }
}


@NgModule({
  declarations: [SignupFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MessageModule],
})
class SingUpFormModule {}
