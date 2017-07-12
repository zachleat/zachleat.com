var _bftn_options = {
	/*
	 * Choose from 'money', 'stop', and 'slow'. Omit this property to get the 
	 * default theme.
	 */
	theme: "stop", // @type {string}

	/*
	 * Or, if you want your own custom theme, specify its properties here.
	 * Unspecified options will fall back to the default values.
	 */
	// theme: {
	// 	className: "money", // @type {string} will be applied to iframe body tag
	// 	logos: ["images/money.png", "images/stop.png"], // @type {Array} img src values
	// 	headline: "Your headline here.", // @type {string} modal headline text
	// 	body: "Your body here." // @type {string} modal body text
	// },

	/*
	 * Choose from 'fp' for Free Press, 'dp' for Demand Progress or
	 * 'fftf' for Fight for the Future. Omit this property to randomly split
	 * form submissions between all organizations in the Battle for the Net 
	 * coalition.
	 */
	org: "fftf", // @type {string}

	/*
	 * Specify a delay (in milliseconds) before showing the widget. Defaults to one 
	 * second.
	 */
	delay: 0, // @type {number}

	/*
	 * Specify a date on which to display the widget. Defaults to July 12th, 2017 if 
	 * omitted. ISO-8601 dates are UTC time, three-argument dates (with a zero-based
	 * month) are local time.
	 */
	date: new Date(2017, 6, 12), // @type {Date}

	/*
	 * If you show the modal on your homepage, you should let users close it to
	 * access your site. However, if you launch a new tab to open the modal, closing
	 * the modal just leaves the user staring at a blank page. Set this to true to
	 * prevent closing the modal - the user can close the tab to dismiss it. Defaults
	 * to false.
	 */
	uncloseable: false, // @type {Boolean}

	/*
	 * Prevents the widget iframe from loading Google Analytics. Defaults to false.
	 */
	disableGoogleAnalytics: true, // @type {Boolean}

	/*
	 * Always show the widget. Useful for testing.
	 */
	always_show_widget: false // @type {Boolean}
};

(function() {
	// IE9+
	if (!("geolocation" in navigator)) {
		return;
	}

	var fftf = document.createElement("script");
	fftf.type = "text/javascript";
	fftf.async = true;
	fftf.src = "//widget.battleforthenet.com/widget.js";
	(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0])
		.appendChild(fftf);
})();
