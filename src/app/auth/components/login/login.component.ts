import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* RXJS */
import { Subject, takeUntil } from 'rxjs';
/* Types */
import { TConsoleMessage } from '../../../shared/types/consoleMessage.type';
/* Services */
import { AuthService } from '../../services/auth.service';
import { NgxAngoraService } from 'ngx-angora-css';
/* Components */
import { GenericInputComponent } from '../../../shared/components/generic-input/generic-input.component';
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';
/* Directives */
import { ExistsDirective } from '../../../shared/directives/exists.directive';

@Component({
  selector: 'login',
  standalone: true,
  imports: [GenericInputComponent, GenericButtonComponent, ExistsDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginCredentials: {
    email: string;
    password: string;
    lockeds?: any;
  } = {
    email: '',
    password: '',
  };
  public loginMessage: TConsoleMessage = {
    type: 'info',
    message: 'Please fill in the form',
  };
  public onDestroySubscription: Subject<void> = new Subject<void>();
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _ank: NgxAngoraService
  ) {}
  ngOnInit(): void {
    this.cssCreate();
  }
  ngOnDestroy(): void {
    this.onDestroySubscription.next();
    this.onDestroySubscription.complete();
  }
  login(): void {
    this.loginMessage.message = 'Logging in...';
    const lockeds: string[] = Object.keys(this.loginCredentials.lockeds || {});
    if (
      lockeds.length <= 0 ||
      lockeds.find(
        (lock: string) => this.loginCredentials.lockeds[lock] === true
      ) ||
      !['email', 'password'].every((value) => lockeds.includes(value))
    ) {
      this.loginMessage.type = 'danger';
      this.loginMessage.message =
        'Logged in with errors, please fill in the form, check for the errors in every input field.';
    } else {
      this._authService
        .login(this.loginCredentials.email, this.loginCredentials.password)
        .pipe(takeUntil(this.onDestroySubscription))
        .subscribe({
          next: (data) => {
            console.log(data);
            this.loginMessage.type = 'success';
            this.loginMessage.message = 'Logged in successfully!';
            this._router.navigate(['/']);
          },
          error: (error: Error) => {
            console.error(error);
            this.loginMessage.type = 'danger';
            this.loginMessage.message = 'There was an error!:' + error.message;
          },
          complete: () => {
            console.log('Completed');
          },
        });
    }
    setTimeout(() => {
      this.cssCreate();
    }, 300);
  }
  cssCreate() {
    this._ank.cssCreate();
  }
}
