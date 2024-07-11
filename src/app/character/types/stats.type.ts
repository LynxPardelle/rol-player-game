export type TStatsOptions = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type TStats = {
  [key in TStatsOptions]: string;
};
