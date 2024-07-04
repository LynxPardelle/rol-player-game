import { TRace } from './race.type';
import { TStats } from './stats.type';

export type TEntity = {
  race: TRace;
  baseHP: number;
  maxHP: number;
  currentHP: number;
  baseStats: TStats;
  stats: TStats;
  speed: number;
  currentInitiative: number;
  initiativeBonus: number;
  proficiencyBonus: number;
};
