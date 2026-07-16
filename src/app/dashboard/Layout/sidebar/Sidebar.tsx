'use client';

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { BaseButton, Icons } from '_components/custom';
import { MobileSidebar } from './components/MobileSidebar';
import { SideBarProps } from './types';
import { RenderGroupedLinks } from './components/RenderGroupedLinks';
import { useAuth } from '_hooks/useAuth';
import { SideToolTip } from './components/SideToolTip';
import { useSessionRefreshContext } from '_context/SessionRefresh-context';
import { useMemo } from 'react';
import { useColorMode } from '_components/ui/color-mode';
import { useUserContext } from '_context/user-context';
import { DASHBOARD_ROUTES } from '_config/routes';
import { SIDEBAR_ROUTES } from './routes/routes';

export const Sidebar = ({ onShowSidebar, sideToggled }: SideBarProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { logout } = useAuth();
  const { dismissToast } = useSessionRefreshContext();
  const { colorMode } = useColorMode();
  const { user, isLoading } = useUserContext();

  const badgesByPath = useMemo(() => {
    return {
      [DASHBOARD_ROUTES.PROFILE]: 0,
    };
  }, []);

  const sidebarLinks = useMemo(() => {
    return SIDEBAR_ROUTES.map((group) => ({
      ...group,
      links: group.links.map((link) => {
        const badgeValue = badgesByPath[link.path as string];
        return {
          ...link,
          badge: badgeValue > 0 ? badgeValue : undefined,
        };
      }),
    }));
  }, [user?.role, user?.role, badgesByPath]);

  return (
    <Box>
      {isMobile ? (
        <MobileSidebar
          isOpen={!sideToggled}
          onClose={onShowSidebar}
          links={sidebarLinks}
          handleLogout={() => {
            dismissToast?.();
            logout();
          }}
        />
      ) : (
        <Box
          w={!sideToggled ? '80px' : '250px'}
          h="100vh"
          position="fixed"
          transition="width 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)"
          overflow="hidden"
          boxShadow="lg"
          borderRight="1px solid"
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.900'}
          display="flex"
          flexDirection="column"
          zIndex="10"
          data-tour="sidebar"
        >
          <Flex
            align="center"
            justifyContent={!sideToggled ? 'center' : 'flex-start'}
            gap={3}
            px={3}
            py={2}
            borderBottom="1px solid"
            borderColor={colorMode === 'light' ? 'gray.200' : 'gray.900'}
          >
            image
          </Flex>

          {/* LINKS */}

          <RenderGroupedLinks
            isCollapsed={sideToggled}
            links={sidebarLinks}
            isLoading={isLoading}
          />
          <SideToolTip disabled={sideToggled} label={'Déconnexion'}>
            <Box
              p={3}
              borderTop="1px solid"
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.900'}
            >
              <BaseButton
                width={'full'}
                colorType={'danger'}
                leftIcon={<Icons.Logout />}
                onClick={() => {
                  dismissToast?.();
                  logout();
                }}
              >
                {sideToggled ? 'Déconnexion' : null}
              </BaseButton>
            </Box>
          </SideToolTip>
        </Box>
      )}
    </Box>
  );
};
