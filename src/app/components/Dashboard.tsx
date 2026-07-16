'use client';

import { BaseContainer, BaseText } from '_components/custom';
import { Span } from '@chakra-ui/react';
import { authClient } from '../lib/auth-client';

export const Dashboard = () => {
  const { data: session } = authClient.useSession();

  return (
    <BaseContainer
      title="Tableau de bord"
      description={
        <BaseText fontSize={'md'}>
          Bienvenue,
          <Span textTransform={'capitalize'} color={'primary.500'} fontWeight={'bold'}>
            {session?.user?.name}
          </Span>
        </BaseText>
      }
      border={'none'}
    >
      <BaseText>Welcome to dashboard</BaseText>
    </BaseContainer>
  );
};
