import { TAttack } from './attack.type';
import { TCondition } from './conditions.type';
import { TFeature } from './feature.type';
import { TObject } from './object.type';
import { TRace } from './race.type';
import { TSkills } from './skills.type';
import { TSpell } from './spell.type';
import { TStats } from './stats.type';

export type TConditionalAC = {
  part: string;
  value: number;
};

export type TEntity = {
  race: TRace;
  alignment:
    | 'Legal Good'
    | 'Neutral Good'
    | 'Chaotic Good'
    | 'Legal Neutral'
    | 'True Neutral'
    | 'Chaotic Neutral'
    | 'Legal Evil'
    | 'Neutral Evil'
    | 'Chaotic Evil'
    | 'Legal'
    | 'Neutral'
    | 'Chaotic'
    | 'Good'
    | 'Evil'
    | 'Unaligned'
    | 'Other'
    | 'Unknown'
    | 'Unspecified';
  baseStats: TStats;
  stats: TStats;
  currentStats: TStats;
  proficiencyBonus: number;
  passivePerception: number;
  currentPassivePercention: number;
  skills: TSkills;
  currentSkills: TSkills;
  levelOfProficiencyInSkills: TSkills;
  ACBase: number;
  currentAC: number;
  conditinalAC: TConditionalAC;
  initiative: number;
  currentInitiative: number;
  speed: number;
  currentSpeed: number;
  hitDice: '1d4' | '1d6' | '1d8' | '1d10' | '1d12' | '1d20' | '1d100';
  baseMaxHP: number;
  maxHP: number;
  currentMaxHP: number;
  currentHP: number;
  temporaryHP: number;
  conditions: TCondition[];
  savingThrows: TStats;
  currentSavingThrows: TStats;
  features: TFeature[];
  activeFeatures: {
    feature: TFeature[];
    duration?: number;
    quantity?: number;
    maxQuantity?: number;
  }[];
  attacks: TAttack[];
  objects: TObject[];
  spells: {
    spell: TSpell;
    slotLevel: number[];
  }[];
  age: number;
  height: number;
  weight: number;
  size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
  gender: string;
  eyes: string;
  hair: string;
  skin: string;
  appearance: string;
  languages: string[];
  background: string;
  symbol: string;
  description: string;
  xpValue: number;
};
