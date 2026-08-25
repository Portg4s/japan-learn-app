// Service worker — 日本語ラボ
// Stratégie : network-first avec fallback cache (pour l'offline).
// Le service worker n'intercepte JAMAIS : ses propres mises à jour (/sw.js),
// les modules du serveur de dev Vite, ni aucune requête cross-origin.

const CACHE = "nihongo-labo-v2";

// Icônes et manifest — les seuls fichiers vraiment statiques à pré-cacher.
const PRECACHE = [
  "/manifest.webmanifest",
  "/icon-192.svg",
  "/icon-512.svg",
  "/logo.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {}) // ne jamais faire échouer l'installation
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Ne jamais intercepter :
  // - la propre mise à jour du service worker (sinon le navigateur ne
  //   détecterait jamais les nouvelles versions et resterait bloqué)
  // - les requêtes du serveur de dev Vite (modules sources, HMR, deps)
  if (
    url.pathname === "/sw.js" ||
    url.pathname.startsWith("/src/") ||
    url.pathname.startsWith("/@vite/") ||
    url.pathname.startsWith("/@fs/") ||
    url.pathname.startsWith("/node_modules/")
  ) {
    return;
  }

  // Seules les requêtes same-origin sont gérées.
  if (url.origin !== self.location.origin) return;

  // Navigations : JAMAIS de cache pour le HTML (sauf offline total).
  // Sinon un vieux HTML en cache pourrait continuer à charger d'anciens
  // modules et casser l'app.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("/"))
      )
    );
    return;
  }

  // Network-first : on sert toujours la version fraîche, et on ne met en
  // cache que les réponses réussies. Le cache n'est qu'un fallback offline.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("/"))
      )
  );
});
