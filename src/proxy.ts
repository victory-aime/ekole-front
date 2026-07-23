import { NextRequest, NextResponse } from 'next/server';
import { APP_ROUTES, DASHBOARD_ROUTES } from '_config/routes';

const PROTECTED_PREFIXES = Object.values(DASHBOARD_ROUTES);

const SESSION_COOKIE_NAMES = [
  '__Secure-better-auth.session_token',
  'better-auth.session_token',
] as const;

const SESSION_ENDPOINT = '/api/auth/get-session';
const SESSION_TIMEOUT = 5000;
interface BetterAuthSession {
  user: {
    id: string;
    role: string;
    email: string;
    emailVerified: boolean;
    [key: string]: unknown;
  };
  session: {
    id: string;
    token: string;
    expiresAt: string;
    permissions: unknown[];
    [key: string]: unknown;
  };
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';
  return NextResponse.redirect(url);
}

function getSessionToken(request: NextRequest): string | null {
  for (const name of SESSION_COOKIE_NAMES) {
    const token = request.cookies.get(name)?.value;
    if (token) return token;
  }

  return null;
}

function buildCookieHeader(request: NextRequest): string {
  return request.cookies
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

function getBackendUrl(): string {
  const url = process.env.API_BACKEND_URL;

  if (!url) {
    throw new Error('API_BACKEND_URL is missing.');
  }

  return url.replace(/\/$/, '');
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

// ─────────────────────────────────────────
// SESSION
// ─────────────────────────────────────────

async function getSession(request: NextRequest): Promise<BetterAuthSession | null> {
  if (!getSessionToken(request)) {
    return null;
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, SESSION_TIMEOUT);

  try {
    const response = await fetch(`${getBackendUrl()}${SESSION_ENDPOINT}`, {
      method: 'GET',
      headers: {
        cookie: buildCookieHeader(request),
        'content-type': 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const session = (await response.json()) as BetterAuthSession | null;

    if (!session?.user) {
      return null;
    }

    return session;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────

export async function proxy(request: NextRequest) {
  if (!isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const session = await getSession(request);

  if (!session) {
    return redirectTo(request, APP_ROUTES.PROTECTED);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
