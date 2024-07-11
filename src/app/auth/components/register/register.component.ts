import { Component, OnInit } from '@angular/core';
/* RXJS */
import { Subject, takeUntil } from 'rxjs';
/* Types */
import { TPlayer } from '../../interfaces/player.type';
import { TConsoleMessage } from '../../../shared/types/consoleMessage.type';
/* Services */
import { AuthService } from '../../services/auth.service';
import { NgxAngoraService } from 'ngx-angora-css';
/* Components */
import { GenericInputComponent } from '../../../shared/components/generic-input/generic-input.component';
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';
/* Directives */
import { ExistsDirective } from '../../../shared/directives/exists.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    RouterLink,
    GenericInputComponent,
    GenericButtonComponent,
    ExistsDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public registerCredentials: Omit<TPlayer, '_id'> & {
    confirmPassword: string;
    lockeds?: any;
  } = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'player',
  };
  public registerMessage: TConsoleMessage = {
    type: 'info',
    message: 'Please fill in the form',
  };
  public onDestroySubscription: Subject<void> = new Subject<void>();
  constructor(
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
  register(): void {
    this.registerMessage.message = 'Logging in...';
    const lockeds: string[] = Object.keys(
      this.registerCredentials.lockeds || {}
    );
    if (
      this.registerCredentials.password !==
      this.registerCredentials.confirmPassword
    ) {
      this.registerMessage.type = 'danger';
      this.registerMessage.message = 'Passwords do not match.';
    } else if (
      lockeds.length <= 0 ||
      lockeds.find(
        (lock: string) => this.registerCredentials.lockeds[lock] === true
      ) ||
      !['userName', 'email', 'password', 'confirmPassword'].every((value) =>
        lockeds.includes(value)
      )
    ) {
      this.registerMessage.type = 'danger';
      this.registerMessage.message =
        'Register with errors, please fill in the form, check for the errors in every input field.';
    } else {
      this._authService
        .register({
          userName: this.registerCredentials.userName,
          email: this.registerCredentials.email,
          password: this.registerCredentials.password,
          role: this.registerCredentials.role || 'player',
        })
        .pipe(takeUntil(this.onDestroySubscription))
        .subscribe({
          next: (data) => {
            console.log(data);
            this.registerMessage.type = 'success';
            this.registerMessage.message = 'Registed successfully!';
          },
          error: (error: Error) => {
            console.error(error);
            this.registerMessage.type = 'danger';
            this.registerMessage.message =
              'There was an error!:' + error.message;
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
