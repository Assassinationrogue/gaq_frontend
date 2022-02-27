
import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentFactoryResolver,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  currentForm: string = 'signIn';

  @ViewChild('signInComponent', { read: ViewContainerRef })
  private signInComponentRef: ViewContainerRef;

  @ViewChild('signUpComponent', { read: ViewContainerRef })
  private signUpComponentRef: ViewContainerRef;

  constructor(
    private vcref: ViewContainerRef, // creates a container where we can lazy load a component
    private cfr: ComponentFactoryResolver // will make the component from the code
  ) {}

  ngOnInit(): void {
    this.loadSignInPage();
  }

  loadSignUpPage() {
    this.vcref.clear(); // clears the container... but why? Well, incase if we have multiple component to lazyload

    import('./signup-form/signup-form.component').then(
      ({ SignupFormComponent }) => {
        let signUpComponent = this.signUpComponentRef.createComponent(
          this.cfr.resolveComponentFactory(SignupFormComponent) // instantiating a component class using the resolveComponentFactory
        );
        signUpComponent.instance.loadSignIn.subscribe((load) => {
          if (load) {
            this.loadSignInPage();
            this.signUpComponentRef.clear();
          }
        });
      }
    );
  }

  loadSignInPage() {
    this.vcref.clear();
    import('./login/login.component').then(({ LoginComponent }) => {
      let loginComponent = this.signInComponentRef.createComponent(
        this.cfr.resolveComponentFactory(LoginComponent)
      );
      loginComponent.instance.loadSignUp.subscribe((load) => {
        if (load) {
          this.loadSignUpPage();
          this.signInComponentRef.clear();
        }
      });
    });
  }
}
