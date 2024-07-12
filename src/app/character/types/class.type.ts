import { TFeature } from './feature.type';
import { TObject } from './object.type';
import { TSkillsOptions } from './skills.type';
import { TStatsOptions } from './stats.type';

export type TClass = {
  name: TClassOptions;
  hitDice: '1d4' | '1d6' | '1d8' | '1d10' | '1d12' | '1d20' | '1d100';
  primaryAbility: TStatsOptions;
  HPFirstLevel: number;
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  savingThrowProficiencies: TStatsOptions[];
  skillProficiencies: TSkillsOptions[];
  baseEquipmentOptions: { object: TObject[]; quantity: number }[];
  features: TFeature[];
  // spellProgression: TSpellProgession;
  spellCastingHability: TStatsOptions | null;
  spellSaveDCBonus: number;
};

export type TClassOptions =
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
