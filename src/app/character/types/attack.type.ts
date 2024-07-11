import { TStatsOptions } from './stats.type';

export type TAttack = {
  _id: string;
  name: string;
  description: string;
  link?: string;
  attackBonus: number;
  savingThrow: TStatsOptions | null;
  castingType: string;
  timeToCast: number;
  castingTime: string;
  duration: number;
  damages: {
    condition: string;
    type: string;
    dices: number;
    diceType: number;
    bonusFrom: string[];
    baseBonus: number;
    currentBonus: number;
  }[];
  minRange: number;
  maxRange: number;
  area: number;
  areaType: string;
  canBeThrown: boolean;
  quantity: number;
  use: string;
  properties: string;
};
