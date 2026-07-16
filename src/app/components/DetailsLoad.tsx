import { CustomSkeletonLoader } from '_components/custom';
import { VStack, Flex, Separator, HStack, Box } from '@chakra-ui/react';

export const IsDetailsDataLoad = ({ type = 'default' }: { type?: 'default' | 'payout' }) => {
  return (
    <VStack alignItems={'flex-start'} width={'full'}>
      <HStack justifyContent={'space-between'} width={'full'}>
        <CustomSkeletonLoader
          type={'TEXT_IMAGE'}
          direction={'row'}
          numberOfLines={2}
          width={'800px'}
          radius={'full'}
        />
        <CustomSkeletonLoader type={'BUTTON'} width={'120px'} colorButton={'primary'} />
      </HStack>
      {type !== 'default' && (
        <HStack flexDir={{ base: 'column', sm: 'row' }} width={'full'} gap={4}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Box width={'full'}>
              <CustomSkeletonLoader key={i} width={'full'} type={'FORM'} />
            </Box>
          ))}
        </HStack>
      )}

      <HStack flexDir={{ base: 'column', sm: 'row' }} width={'full'} gap={4}>
        <Flex width={type !== 'default' ? 'full' : '1/6'}>
          <CustomSkeletonLoader width={'full'} type={'FORM'} height={'50svh'} />
        </Flex>
        {type === 'default' && (
          <Separator height={'lg'} orientation={{ base: 'horizontal', sm: 'vertical' }} />
        )}
        <Flex width={'full'}>
          <CustomSkeletonLoader type={'FORM'} width={'100%'} height={'50svh'} />
        </Flex>
      </HStack>
      {type !== 'default' && <CustomSkeletonLoader type={'FORM'} width={'100%'} height={'10svh'} />}
    </VStack>
  );
};
