import { Center, Icon, Text } from '@chakra-ui/react';
import { ElementType } from 'react';

export const EmptyBlock = ({ infoMessage, icon }: { infoMessage: string; icon?: ElementType }) => {
  return (
    <Center
      py={16}
      flexDirection="column"
      gap={3}
      border="0.5px dashed"
      borderColor="inherit"
      borderRadius="xl"
    >
      {icon && <Icon as={icon} boxSize={8} color="gray.300" />}
      <Text color="gray.400" fontSize="sm">
        {infoMessage}
      </Text>
    </Center>
  );
};
