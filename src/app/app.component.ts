import {
  afterNextRender,
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
/* Modules */
import { SharedModule } from './shared/shared.module';
/* Types */
import { TPlayer } from './auth/interfaces/player.type';
import { TSideNavOptions } from './core/types/sideNavOptions.type';
/* Services */
import { NgxAngoraService } from 'ngx-angora-css';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SharedModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  get player(): TPlayer | undefined {
    return this._authService.player$();
  }
  public sideNav1Opened: boolean = true;
  public sideNav2Opened: boolean = false;
  public sideNav1Options: TSideNavOptions[] = [
    {
      title: 'Main',
      label: 'Home',
      route: '/',
      isActive: true,
      type: 'link',
    },
    {
      title: 'Character',
      label: 'Create a New Character',
      route: '/character',
      isActive: true,
      type: 'link',
    },
    {
      title: 'Characters',
      label: 'My Characters',
      route: '/character/list/' + this.player?._id,
      isActive: true,
      type: 'link',
    },
    {
      title: 'Login',
      label: 'Login',
      route: '/auth/login',
      isActive: true,
      type: 'link',
    },
    {
      title: 'Sign Up',
      label: 'Sign Up',
      route: '/auth/register',
      isActive: true,
      type: 'link',
    },
    {
      title: 'Admin Options',
      trigger: () => {
        this.sideNav2Opened = !this.sideNav2Opened;
      },
      isActive: false,
      type: 'button',
    },
  ];
  public sideNav2Options: TSideNavOptions[] = [
    {
      title: 'Main',
      label: 'Home',
      route: '/',
      isActive: true,
      type: 'link',
    },
    {
      title: 'Character',
      label: 'Create a New Character',
      route: '/character',
      isActive: true,
      type: 'link',
    },
    {
      title: 'Characters',
      label: 'All Characters',
      route: '/character/list/',
      isActive: true,
      type: 'link',
    },
  ];
  constructor(
    private _authService: AuthService,
    private _ank: NgxAngoraService
  ) {
    afterNextRender(() => {
      this._ank.checkSheet();
      this._ank.values.importantActive = true;
      // this._ank.changeDebugOption(true);
      this.cssCreate();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._authService.getPlayerFromLocalStorage();
  }

  cssCreate() {
    this._ank.cssCreate();
  }
}
