export type TSideNavOptions = {
  title: string;
  isActive: boolean;
  icon?: string;
} & (
  | {
      route: string;
      label: string;
      type: 'link';
    }
  | {
      type: 'button';
      trigger: () => void;
    }
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'divider';
    }
);
