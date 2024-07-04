import { TClass } from './class.type';
import { TEntity } from './entity.type';

export type TCharacter = {
  name: string;
  level: number;
  class: TClass;
} & TEntity;
