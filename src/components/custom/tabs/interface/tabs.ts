import { TabsRootProps, TabsValueChangeDetails } from '@chakra-ui/react';
import { ActionButtonTypes } from '_components/custom/button';
import { ReactNode } from 'react';

interface TabsProps extends TabsRootProps {
  items: {
    label: string;
    icon?: ReactNode;
    content?: ReactNode | string | any;
    totalItems?: number;
  }[];
  title?: string;
  description?: string;
  onChangeTabs?: (value: number) => void;
  onValueChange?: ((details: TabsValueChangeDetails) => void) | undefined;
  mode?: 'manual' | 'automatic';
  withActionButtons?: boolean;
  actionsButtonProps?: ActionButtonTypes | undefined;
}

export type { TabsProps };
