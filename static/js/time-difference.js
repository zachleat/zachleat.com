class TimeDifference extends HTMLElement {
	// Order of these keys in important
	static UNITS = {
		seconds:  1,
		minutes:  60,
		hours:    60 * 60,
		days:     60 * 60 * 24,
		weeks:    60 * 60 * 24 * 7,
		months:   60 * 60 * 24 * (365/12),
		years:    60 * 60 * 24 * 365,
	};

	get time() {
		return this.querySelectorAll("time");
	}

	get units() {
		return this.getAttribute("units");
	}

	get live() {
		return this.hasAttribute("live");
	}

	get interval() {
		// numeric override (seconds)
		let attr = this.getAttribute("interval");
		if(attr) {
			return parseInt(attr, 10) * 1000;
		}

		// use units if specified
		if(this.units) {
			return TimeDifference.UNITS[this.units] * 1000;
		}

		// default: 1 minute
		return TimeDifference.UNITS.minutes * 1000;
	}

	static getUnits(date1, date2) {
		let diff = Math.abs(date1 - date2) / 1000;
		let prev;
		for(let unit in TimeDifference.UNITS) {
			if(diff < TimeDifference.UNITS[unit]) {
				return prev || unit;
			}
			prev = unit;
		}

		// default to largest
		return "years";
	}

	static getDivisor(units) {
		return (TimeDifference.UNITS[units] || 1) * 1000;
	}

	static getText(dateStr, units, locale) {
		let date1;
		if(!isNaN(Date.parse(dateStr))) {
			date1 = Date.parse(dateStr);
		} else {
			// Timestamp
			date1 = new Date(parseInt(dateStr, 10));
		}
		let date2 = Date.now();
		if(!date1 || !date2) {
			return;
		}

		units = units || this.getUnits(date1, date2);

		let rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
		let divisor = TimeDifference.getDivisor(units);
		let diff = (date1 - date2) / divisor;

		if(diff < 0) {
			return rtf.format(Math.ceil(diff), units);
		}
		return rtf.format(Math.floor(diff), units);
	}

	update() {
		this.time.forEach(timeEl => {
			let dateStr = timeEl.getAttribute("datetime");
			if(!dateStr) {
				// For Shadow DOM method, using a global <template>
				dateStr = this.getAttribute("date");
			}

			let locale = this.getAttribute("locale") || "en";
			timeEl.innerText = TimeDifference.getText(dateStr, this.units, locale);
		})
	}

	connectedCallback() {
		this.update();

		if(this.live) {
			setInterval(this.update.bind(this), this.interval);
		}
	}
}

if(("customElements" in window) && Date.parse && ("Intl" in window) && Intl.RelativeTimeFormat) {
	window.customElements.define("time-difference", TimeDifference);
}
