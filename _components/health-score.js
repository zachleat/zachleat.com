class HealthScore extends HTMLElement {
	static register(tagName) {
		customElements.define(tagName || "health-score", HealthScore);
	}

	static attrs = {
		score: "score",
	}

	static css = `
:host {
	--_circle: var(--speedlify-circle);
	--_circleText: var(--speedlify-text, var(--speedlify-circle));
	--_circleBorder: var(--speedlify-border, var(--speedlify-circle));
	display: inline-flex;
	align-items: center;
	gap: 0.375em; /* 6px /16 */
}
.circle {
	font-family: system-ui, sans-serif;
	aspect-ratio: 1/1;
	min-width: 2.5ch;
	padding: 0.2142857142857em; /* 3px /14 */
	line-height: 1;
	font-size: 0.875em; /* 14px /16 */
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: 0.15384615em solid currentColor; /* 2px /13 */
	color: var(--_circleText, #666);
}
.circle-good {
	color: var(--_circleText, #088645);
	border-color: var(--_circleBorder, #0cce6b);
}
.circle-ok {
	color: var(--_circleText, #ffa400);
	border-color: var(--_circleBorder, #ffa400);
}
.circle-bad {
	color: var(--_circleText, #ff4e42);
	border-color: var(--_circleBorder, #ff4e42);
}
`;

	connectedCallback() {
		if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
			return;
		}

		if(this.shadowRoot) {
			this.shadowRoot.innerHTML = this.render();
			return;
		}

		let shadowroot = this.attachShadow({ mode: "open" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(HealthScore.css);
		shadowroot.adoptedStyleSheets = [sheet];

		let template = document.createElement("template");
		template.innerHTML = this.render();
		shadowroot.appendChild(template.content.cloneNode(true));
	}

	getScoreClass(score) {
		if(score === "" || score === undefined) {
			return "circle";
		}
		if(score < .5) {
			return "circle circle-bad";
		}
		if(score < .9) {
			return "circle circle-ok";
		}
		return "circle circle-good";
	}

	round(n, d = 0) {
		const f = 10 ** d;
		return Math.round((n + Number.EPSILON * Math.sign(n)) * f) / f;
	}

	getScoreHtml(title, value = "") {
		return `<span title="${title}" class="${this.getScoreClass(value)}">${value ? this.round(value * 100) : "…"}</span>`;
	}

	render() {
		let attrs = HealthScore.attrs;
		let content = [];

		content.push(this.getScoreHtml("Health", this.getAttribute(attrs.score)));

		return content.join("");
	}
}

if(("customElements" in window) && ("fetch" in window)) {
	HealthScore.register();
}
