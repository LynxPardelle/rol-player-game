export type TSpell = {
  _id: string;
  name: string;
  description: string;
  link?: string;
  level: number;
  school: string;
  castingTime: string;
  duration: string;
  range: string;
  components: string;
  materials: string;
  ritual: boolean;
  concentration: boolean;
  classes: string[];
  subclasses: string[];
  image?: string;
};
