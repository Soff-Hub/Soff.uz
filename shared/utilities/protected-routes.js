// Pages that only make sense for a logged-in user. Everything else is public.
const PROTECTED_ROUTE_PREFIXES = [
    '/account',
    '/chat',
    '/order',
    '/orders',
    '/report',
];

// Account pages that also work for guests (stored in localStorage).
const PUBLIC_ACCOUNT_ROUTES = ['/account/shopping-cart', '/account/wishlist'];

export const isProtectedRoute = (pathname = '') => {
    const path = pathname.split(/[?#]/)[0];
    if (PUBLIC_ACCOUNT_ROUTES.includes(path)) return false;
    return PROTECTED_ROUTE_PREFIXES.some(
        (prefix) => path === prefix || path.startsWith(`${prefix}/`)
    );
};

// After logout: leave protected pages for home, reload public pages so
// anything rendered for the logged-in user (purchases, files, etc.) is dropped.
export const redirectAfterLogout = () => {
    if (typeof window === 'undefined') return;
    if (isProtectedRoute(window.location.pathname)) {
        window.location.href = '/';
    } else {
        window.location.reload();
    }
};
