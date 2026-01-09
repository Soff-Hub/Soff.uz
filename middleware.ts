import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirectWithQueries = (searchParams: URLSearchParams, url: URL) => {
    searchParams.forEach((value, key) => {
        if (
            ![
                'parentCategoryId',
                'childCategoryId',
                'slug',
                'parentCategory',
                'childCategory',
            ].includes(key)
        ) {
            url.searchParams.set(key, value);
        }
    });

    return NextResponse.redirect(url, 302);
};

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    const slug = searchParams.get('slug');
    const segments = pathname.split('/').filter(Boolean);

    if (segments[1] === 'all' || slug) {
        const url = new URL(`/${segments[0]}`, request.url);
        return redirectWithQueries(searchParams, url);
    }
}

export const config = {
    matcher: ['/3d-models-and-interior-designs/:path*'],
};
