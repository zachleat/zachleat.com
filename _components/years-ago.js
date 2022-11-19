class YearsAgo extends HTMLElement {
	static tagName = "years-ago";

	getDate() {
		let timestamp = this.getAttribute("timestamp");
		if(timestamp) {
			return (new Date()).setTime(timestamp);
		}

		return Date.parse(this.getAttribute("date"));
	}

	connectedCallback() {
		let locale = this.getAttribute("locale") || "en";
		let rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
		let date = this.getDate();
		if(!date) {
			return;
		}

		let yearsDiff = Math.floor((date - Date.now())/(1000 * 60 * 60 * 24 * 365));
		this.innerText = rtf.format(yearsDiff, "year");
	}
}

if(("customElements" in window) && Date.parse && ("Intl" in window) && Intl.RelativeTimeFormat) {
	window.customElements.define(YearsAgo.tagName, YearsAgo);
}
