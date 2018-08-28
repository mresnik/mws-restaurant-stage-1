const staticCacheName = 'restaurant-reviews-cache-v1';

/* Although not required, additional pages are being cached to allow for
 * offline access even if they haven't been visited.
 */
const cacheAssets = [
    '/',
    'index.html',
    'restaurant.html',
    'restaurant.html?id=1',
    'restaurant.html?id=2',
    'restaurant.html?id=3',
    'restaurant.html?id=4',
    'restaurant.html?id=5',
    'restaurant.html?id=6',
    'restaurant.html?id=7',
    'restaurant.html?id=8',
    'restaurant.html?id=9',
    'restaurant.html?id=10',
    '/css/responsive.css',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];


//Install Service Worker
self.addEventListener('install', event => {
    console.log("Service Worker: Installed");

    event.waitUntil(
        caches
        .open(staticCacheName)
        .then(cache => {
            console.log("Service Worker: Caching Files");
            return cache.addAll(cacheAssets);
        })
    );
});

//Activate Service Worker
self.addEventListener('activate', event => {
    console.log("Service Worker: Activated");
    // Deleting old caches
    event.waitUntil(
        caches.keys().then(staticCacheNames => {
            return Promise.all(
                staticCacheNames.map(cache => {
                    if (cache !== staticCacheName) {
                        console.log("Service Worker: Deleting Old Cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


// Fetch pages

self.addEventListener('fetch', (event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
}));
