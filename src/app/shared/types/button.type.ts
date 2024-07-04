export type TButton = {
  buttonId?: string;
  buttonInner?: string;
  buttonBGColor?: string;
  buttonTextColor?: string;
  buttonClass?: string;
  buttonDisabledClass?: string;
  buttonType?: 'rounded' | 'squared';
  disabled?: boolean;
  tooltip?: string;
  tooltipPosition?: 'after' | 'before' | 'above' | 'below' | 'left' | 'right';
  showTooltip?: boolean;
  tooltipClass?: string;
};
