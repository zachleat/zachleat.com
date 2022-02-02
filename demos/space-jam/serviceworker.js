var CACHE_NAME = "spacejam-v1";
var urlsToCache = [
	"/space-jam/",
	"index.css",
	"img/bg_stars.gif",
	"img/p-bball.svg",
	"img/p-behind.gif",
	"img/p-jamcentral.gif",
	"img/p-jamlogo.svg",
	"img/p-jump.gif",
	"img/p-junior.gif",
	"img/p-lineup.gif",
	"img/p-lunartunes.gif",
	"img/p-pressbox.gif",
	"img/p-sitemap.gif",
	"img/p-souvenirs.gif",
	"img/p-studiostore.gif"
];

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}
				return fetch(event.request);
			}
		)
	);
});
