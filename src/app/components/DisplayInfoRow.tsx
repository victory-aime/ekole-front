import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';

export const DisplayInfoRow = ({
  icon,
  label,
  children,
}: {
  icon?: React.ElementType;
  label: string;
  children: React.ReactNode;
}) => (
  <Flex
    gap={4}
    py={3}
    borderBottom="0.5px solid"
    borderColor="gray.100"
    _dark={{ borderColor: 'gray.700' }}
    _last={{ borderBottom: 'none' }}
    justifyContent={'space-between'}
    alignItems={'center'}
    width={'full'}
  >
    <Flex align="center" gap={2} color="gray.500">
      {icon && <Icon as={icon} boxSize={4} />}
      <Text fontSize="sm">{label} </Text>
    </Flex>
    <Box>{children}</Box>
  </Flex>
);
