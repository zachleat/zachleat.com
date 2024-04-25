// Home-made analytics
if(( 'sendBeacon' in navigator ) && location.hostname === "www.zachleat.com") {
	// FaunaDB
	navigator.sendBeacon("https://subtle-yeot-bd8178.netlify.app/", JSON.stringify({
		path: location.pathname
	}));
}
