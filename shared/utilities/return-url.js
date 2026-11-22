export const isReturnUrlEmpty = (returnUrl) => {
    return (
        !returnUrl ||
        returnUrl === 'undefined' ||
        returnUrl === 'null' ||
        returnUrl.trim() === '/' ||
        returnUrl.trim() === ''
    );
};

// SoffX AI at /labs is another app behind a rewrite: its pages need a full load,
// which also signs it in from the session that was just made.
const isOtherApp = (url) => url === '/labs' || url.startsWith('/labs/') || url.startsWith('/labs?');

/** The `returnUrl` from the query, decoded, or null if there is none to go to. */
export const readReturnUrl = (query) => {
    const raw = Array.isArray(query?.returnUrl) ? query.returnUrl[0] : query?.returnUrl;
    const url = decodeURIComponent(raw || '');
    // Our own paths only: "//host" and "https://…" would leave the site.
    if (isReturnUrlEmpty(url) || !url.startsWith('/') || url.startsWith('//')) return null;
    return url;
};

/** Goes to `url` after sign-in: a full page load into /labs, the router elsewhere. */
export const goToReturnUrl = (router, url) => {
    if (isOtherApp(url)) window.location.assign(url);
    else router.push(url);
};
