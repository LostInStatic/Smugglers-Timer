const APP_NAME = 'SmugglersTimer';
const VERSION = '01';

const CACHE_NAME = APP_NAME + '_v' + VERSION;

const URLS = [
    './',
    './index.html',
    './timer.js',
    './timer.css',
    './start.mp3',
    './end.mp3'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            (cache) => {
                return cache.addAll(URLS);
            }
        ).catch(
            err => console.log(err)
        )
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(
            () => {
                return caches.match(evt.request);
            }
        )
    );
});

self.addEventListener('fetch', function (evt) {
    // Snooze logs...
    // console.log(event.request.url);
    evt.respondWith(
        // Firstly, send request..
        fetch(evt.request).catch(function () {
            // When request failed, return file from cache...
            return caches.match(evt.request);
        })
    );
});
