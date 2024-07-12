import { TAttack } from './attack.type';

export type TObject = {
  _id: string;
  name: string;
  description: string;
  weight: number;
  value: number;
  quantity: number;
  properties: string[];
  tags: string[];
  conditions?: string[];
  features?: string[];
  xp: number;
  image?: string;
  link?: string;
  attacks: TAttack[];
};
