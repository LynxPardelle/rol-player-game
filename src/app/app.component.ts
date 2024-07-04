import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
/* Modules */
import { SharedModule } from './shared/shared.module';
/* Types */
import { TPlayer } from './auth/interfaces/player.type';
/* Services */
import { NgxAngoraService } from 'ngx-angora-css';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  get player(): TPlayer | undefined {
    return this._authService.player$();
  }
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

  cssCreate() {
    this._ank.cssCreate();
  }
}
