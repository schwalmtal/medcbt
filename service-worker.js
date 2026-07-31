const C='medbank-v6-antihelminthic';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','app.css','app.js','courses.json'])))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.url.includes('/slides/')){e.respondWith(fetch(e.request));return;}e.respondWith(fetch(e.request).then(r=>{let copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));});
