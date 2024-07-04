import { TCharacter } from '../../character/types/character.type';

export type TPlayer = {
  userName: string;
  email: string;
  password: string;
  pjs?: TCharacter[];
};
