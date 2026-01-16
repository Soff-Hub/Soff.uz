import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return;
    }

    const validLocales = ['uz', 'en', 'ru'];
    const currentLocale = req.nextUrl.locale;

    // If URL has valid locale, just return
    if (currentLocale && validLocales.includes(currentLocale)) {
        return;
    }

    // URL has no locale, check cookie
    const savedLocale = req.cookies.get('user_locale');

    // Use cookie locale if valid, otherwise default to 'uz'
    const targetLocale =
        savedLocale && validLocales.includes(savedLocale)
            ? savedLocale
            : undefined;

    // Clean pathname - remove any undefined segments
    let cleanPathname = req.nextUrl.pathname.replace(/\/undefined/g, '');

    if (!targetLocale) {
        const host =
            req.headers.get('x-forwarded-host') || req.headers.get('host');

        if (host) {
            const parts = host.split('.');
            const tld = parts[parts.length - 1];

            if (tld === 'kg') {
                return NextResponse.redirect(
                    new URL(
                        `/${targetLocale}${cleanPathname}${req.nextUrl.search}`,
                        req.url
                    )
                );
            }
        }
    }

    return NextResponse.redirect(
        new URL(
            `/${targetLocale || 'uz'}${cleanPathname}${req.nextUrl.search}`,
            req.url
        )
    );
}
