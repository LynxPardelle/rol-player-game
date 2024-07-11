import { TPlayer } from '../../auth/interfaces/player.type';
import { TBackground } from './background.type';
import { TClass } from './class.type';
import { TEntity } from './entity.type';
import { TRace } from './race.type';
import { TXPTable } from './xpTable.type';

export type TCharClass = {
  baseClass: TClass;
  level: number;
};
export type TCharacter = {
  _id: string;
  name: string;
  class: TCharClass[];
  background: TBackground;
  player: string | TPlayer;
  currentXP: number;
  xpTable: string | TXPTable;
  level: number;
  hasInpiration: boolean;
  deathSaves: [boolean, boolean, boolean];
  deathSaveActive: boolean;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  notes: { title: string; decription?: string; link?: string }[];
  toolsProficiency: string[];
  languages: string[];
  weaponsProficiency: string[];
  armorsProficiency: string[];
  vehiclesProficiency: string[];
} & TEntity;
