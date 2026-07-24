'use client';

import { Box } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { BaseButton, BaseContainer, FloatSwitchColorMode, Icons } from '_components/custom';
import { GlobalLoader } from '_components/custom/loader/Loader';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTE_PARENTS } from '_config/routes';

export const Container = ({ children }: { children: React.ReactNode; sidebarToggle: boolean }) => {
  const path = usePathname();
  const router = useRouter();
  const parentRoute = ROUTE_PARENTS[path];

  return (
    <Box
      flex={1}
      h="100%"
      width="100%"
      mt={{ base: '0', sm: '20px' }}
      p={{ base: 2, sm: 4 }}
      border={'none'}
      position={'relative'}
    >
      <Suspense fallback={<GlobalLoader loader />}>
        {parentRoute && (
          <BaseButton
            leftIcon={<Icons.IoIosArrowRoundBack />}
            size="xs"
            variant="outline"
            onClick={() => router.push(parentRoute)}
          >
            Retour
          </BaseButton>
        )}
        <BaseContainer mt={{ base: '0', sm: '10px' }} p={0} border={'none'}>
          {children}
        </BaseContainer>
        <FloatSwitchColorMode />
      </Suspense>
    </Box>
  );
};
