'use client';

import { Card, Center, Flex, VStack } from '@chakra-ui/react';
import { BaseButton, BaseIcon, BaseText, FloatSwitchColorMode } from '_components/custom';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { VariablesColors } from '_theme/variables';
import { FaLock } from 'react-icons/fa6';
import { APP_ROUTES } from '_config/routes';
import Link from 'next/link';
import { useThemeColors } from '_theme/useThemeColors';

export default function UnauthorizedPage() {
  const { hexToRGBA } = useThemeColors();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Flex direction="column" minH="100vh">
      <Flex width={'full'} p={4} justifyContent={'space-between'}>
        <Link href={APP_ROUTES.ROOT}>Image here</Link>

        <BaseButton
          variant={'outline'}
          colorType={'neutral'}
          onClick={() => router.replace(APP_ROUTES.SIGN_IN)}
        >
          <BaseText color={'gray.500'}>{t('COMMON.LOGIN')}</BaseText>
        </BaseButton>
      </Flex>
      <Center w="full" flex={1} px={4} py={{ base: 4, md: 16 }}>
        <Card.Root
          size="md"
          w="full"
          maxW={{ base: '100%', md: '450px' }}
          border="none"
          backdropFilter={{ base: 'none', md: 'blur(14px)' }}
          css={{
            WebkitBackdropFilter: { base: 'none', md: 'blur(14px)' },
          }}
          borderRadius={{ base: 'none', md: '2xl' }}
          boxShadow={{ base: 'none', md: '0 20px 40px rgba(0,0,0,0.15)' }}
        >
          <Card.Header alignItems="center" gap={3}>
            <BaseIcon
              borderRadius={'12px'}
              color={hexToRGBA(VariablesColors.red, 0.1)}
              borderColor={hexToRGBA(VariablesColors.red, 0.5)}
              borderWidth={2}
              boxSize={'50px'}
            >
              <FaLock size={22} color={VariablesColors.red} />
            </BaseIcon>

            <Card.Title fontSize="xl">{'Accès restreint'}</Card.Title>
            <VStack fontSize="sm" color="gray.500" textAlign="center">
              Vous ne disposez pas des autorisations nécessaires pour afficher cette page.Si vous
              pensez qu’il s’agit d’une erreur, contactez l'équipe support de Ekole .
            </VStack>
          </Card.Header>
          <Card.Body px={{ base: 0, md: 6 }} gap={3}>
            <BaseButton onClick={() => router.replace(APP_ROUTES.SIGN_IN)}>
              {t('COMMON.LOGIN')}
            </BaseButton>
          </Card.Body>
        </Card.Root>
      </Center>
      <FloatSwitchColorMode />
    </Flex>
  );
}
