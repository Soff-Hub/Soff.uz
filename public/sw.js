// Web Push (VAPID) service worker. Shows notifications sent by the backend
// while the site is closed; in-page notifications still come over WebSocket.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = { body: event.data && event.data.text() };
    }

    const title = data.title || 'Soff.uz';
    event.waitUntil(
        self.registration.showNotification(title, {
            body: data.body || '',
            icon: data.icon || '/static/img/logo-192.png',
            tag: data.tag, // same tag replaces the previous notification
            data: { url: data.url || '/account/notification' },
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data.url;

    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clients) => {
                const tab = clients.find((c) => c.url.startsWith(self.location.origin));
                if (tab) {
                    tab.navigate(url);
                    return tab.focus();
                }
                return self.clients.openWindow(url);
            })
    );
});
