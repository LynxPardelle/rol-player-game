export type TInputMask = {
  conditions: TCondition[];
  inputMask: any;
};

export type TCondition = {
  condition:
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'min'
    | 'max'
    | 'equal'
    | '!equal'
    | 'includes'
    | '!includes'
    | 'validRegEx'
    | '!validRegEx';
  value: string;
};
