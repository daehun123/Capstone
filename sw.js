self.addEventListener("install", (e) => {
  console.log("[Service Worker] installed");
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] actived", e);
});

self.addEventListener("fetch", (e) => {
  console.log("[Service Worker] fetched resource " + e.request.url);
});

self.addEventListener("message", (event) => {
  console.log("[Service Worker] Received message:", event.data);

  if (event.source) {
    event.source.postMessage({ status: "SW received your message" });
  }
});
