import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/* RXJS */
import { map, Observable, of } from 'rxjs';
/* Types */
import { TPlayer } from '../../auth/interfaces/player.type';
/* Data */
import { players } from '../data/players.data';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public players$: WritableSignal<TPlayer[]> = signal<TPlayer[]>(players);
  private readonly platformId = inject(PLATFORM_ID);
  public isBrowser: boolean = false;
  constructor() {
    this.getPlayersFromLocalStorage();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  /* Create */
  createPlayer(player: TPlayer): Observable<TPlayer> {
    let players: TPlayer[] = this.players$();
    if (players.find((p) => p.email === player.email) === undefined) {
      players.push(player);
      this.players$.set(players);
      this.savePlayers();
      return of(player);
    } else {
      return of().pipe(
        map(() => {
          throw new Error('Player already exists');
        })
      );
    }
  }
  /* Read */
  getPlayer(playerEmail: string): Observable<TPlayer | undefined> {
    this.getPlayersFromLocalStorage();
    return of(this.players$()).pipe(
      map((players) => players.find((p) => p.email === playerEmail))
    );
  }
  getPlayers(): Observable<TPlayer[]> {
    this.getPlayersFromLocalStorage();
    return of(this.players$());
  }
  /* Update */
  updatePlayer(player: TPlayer): Observable<TPlayer> {
    let players: TPlayer[] = this.players$();
    if (players.find((p) => p.email === player.email) !== undefined) {
      this.players$.update((players) =>
        players.map((p) => (p.email === player.email ? player : p))
      );
      this.savePlayers();
      return of(player);
    } else {
      return of().pipe(
        map(() => {
          throw new Error("Player doesn't exists");
        })
      );
    }
  }
  /* Delete */
  deletePlayer(playerEmail: string): Observable<TPlayer> {
    let players: TPlayer[] = this.players$();
    let player: TPlayer | undefined = players.find(
      (p) => p.email === playerEmail
    );
    if (player !== undefined) {
      this.players$.update((players) =>
        players.filter((p) => p.email !== playerEmail)
      );
      this.savePlayers();
      return of(player);
    } else {
      return of().pipe(
        map(() => {
          throw new Error("Player doesn't exists");
        })
      );
    }
  }
  /* LocalStorage */
  savePlayers(): void {
    if (!this.isBrowser) return;
    localStorage.setItem('RPG-players', JSON.stringify(this.players$()));
  }
  getPlayersFromLocalStorage(): void {
    if (!this.isBrowser) return;
    let players: TPlayer[] = JSON.parse(
      localStorage.getItem('RPG-players') || '[]'
    );
    console.log(players);
    this.players$.set(players);
  }
  deletePlayersFromLocalStorage(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('RPG-players');
    this.players$.set([]);
  }
}
