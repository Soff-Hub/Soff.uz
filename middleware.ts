import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VALID_LOCALES } from './shared/constants/lang-list';

// Only match actual file extensions (images, fonts, etc.)
const PUBLIC_FILE =
    /\.(?:jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|webp)$/i;

export function middleware(req: NextRequest) {
    const { pathname, search, locale } = req.nextUrl;
    const url = req.url;

    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const pathnameHasLocale = VALID_LOCALES.some((locale) => {
        const localePattern = new RegExp(`/${locale}(/|$)`);
        return localePattern.test(url);
    });

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    const savedLocale = req.cookies.get('user_locale');
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const tld = host?.split('.').pop();
    let targetLocale = savedLocale || (tld === 'kg' ? 'ru' : 'uz');

    if (targetLocale === locale) {
        return NextResponse.next();
    }

    const redirectUrl = new URL(req.url);
    redirectUrl.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
    redirectUrl.search = search;

    return NextResponse.redirect(redirectUrl);
}

export const config = {
    matcher: ['/', '/((?!api|_next|.*\\..*).*)'],
};
