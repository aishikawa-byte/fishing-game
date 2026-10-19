const CACHE_NAME = 'osakana-v3.2.2';
const ASSETS_TO_CACHE = ['./', './index.html', './style.css', './trivia.js', './fishsize.js', './fishfacing.js', './script.js', './addons.js', './events.js', './special.js', './minigames32.js', './ui32.js', './anim32.js', './settings32.js', './qol321.js', './celebrate32.js', './egg32.js', './devcmd.js', './i18n.js', './lang_en.js', './manifest.json', './images/favicon.png', './images/icon.png'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) =>
    Promise.all(ASSETS_TO_CACHE.map((url) => cache.add(url).catch(() => {})))
  ));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// html/css/js/json はネットワーク優先（更新がすぐ反映される）、画像・音声はキャッシュ優先
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const isCode = req.mode === 'navigate' || /\.(html|css|js|json)(\?.*)?$/.test(new URL(req.url).pathname);
  const save = (res) => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
    return res;
  };
  if (isCode) {
    event.respondWith(fetch(req).then(save).catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  } else {
    event.respondWith(caches.match(req).then((cached) => cached || fetch(req).then(save)));
  }
});
