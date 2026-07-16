import { StatRootProps } from '@chakra-ui/react';
import { ENUM } from '_types/index';
import React from 'react';

export interface BaseStatsProps extends StatRootProps {
  icon: React.ReactNode;
  iconBgColor?: string;
  title: string;
  titleVariant?: TextVariant;
  titleWeight?: TextWeight;
  valueFontSize?: string;
  value: number;
  isNumber?: boolean;
  isPercent?: boolean;
  message?: string;
  percent?: number;
  currency?: ENUM.Currency;
  isLoading?: boolean;
}
