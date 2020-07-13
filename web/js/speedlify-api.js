;(function() {
	if(!("customElements" in window) || !("fetch" in window)) {
		return;
	}

	customElements.define("speedlify-api", class extends HTMLElement {
		constructor() {
			super();
			this.speedlifyUrl = this.getAttribute("speedlify-url");
			this.directLink = this.getAttribute("lighthouse-link");
			this.shorthash = this.getAttribute("hash");

			let attrs = [];
			if(!this.speedlifyUrl) {
				attrs.push("speedlify-url");
			}
			if(!this.shorthash) {
				attrs.push("hash");
			}
			if(attrs.length) {
				console.log(`Missing attributes in \`<speedlify-api>\`: ${attrs.join(", ")}`);
				return;
			}

			// lol async
			this.init();
		}

		async init() {
			let data = await this.fetchData(this.shorthash);
			this.innerHTML = this.getHtml(data);
		}

		async fetchData(hash) {
			let response = await fetch(`${this.speedlifyUrl}/api/${hash}.json`);
			let json = await response.json();

			return json;
		}

		getScoreClass(score) {
			if(score < .5) {
				return "score score-bad";
			}
			if(score < .9) {
				return "score score-ok";
			}
			return "score score-good";
		}

		getHtml(data) {
			let scores = [];
			scores.push(`<span title="Performance" class="${this.getScoreClass(data.lighthouse.performance)}">${data.lighthouse.performance * 100}</span>`);
			scores.push(`<span title="Accessibility" class="${this.getScoreClass(data.lighthouse.accessibility)}">${data.lighthouse.accessibility * 100}</span>`);
			scores.push(`<span title="Best Practices" class="${this.getScoreClass(data.lighthouse.bestPractices)}">${data.lighthouse.bestPractices * 100}</span>`);
			scores.push(`<span title="SEO" class="${this.getScoreClass(data.lighthouse.seo)}">${data.lighthouse.seo * 100}</span>`);

			let content = [];

			// lol css-in-js
			content.push(`<style>
speedlify-api {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}
speedlify-api .summary {
	margin-right: 1em;
}
speedlify-api .score {
	font-size: 0.8125em; /* 13px /16 */
	width: 2.6em;
	height: 2.6em;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: 2px solid #0cce6b;
	color: #088645;
	margin-left: 0.4615384615385em; /* 6px /13 */
}
speedlify-api .score-ok {
	color: #ffa400;
}
speedlify-api .score-bad {
	color: #ff4e42;
}
</style>`);

			content.push(`<span class="summary">${data.weight.summary}</span>`);
			content.push(`<span><a href="${this.directLink || this.speedlifyUrl}">Lighthouse</a>${scores.join("")}</span>`);
			return content.join(" ");
		}
	});
})();