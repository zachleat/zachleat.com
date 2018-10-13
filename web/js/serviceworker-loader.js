if( navigator.serviceWorker ) {
	navigator.serviceWorker.register("/web/serviceworker.js")
		.then(function( registration ) {
			console.log( "Service Worker success:", registration.scope );
		}).catch(function( error ) {
			console.log( "Service Worker error:", error );
		});
}