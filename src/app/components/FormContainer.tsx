import {
  CustomSkeletonLoader,
  Icons,
  BaseText,
  TextVariant,
  TextWeight,
} from '@/components/custom';
import { Box, VStack, HStack, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export const FormContainer = ({
  pageTitle = 'Page title',
  pageDescription,
  children,
  isLoading,
}: {
  pageTitle?: string;
  pageDescription?: string;
  children: ReactNode;
  isLoading?: boolean;
}) => {
  const router = useRouter();
  return (
    <Box width="full" p={{ base: 3, sm: 4 }} mx={'auto'} spaceY={'6'}>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, idx) => (
            <VStack gap={3} width={'full'} key={idx}>
              <CustomSkeletonLoader type="TEXT" numberOfLines={2} />
              <CustomSkeletonLoader type="FORM" width={'full'} />
            </VStack>
          ))}
        </>
      ) : (
        <>
          <HStack gap={8} alignItems={'center'}>
            <Icons.IoIosArrowRoundBack onClick={() => router.back()} cursor={'pointer'} />
            <Stack gap={0}>
              <BaseText variant={TextVariant.L} weight={TextWeight.SemiBold}>
                {pageTitle}
              </BaseText>
              <BaseText variant={TextVariant.S} color={'gray.400'}>
                {pageDescription}
              </BaseText>
            </Stack>
          </HStack>
          {children}
        </>
      )}
    </Box>
  );
};
