import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/* RXJS */
import { map, Observable } from 'rxjs';
/* Types */
import { TPlayer } from '../interfaces/player.type';
/* Services */
import { PlayerService } from '../../player/services/player.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public player$: WritableSignal<TPlayer | undefined> = signal<
    TPlayer | undefined
  >(undefined);
  private readonly platformId = inject(PLATFORM_ID);
  public isBrowser: boolean = false;
  constructor(private _playerService: PlayerService) {
    this.getPlayerFromLocalStorage();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  register(player: TPlayer): Observable<any> {
    return this._playerService.createPlayer(player);
  }
  login(email: string, password: string): Observable<any> {
    return this._playerService.getPlayer(email).pipe(
      map((player: TPlayer | undefined) => {
        if (player?.password === password) {
          this.player$.set(player);
          this.savePlayer();
          return player;
        } else {
          throw new Error('Invalid password');
        }
      })
    );
  }
  logout(): Observable<boolean> {
    this.deletePlayerFromLocalStorage();
    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
  }
  /* LocalStorage */
  savePlayer(): void {
    if (!this.isBrowser) return;
    const player: TPlayer | undefined = this.player$();
    if (player) {
      localStorage.setItem('player', JSON.stringify(player));
    }
  }
  getPlayerFromLocalStorage(): void {
    if (!this.isBrowser) return;
    const player: TPlayer | undefined = JSON.parse(
      localStorage.getItem('player') || 'null'
    );
    this.player$.set(player);
  }
  deletePlayerFromLocalStorage(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('player');
    this.player$.set(undefined);
  }
}
