import { Box, BoxProps } from '@chakra-ui/react';
import React, { FC } from 'react';

export const DetailsContainer: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      _dark={{ bg: 'gray.800' }}
      border="0.5px solid"
      borderColor="inherit"
      borderRadius="xl"
      mt={'30px'}
      px={6}
      py={4}
      {...rest}
    >
      {children}
    </Box>
  );
};
