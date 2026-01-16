import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only match actual file extensions (images, fonts, etc.)
const PUBLIC_FILE =
    /\.(?:jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|webp)$/i;
const VALID_LOCALES = ['uz', 'en', 'ru'] as const;

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;
    const url = req.url;

    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    console.log('✅ Middleware is running...');
    console.log('Request URL:', {
        url: req.url,
        pathname: req.nextUrl.pathname,
    });

    // Check if pathname already starts with a valid locale
    const pathnameHasLocale = VALID_LOCALES.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    console.log('Has locale in pathname?', pathnameHasLocale);

    // If locale is already in pathname, continue
    if (pathnameHasLocale) {
        console.log('✅ Locale already in path, continuing...');
        return NextResponse.next();
    }

    // Determine target locale
    const savedLocale = req.cookies.get('user_locale');
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const tld = host?.split('.').pop();

    console.log('🍪 Pure cookie:', req.cookies.get('user_locale'));
    console.log('🍪 Saved locale from cookie:', savedLocale);
    console.log('🌐 Host:', host);
    console.log('🌐 Top-level domain (TLD):', tld);

    let targetLocale: string = 'uz'; // Default

    if (savedLocale && VALID_LOCALES.includes(savedLocale as any)) {
        targetLocale = savedLocale;
        console.log('📍 Using locale from cookie:', targetLocale);
    } else if (tld === 'kg') {
        targetLocale = 'ru';
        console.log('📍 Using locale from TLD (.kg):', targetLocale);
    } else {
        console.log('📍 Using default locale:', targetLocale);
    }

    // Build redirect URL
    const redirectUrl = new URL(req.url);
    redirectUrl.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
    redirectUrl.search = search;

    console.log('🔀 Redirecting to:', redirectUrl.pathname);

    return NextResponse.redirect(redirectUrl);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
