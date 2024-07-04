import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
export type TClass = {
  name:
    | 'Barbarian'
    | 'Bard'
    | 'Cleric'
    | 'Druid'
    | 'Fighter'
    | 'Monk'
    | 'Paladin'
    | 'Ranger'
    | 'Rogue'
    | 'Sorcerer'
    | 'Warlock'
    | 'Wizard';
};
export type TRace = {
  name: string;
};

export type TStats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};
export type TEntity = {
  race: TRace;
  baseHP: number;
  maxHP: number;
  currentHP: number;
  baseStats: TStats;
  trueStats: TStats;
  speed: number;
  currentInitiative: number;
  initiativeBonus: number;
  proficiencyBonus: number;
};
export type TPJ = {
  name: string;
  level: number;
  class: TClass;
} & TEntity;
export type TPlayer = {
  userName: string;
  email: string;
  password: string;
  pjs: TPJ[];
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public player: TPlayer = {
    userName: '',
    email: '',
    password: '',
    pjs: [],
  };
  public isIdentified = false;

  ngOnInit(): void {
    this.checkIfIdentified();
  }

  checkIfIdentified(): void {
    if (this.player.userName !== '' && this.player.email !== '') {
      this.isIdentified = true;
    }
  }
}
