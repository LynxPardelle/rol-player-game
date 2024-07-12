import { TPlayer } from '../../auth/interfaces/player.type';
import { TBackground } from './background.type';
import { TClass } from './class.type';
import { TEntity } from './entity.type';
import { TRace } from './race.type';
import { TSpell } from './spell.type';
import { TSubClass } from './subClass.type';
import { TXPTable } from './xpTable.type';

export type TCharClass = {
  baseClass: TClass;
  level: number;
};
export type TCharacter = {
  _id: string;
  name: string;
  class: {
    class: TCharClass[];
    subClass: TSubClass[];
    level: number;
    spells: TSpell[];
    sloths: {
      slothLevel: number;
      slothAmount: number;
    }[];
  }[];
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
  weaponsProficiency: string[];
  armorsProficiency: string[];
  vehiclesProficiency: string[];
  alliesNOrganizations: string[];
  characterBackstory: string;
} & TEntity;
