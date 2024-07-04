import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
/* Modules */
import { SharedModule } from '../../../shared/shared.module';
/* Types */
import { TPlayer } from '../../../auth/interfaces/player.type';
/* Components */
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SharedModule, GenericButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  get player(): TPlayer | undefined {
    return this._authService.player$();
  }
  public isIdentified = false;
  constructor(private _authService: AuthService) {}
}
