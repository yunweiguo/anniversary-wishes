self.addEventListener('install', (evt) => {
  self.skipWaiting()
})

self.addEventListener('activate', (evt) => {
  self.clients.claim()
})

self.addEventListener('fetch', (evt) => {
  // Basic app shell cache strategy placeholder (no-op MVP)
})

