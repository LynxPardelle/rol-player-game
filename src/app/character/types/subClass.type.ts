import { TFeature } from './feature.type';

export type TSubClass = {
  _id: string;
  name: string;
  description: string;
  link?: string;
  features: TFeature[];
};
