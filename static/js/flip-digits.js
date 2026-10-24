class FlipDigits extends HTMLElement {
	static DURATION = 90;

	static STYLE = `
:host {
	display: flex;
	gap: .375rem;
}
.flip-digit {
	position: relative;
	width: .8em;
	height: 1.2em;
	perspective: 4em;
	color: var(--flap-text, #f4f1e8);
}
.flip-half {
	position: absolute;
	inset-inline: 0;
	height: 50%;
	overflow: hidden;
	background: var(--flap-bg, #1c1c1c);
	backface-visibility: hidden;
}
.flip-half > span {
	display: block;
	line-height: 1.2em;
	text-align: center;
}
.flip-upper {
	inset-block-start: 0;
	border-radius: .08em .08em 0 0;
	transform-origin: 50% 100%;
	border-block-end: .02em solid #000;
}
.flip-lower {
	inset-block-end: 0;
	border-radius: 0 0 .08em .08em;
	transform-origin: 50% 0;
	background: var(--flap-bg-lower, #222);
}
.flip-lower > span {
	transform: translateY(-50%);
}`;

	get since() {
		return this.getAttribute("since");
	}

	get pad() {
		return parseInt(this.getAttribute("pad"), 10) || 1;
	}

	get days() {
		let [y, m, d = 1] = this.since.split("-").map(Number);
		return Math.max(0, Math.floor((Date.now() - new Date(y, m - 1, d)) / 864e5));
	}

	static half(type, value) {
		let el = document.createElement("span");
		el.className = `flip-half flip-${type}`;
		el.innerHTML = `<span>${value}</span>`;
		return el;
	}

	static createDigit(value) {
		let digit = document.createElement("span");
		digit.className = "flip-digit";
		digit.append(FlipDigits.half("upper", value), FlipDigits.half("lower", value));
		return digit;
	}

	async flip(digit, from, to) {
		let [upper, lower] = digit.children;
		upper.firstChild.textContent = to;
		let flapTop = FlipDigits.half("upper", from);
		let flapBottom = FlipDigits.half("lower", to);
		flapBottom.style.transform = "rotateX(90deg)";
		digit.append(flapTop, flapBottom);

		let duration = FlipDigits.DURATION;
		await flapTop.animate([{ transform: "rotateX(0)" }, { transform: "rotateX(-90deg)" }], { duration, easing: "ease-in" }).finished;
		await flapBottom.animate([{ transform: "rotateX(90deg)" }, { transform: "rotateX(0)" }], { duration, easing: "ease-out", fill: "forwards" }).finished;
		lower.firstChild.textContent = to;
		flapTop.remove();
		flapBottom.remove();
	}

	async run(digit, target) {
		for(let n = 1; n <= target; n++) {
			await this.flip(digit, n - 1, n);
		}
	}

	connectedCallback() {
		let targets = String(this.days).padStart(this.pad, "0").split("").map(Number);
		let reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
		let digits = targets.map(target => FlipDigits.createDigit(reduceMotion ? target : 0));
		let shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });
		let style = document.createElement("style");
		style.textContent = FlipDigits.STYLE;
		shadowRoot.replaceChildren(style, ...digits);

		if(!reduceMotion) {
			digits.forEach((digit, i) => this.run(digit, targets[i]));
		}
	}
}

if("customElements" in window) {
	window.customElements.define("flip-digits", FlipDigits);
}
