const CACHE='mpa-shell-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;

  const u=new URL(e.request.url);

  if(u.origin===location.origin){
    if(e.request.mode==='navigate'){
      e.respondWith(
        fetch(e.request).catch(()=>caches.match('./index.html'))
      );
      return;
    }

    e.respondWith(
      caches.match(e.request).then(r=>
        r||fetch(e.request).then(x=>{
          const copy=x.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
          return x;
        })
      )
    );
  }
});
