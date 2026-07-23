import { ListCollection } from '@chakra-ui/react';
import React from 'react';

interface BaseSelectProps {
  label?: string;
  listItems: ListCollection<unknown> | any;
  placeholder?: string;
  value?: string[];
  isDisabled?: boolean;
  onChangeFunc?: (data: any) => void;
  infoMessage?: string;
  variant?: 'outline' | 'subtle';
  required?: boolean;
  width?: string;
  isClearable?: boolean;
  showDropdownIcon?: boolean;
  toolTipInfo?: string;
  isLoading?: boolean;
  ref?: any | undefined;
}

export type { BaseSelectProps };
