// OneSignal is no longer used. Browsers still check this URL for updates of the
// worker that old subscribers have registered, so this version removes itself.
// The file can be deleted once old subscribers have picked it up (2–3 months).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
    self.registration.unregister();
});
