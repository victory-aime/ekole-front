'use client';

import React, { FunctionComponent, useEffect, useState } from 'react';
import { Container } from './container/Container';
import { useAuthContext } from '_context/auth-context';
import { Sidebar } from './sidebar/Sidebar';
import { Footer } from './footer/Footer';
import { SidebarInset } from './sidebar/components/SidebarInset';
import { Header } from './header/Header';
import { GuidedTour } from './guide-tour/GuidedTour';
import { useBreakpointValue } from '@chakra-ui/react';
import { tourSteps } from '_constants/tourStep';
import { StorageKey } from '_constants/StorageKeys';
import { BaseModal, BaseText, Icons } from '_components/custom';
import { AuthModule } from '_store/state-management';
import { useUserContext } from '_context/user-context';
import { useAuth } from '_hooks/useAuth';
import { ENUM } from '_types/*';

export const Layout: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { logout } = useAuth();
  const { isLoading } = useAuthContext();
  const { user: currentUser, isLoading: currentUserLoad } = useUserContext();
  const [showTour, setShowTour] = useState(false);
  const isInactiveUser = !currentUserLoad && currentUser?.status === ENUM.Status.INACTIVE;

  const { mutateAsync: sendVerificationEmail } = AuthModule.sendEmailVerificationMutation({});

  useEffect(() => {
    if (isMobile) return;

    const enabled = localStorage.getItem(StorageKey.ENABLED_GUIDED_TOUR);

    if (enabled === 'true') {
      const timer = setTimeout(() => setShowTour(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  if (currentUserLoad) return null;

  return (
    <>
      {isInactiveUser ? (
        <BaseModal
          isOpen={isInactiveUser}
          icon={<Icons.Warn />}
          modalType={'alertdialog'}
          title={'Compte désactiver'}
          onClick={() => logout()}
          isLoading={isLoading}
          size={'sm'}
          showCloseButton={false}
          buttonCancelTitle=""
          buttonSaveTitle={'COMMON.LOGOUT'}
        >
          <BaseText color="gray.600">
            Votre compte est désactivé. Veuillez contacter votre administrateur pour réactiver votre
            accès.
          </BaseText>
        </BaseModal>
      ) : (
        <React.Fragment>
          {showTour && <GuidedTour onComplete={() => setShowTour(false)} tourStep={tourSteps} />}
          <Sidebar
            onShowSidebar={() => setSidebarOpen((prev) => !prev)}
            sideToggled={isSidebarOpen}
          />
          <SidebarInset variant="inset" collapsed={!isSidebarOpen} data-tour="finish">
            <Header
              sideToggled={isSidebarOpen}
              onShowSidebar={() => setSidebarOpen((prev) => !prev)}
            />
            <Container isLoading={isLoading}>{children}</Container>
            <Footer />
          </SidebarInset>
        </React.Fragment>
      )}
    </>
  );
};
