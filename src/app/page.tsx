'use client';

import { useEffect, useState } from 'react';
import { KeurezyLogoAnimation } from '_components/custom';
import { APP_ROUTES, DASHBOARD_ROUTES } from '_config/routes';
import { authClient } from './lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RedirectAfterLogin() {
  const { data: session, isPending } = authClient.useSession();
  const [url, setUrl] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      const timer = setTimeout(() => {
        router.replace(APP_ROUTES.SIGN_IN);
      }, 1500);
      return () => clearTimeout(timer);
    }
    setUrl(DASHBOARD_ROUTES.HOME);
  }, [session, isPending]);

  return (
    <KeurezyLogoAnimation isExiting={!isPending} onAnimationComplete={() => router.push(url)} />
  );
}
