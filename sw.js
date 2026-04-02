const BASE_PATH = '/Kotlin-Learning/';
const CACHE_NAME = 'kotlin-academy-v2';
const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'favicon.svg',
  BASE_PATH + 'css/styles.css',
  BASE_PATH + 'js/main.js',
  BASE_PATH + 'js/theme.js',
  BASE_PATH + 'manifest.json'
];

const part1Lessons = [
  BASE_PATH + 'part-1/index.html',
  BASE_PATH + 'part-1/1-1-what-is-kotlin.html',
  BASE_PATH + 'part-1/1-2-first-program.html',
  BASE_PATH + 'part-1/1-3-variables.html',
  BASE_PATH + 'part-1/1-4-null-safety.html',
  BASE_PATH + 'part-1/1-5-control-flow.html',
  BASE_PATH + 'part-1/1-6-functions.html',
  BASE_PATH + 'part-1/1-7-oop.html',
  BASE_PATH + 'part-1/1-8-collections.html',
  BASE_PATH + 'part-1/1-9-lambdas-hof.html',
  BASE_PATH + 'part-1/1-10-extension-functions.html'
];

const part2Lessons = [
  BASE_PATH + 'part-2/index.html',
  BASE_PATH + 'part-2/2-1-big-o-notation.html',
  BASE_PATH + 'part-2/2-2-arrays.html',
  BASE_PATH + 'part-2/2-3-linked-lists.html',
  BASE_PATH + 'part-2/2-4-stack.html',
  BASE_PATH + 'part-2/2-5-queue.html',
  BASE_PATH + 'part-2/2-6-hash-map.html',
  BASE_PATH + 'part-2/2-7-binary-tree-bst.html',
  BASE_PATH + 'part-2/2-8-graphs.html'
];

const part3Lessons = [
  BASE_PATH + 'part-3/index.html',
  BASE_PATH + 'part-3/3-1-sorting.html',
  BASE_PATH + 'part-3/3-2-searching.html',
  BASE_PATH + 'part-3/3-3-recursion.html',
  BASE_PATH + 'part-3/3-4-dynamic-programming.html',
  BASE_PATH + 'part-3/3-5-graph-traversal.html'
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