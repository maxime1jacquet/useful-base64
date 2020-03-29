// const static = 'useful-base64';
// const assets = [
//   '/',
//   '/index.html',
//   '/server.js',
//   '/js/app.js',
//   '/stylesheets/index.css',
//   '/assets/favicon.ico',
//   '/assets/main-icon.png'
// ];

// self.addEventListener('install', installEvent => {
//   installEvent.waitUntil(
//     caches.open(static).then(cache => {
//       cache.addAll(assets);
//     })
//   );
// });
// self.addEventListener('fetch', fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request);
//     })
//   );
// });
