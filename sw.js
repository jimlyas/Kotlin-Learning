const CACHE_NAME = 'kotlin-academy-v3';
const urlsToCache = [
  './',
  './index.html',
  './favicon.svg',
  './css/styles.css',
  './js/main.js',
  './js/theme.js',
  './manifest.json'
];

const part1Lessons = [
  './part-1/index.html',
  './part-1/1-1-what-is-kotlin.html',
  './part-1/1-2-first-program.html',
  './part-1/1-3-variables.html',
  './part-1/1-4-null-safety.html',
  './part-1/1-5-control-flow.html',
  './part-1/1-6-functions.html',
  './part-1/1-7-oop.html',
  './part-1/1-8-collections.html',
  './part-1/1-9-lambdas-hof.html',
  './part-1/1-10-extension-functions.html'
];

const part2Lessons = [
  './part-2/index.html',
  './part-2/2-1-big-o-notation.html',
  './part-2/2-2-arrays.html',
  './part-2/2-3-linked-lists.html',
  './part-2/2-4-stack.html',
  './part-2/2-5-queue.html',
  './part-2/2-6-hash-map.html',
  './part-2/2-7-binary-tree-bst.html',
  './part-2/2-8-graphs.html'
];

const part3Lessons = [
  './part-3/index.html',
  './part-3/3-1-sorting.html',
  './part-3/3-2-searching.html',
  './part-3/3-3-recursion.html',
  './part-3/3-4-dynamic-programming.html',
  './part-3/3-5-graph-traversal.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        const allUrls = [...urlsToCache, ...part1Lessons, ...part2Lessons, ...part3Lessons];
        return cache.addAll(allUrls);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});