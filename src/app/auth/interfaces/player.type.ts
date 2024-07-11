import { TCharacter } from '../../character/types/character.type';

export type TPlayer = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  pjs?: TCharacter[];
  role: 'player' | 'master' | 'admin';
};
