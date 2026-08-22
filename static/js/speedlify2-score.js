/**
 * <speedlify2-score> — Lighthouse scores for one URL, with a summary on hover.
 *
 * Inspired by https://github.com/zachleat/speedlify-score, with one deliberate
 * difference: there is no `urls.json` index to download. The data file for a
 * URL is found by slugifying the URL in the browser with the same rules the
 * generator uses, so a page needs exactly one request for exactly the data it
 * shows — and no index, no crypto, and no secure context to get it.
 *
 *   <script type="module" src="https://your-speedlify/js/speedlify2-score.js"></script>
 *   <speedlify2-score speedlify-url="https://your-speedlify/"></speedlify2-score>
 *
 * With no `url`, it describes the page it is embedded on.
 *
 *   <speedlify2-score speedlify-url="https://your-speedlify/" url="https://example.com/"></speedlify2-score>
 *
 * Always renders the same four Lighthouse scores. Everything else about the
 * site is in the tooltip on hover or focus.
 *
 * A site whose slug collided with another is published under its hash instead,
 * and will read here as unmeasured rather than as the wrong site. That is the
 * deliberate trade for a filename a browser can work out on its own.
 */

/**
 * Shared across every instance on the page.
 *
 * Ten components pointing at the same URL should make one request, so both the
 * in-flight promise and the parsed body are cached by URL.
 */
class SpeedlifyStore {
	constructor() {
		this.fetches = new Map();
	}

	static join(base, path) {
		const root = base.endsWith("/") ? base : `${base}/`;
		return root + (path.startsWith("/") ? path.slice(1) : path);
	}

	/**
	 * Normalize exactly as lib/hash.js does — trailing slash, lowercase host,
	 * no fragment. A mismatch here means a 404 rather than a wrong answer,
	 * which is at least loud.
	 */
	static normalizeUrl(url) {
		try {
			const u = new URL(url);
			u.hash = "";
			u.hostname = u.hostname.toLowerCase();
			if (u.pathname === "") u.pathname = "/";
			return u.toString();
		} catch {
			return String(url).trim();
		}
	}

	/**
	 * The published filename for a URL. Must match `siteSlug()` in lib/slug.js
	 * exactly — a drift here is a 404, not a wrong answer, which is at least
	 * loud. There is a test asserting the two agree.
	 *
	 * Host, path and query; scheme dropped, `www.` kept. A literal `-` doubles
	 * so a dash in a path stays distinct from a path boundary, and every
	 * substitution is per-character rather than per-run.
	 */
	static slug(url) {
		let source;
		try {
			const u = new URL(SpeedlifyStore.normalizeUrl(url));
			const pathname = u.pathname === "/" ? "" : u.pathname.replace(/\/$/, "");
			source = `${u.hostname}${pathname}${u.search}`;
		} catch {
			source = String(url).trim();
		}

		const slug = source
			.toLowerCase()
			.replace(/-/g, "--")
			.replace(/[^a-z0-9-]/g, "-")
			.slice(0, 180);

		// A URL that substitutes to nothing but separators is published under its
		// hash, which this cannot derive — so ask for a name that will 404 rather
		// than one that might hit another site.
		return /[a-z0-9]/.test(slug) ? slug : "";
	}

	async fetch(apiUrl) {
		if (!this.fetches.has(apiUrl)) {
			this.fetches.set(
				apiUrl,
				fetch(apiUrl).then((response) => {
					if (!response.ok) throw new Error(`${response.status} for ${apiUrl}`);
					return response.json();
				})
			);
		}
		return this.fetches.get(apiUrl);
	}

	async load(speedlifyUrl, { url }) {
		return this.fetch(SpeedlifyStore.join(speedlifyUrl, `api/site/${SpeedlifyStore.slug(url)}.json`));
	}
}

const store = new SpeedlifyStore();

class SpeedlifyScore extends HTMLElement {
	static tagName = "speedlify2-score";

	static register(tagName) {
		if (!globalThis.customElements?.get(tagName || SpeedlifyScore.tagName)) {
			customElements.define(tagName || SpeedlifyScore.tagName, SpeedlifyScore);
		}
	}

	static attrs = {
		speedlifyUrl: "speedlify-url",
		url: "url",
		// "light" or "dark". Absent means follow the reader's system setting.
		theme: "theme",
	};

	static css = `
/*
 * Colours come from custom properties so the same stylesheet can render on a
 * light page or a dark one. Three states, in this order:
 *
 *   :host                              the dark palette, unconditionally
 *   @media (prefers-color-scheme: light)  light, unless theme="dark" says otherwise
 *   :host([theme="light"])             light, whatever the system says
 *   :host([theme="dark"])              dark, whatever the system says
 *
 * The media query has to be guarded against an explicit theme="dark" or it
 * would win over it; the explicit rules come last so they win over the query.
 *
 * This matters more than it looks. The numerals inside the rings are drawn in
 * the band colour directly onto the *host page's* background — there is no card
 * behind them — and the dark-page greens and ambers measure about 2:1 on white.
 * A badge on a light page was close to unreadable before this.
 */
:host {
	--ss-good: #0cce6b;
	--ss-average: #ffa400;
	--ss-poor: #ff4e42;
	--ss-none: #888;
	--ss-track: rgb(136 136 136 / .35);
	--ss-tip-bg: #1c1c1c;
	--ss-tip-text: #fff;
	--ss-tip-link: #7cc0ff;
	--ss-tip-shadow: rgb(0 0 0 / .35);
	--ss-age-text: rgb(255 255 255 / .72);
	--ss-age-bg: rgb(255 255 255 / .12);

	display: inline-flex;
	align-items: center;
	gap: .3em;
	position: relative;
	font-family: inherit;
	font-size: inherit;
	line-height: 1;
	vertical-align: middle;
}

/*
 * The light values, shared by the media query and the explicit attribute. The
 * band colours are the same ones the leaderboard uses in its light theme, so a
 * score embedded elsewhere and the same score on the site are the same colour:
 * 5.1:1 or better on white, where the dark set manages 2:1.
 */
@media (prefers-color-scheme: light) {
	:host(:not([theme="dark"])) {
		--ss-good: #0a7c42;
		--ss-average: #9a6200;
		--ss-poor: #c02026;
		--ss-none: #6b6b6b;
		--ss-track: rgb(0 0 0 / .18);
		--ss-tip-bg: #ffffff;
		--ss-tip-text: #14161a;
		--ss-tip-link: #1a5fd0;
		--ss-tip-shadow: rgb(0 0 0 / .18);
		--ss-age-text: rgb(0 0 0 / .68);
		--ss-age-bg: rgb(0 0 0 / .08);
	}
}
:host([theme="light"]) {
	--ss-good: #0a7c42;
	--ss-average: #9a6200;
	--ss-poor: #c02026;
	--ss-none: #6b6b6b;
	--ss-track: rgb(0 0 0 / .18);
	--ss-tip-bg: #ffffff;
	--ss-tip-text: #14161a;
	--ss-tip-link: #1a5fd0;
	--ss-tip-shadow: rgb(0 0 0 / .18);
	--ss-age-text: rgb(0 0 0 / .68);
	--ss-age-bg: rgb(0 0 0 / .08);
}
:host([theme="dark"]) {
	--ss-good: #0cce6b;
	--ss-average: #ffa400;
	--ss-poor: #ff4e42;
	--ss-none: #888;
	--ss-track: rgb(136 136 136 / .35);
	--ss-tip-bg: #1c1c1c;
	--ss-tip-text: #fff;
	--ss-tip-link: #7cc0ff;
	--ss-tip-shadow: rgb(0 0 0 / .35);
	--ss-age-text: rgb(255 255 255 / .72);
	--ss-age-bg: rgb(255 255 255 / .12);
}

:host([hidden]) { display: none; }

/*
 * The ring geometry lives in the viewBox (37 units across, 3 of stroke, text at
 * 12), which is the build-time scoreRing shortcode's box exactly — so a score
 * embedded on someone else's page and the same score on the leaderboard are the
 * same picture, padding included. Only the outer size is in em units, so the
 * whole thing still scales with whatever font size it is dropped into.
 */
.ring {
	display: block;
	flex: none;
	overflow: visible;
	width: 2.467em;
	height: 2.467em;
}
.ring-track { stroke: var(--ss-track); }
.ring-arc { stroke: currentColor; }
.ring-text {
	font-family: inherit;
	font-size: 12px;
	font-weight: 650;
	font-variant-numeric: tabular-nums;
	fill: currentColor;
}
/* Part of the mark rather than an annotation beside it: currentColor is the
   band colour, the same one the value above it uses. */
.ring-sublabel {
	font-family: inherit;
	font-size: 6px;
	font-weight: 700;
	letter-spacing: .04em;
	fill: currentColor;
}
/*
 * The placeholder: the track alone, at the size the finished ring occupies —
 * that is what stops the swap from moving anything — with the arc, the value
 * and the colour all withheld until they are known.
 */
.skeleton {
	color: var(--ss-none);
	opacity: .45;
	animation: speedlify-pulse 1.4s ease-in-out infinite;
}
@keyframes speedlify-pulse {
	0%, 100% { opacity: .25; }
	50%      { opacity: .6; }
}
@media (prefers-reduced-motion: reduce) {
	.skeleton { animation: none; }
}

.good    { color: var(--ss-good); }
.average { color: var(--ss-average); }
.poor    { color: var(--ss-poor); }
.none    { color: var(--ss-none); }

/* The trigger is a button so it is reachable by keyboard, not just hover. */
.trigger {
	all: unset;
	display: inline-flex;
	align-items: center;
	gap: .3em;
	cursor: help;
}
.trigger:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; border-radius: 4px; }

.tip {
	position: absolute;
	/* Flush against the trigger. Any gap here is a dead zone — the pointer
	   leaves the host before it reaches the card, the hover drops, and the card
	   the pointer was travelling to disappears mid-journey. */
	bottom: 100%;
	left: 0;
	z-index: 20;
	min-width: 15em;
	padding: .6em .75em;
	border-radius: 6px;
	background: var(--ss-tip-bg);
	color: var(--ss-tip-text);
	font-size: .8rem;
	line-height: 1.45;
	text-align: left;
	box-shadow: 0 4px 16px var(--ss-tip-shadow);
	opacity: 0;
	visibility: hidden;
	transition: opacity .12s ease;
}
/*
 * :focus-within is what makes the links inside reachable by keyboard: tabbing
 * off the trigger moves focus into the tooltip, at which point .trigger:focus
 * no longer matches and the card would otherwise vanish under the cursor.
 */
:host(:hover) .tip, .trigger:focus ~ .tip, .tip:hover, .tip:focus-within { opacity: 1; visibility: visible; }
@media (prefers-reduced-motion: reduce) { .tip { transition: none; } }

.tip dl { display: grid; grid-template-columns: auto auto; gap: .15em .75em; margin: .4em 0 0; }
.tip dt { opacity: .65; }
.tip dd { margin: 0; text-align: right; font-variant-numeric: tabular-nums; }
.tip .name { display: inline-block; font-weight: 700; word-break: break-all; }
/*
 * The age reads as a pill, the same shape the leaderboard gives it, so a badge
 * and the page it links to label freshness the same way. Translucent black or
 * white rather than a fixed grey, so it sits on whichever tooltip surface the
 * theme picked.
 */
.age {
	display: inline-block;
	margin-top: .2em;
	padding: .1em .55em;
	border-radius: 50px;
	font-size: .85em;
	font-variant-numeric: tabular-nums;
	color: var(--ss-age-text);
	background: var(--ss-age-bg);
	white-space: nowrap;
}
.age.stale { color: var(--ss-average); background: rgb(255 164 0 / .16); }
.tip a { color: var(--ss-tip-link); }
`;

	/**
	 * The one description of a ring, in viewBox units, shared with the build-time
	 * scoreRing shortcode in eleventy.config.js.
	 *
	 * 31 units of hole for 12 units of text: "100" is three bold tabular digits
	 * that fill roughly 21 of them, which leaves a comfortable five either side.
	 * A tighter ring is legible but reads as cramped, and these sit six in a row.
	 */
	static geometry = (() => {
		const size = 37;
		const stroke = 3;
		const r = (size - stroke) / 2;
		return { size, stroke, r, c: size / 2, circumference: 2 * Math.PI * r };
	})();

	/** Labels are ours, but they carry measured values — escape them anyway. */
	static escape(value) {
		return String(value ?? "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;");
	}

	connectedCallback() {
		if (this.shadowRoot) return;

		this.attachShadow({ mode: "open" });

		// Painted before the fetch starts, at exactly the size the real circles
		// occupy. The data arrives one request later; without this the element is
		// zero-width until then and every score that loads pushes the text around
		// it. Reserving the space is the whole point — the pulse is just so the
		// placeholder reads as loading rather than as six empty results.
		this.renderSkeleton();

		this.init().catch((error) => {
			// A widget that cannot load its data should disappear, not shout on
			// someone else's page. The reason stays available for debugging.
			this.dataset.error = error.message;
			this.hidden = true;
		});
	}

	get speedlifyUrl() {
		const value = this.getAttribute(SpeedlifyScore.attrs.speedlifyUrl);
		if (!value) throw new Error(`<${SpeedlifyScore.tagName}> requires a ${SpeedlifyScore.attrs.speedlifyUrl} attribute`);
		return value;
	}

	renderSkeleton() {
		const style = document.createElement("style");
		style.textContent = SpeedlifyScore.css;

		const wrapper = document.createElement("div");
		wrapper.style.display = "contents";
		// Six, matching render(): four Lighthouse categories, Core Web Vitals, axe.
		// A button, matching render() exactly — `all: unset` normalises most of it,
		// but a span and a button are not guaranteed the same box, and any
		// difference here is the shift this method exists to prevent. Inert while
		// loading: there is nothing to describe yet.
		const placeholder = this.ring({ band: "skeleton", text: "", label: "", pct: null });
		wrapper.innerHTML =
			`<button class="trigger" type="button" tabindex="-1" aria-hidden="true">` +
			placeholder.repeat(6) +
			`</button>`;

		this.setAttribute("aria-busy", "true");
		this.shadowRoot.replaceChildren(style, wrapper);
	}

	async init() {
		const data = await store.load(this.speedlifyUrl, {
			// Default to the page this is embedded on.
			url: this.getAttribute(SpeedlifyScore.attrs.url) || location.href,
		});

		if (!data.measured) {
			this.hidden = true;
			return;
		}

		const style = document.createElement("style");
		style.textContent = SpeedlifyScore.css;

		const wrapper = document.createElement("div");
		wrapper.style.display = "contents";
		wrapper.innerHTML = this.render(data);

		this.shadowRoot.replaceChildren(style, wrapper);
		this.removeAttribute("aria-busy");

		// Escape closes the tooltip for keyboard users.
		this.shadowRoot.addEventListener("keydown", (event) => {
			if (event.key === "Escape") this.shadowRoot.querySelector(".trigger")?.blur();
		});
	}

	scoreClass(value) {
		if (typeof value !== "number") return "none";
		if (value >= 90) return "good";
		if (value >= 50) return "average";
		return "poor";
	}

	/**
	 * One ring, drawn exactly as the build-time `scoreRing` shortcode draws it:
	 * a grey track, an arc dashed to the value, and the number in the middle.
	 * Kept in step with eleventy.config.js by hand — the two run in different
	 * places and there is nothing to share between them but the numbers.
	 *
	 * `pct` is what fills the arc, and it is not always the value: axe counts and
	 * a Core Web Vitals verdict have no percentage, so they pass 1 and read as a
	 * closed ring whose colour carries the answer. `null` leaves the track bare,
	 * which is how "no data" looks in both renderers.
	 */
	ring({ band, text, label, pct, sublabel = "" }) {
		const { size, stroke, r, c, circumference } = SpeedlifyScore.geometry;
		const arc =
			typeof pct === "number"
				? `<circle class="ring-arc" cx="${c}" cy="${c}" r="${r}" fill="none" stroke-width="${stroke}"` +
					` stroke-dasharray="${(circumference * Math.max(0, Math.min(1, pct))).toFixed(2)} ${circumference.toFixed(2)}"` +
					` stroke-linecap="round" transform="rotate(-90 ${c} ${c})"/>`
				: "";

		return [
			`<svg class="ring ${band}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${SpeedlifyScore.escape(label)}">`,
			`<circle class="ring-track" cx="${c}" cy="${c}" r="${r}" fill="none" stroke-width="${stroke}"/>`,
			arc,
			// A sublabel shifts the value up so the pair sits centred as a block,
			// both still inside the ring.
			`<text class="ring-text" x="${c}" y="${sublabel ? c - 3.5 : c}" text-anchor="middle" dominant-baseline="central">${SpeedlifyScore.escape(text)}</text>`,
			sublabel
				? `<text class="ring-sublabel" x="${c}" y="${c + 7}" text-anchor="middle" dominant-baseline="central">${SpeedlifyScore.escape(sublabel)}</text>`
				: "",
			`</svg>`,
		].join("");
	}

	scoreHtml(label, value) {
		return this.ring({
			band: this.scoreClass(value),
			text: value ?? "–",
			label: `${label}: ${value ?? "no data"}`,
			pct: typeof value === "number" ? value / 100 : null,
		});
	}

	/**
	 * A violation count short enough to fit inside a ring.
	 *
	 * The only ring value that can outgrow its circle. Lighthouse scores stop at
	 * 100 and Core Web Vitals is a glyph, but axe counts violating *nodes* — one
	 * bad rule on a long table is thousands — and four digits at this size render
	 * 32 units wide in a 31-unit hole, spilling over the stroke and onto the
	 * neighbouring rings, which do not clip because the stroke's round cap needs
	 * overflow visible.
	 *
	 * The exact number stays in the label, so this costs nothing but precision no
	 * one reads off a 12-unit glyph anyway.
	 */
	shortCount(n) {
		if (n < 1000) return String(n);
		const k = n / 1000;
		if (k < 10) return `${k.toFixed(1).replace(/\.0$/, "")}k`;
		if (k < 99.5) return `${Math.round(k)}k`;
		return "99k+";
	}

	/**
	 * Axe violations, where the scale runs the other way.
	 *
	 * A Lighthouse score is better when higher; a violation count is better when
	 * zero. Banding it by the same thresholds would paint "2 violations" green
	 * for being a small number, so it gets its own: clean, or not clean.
	 */
	axeHtml(value) {
		if (typeof value !== "number") {
			return this.ring({ band: "none", text: "–", sublabel: "AXE", label: "Axe: did not run", pct: null });
		}
		return this.ring({
			band: value === 0 ? "good" : value <= 5 ? "average" : "poor",
			text: this.shortCount(value),
			// Labelled like the CWV ring beside it: a bare count is the one number
			// here that could be mistaken for a score, and 0 is the good end of
			// this scale where 0 would be the bad end of the four before it.
			sublabel: "AXE",
			label: `Axe: ${value} violating node${value === 1 ? "" : "s"}`,
			pct: 1,
		});
	}

	/**
	 * Core Web Vitals, which is a verdict rather than a number.
	 *
	 * A glyph instead of a value, because the underlying figure is three
	 * separate metrics and no single number represents them. The tooltip below
	 * carries the detail for anyone who wants it.
	 */
	cwvHtml(cwv) {
		if (!cwv || cwv.pass === null || cwv.pass === undefined) {
			return this.ring({ band: "none", text: "–", sublabel: "CWV", label: "Core Web Vitals: no data", pct: null });
		}
		const source = cwv.source === "field" ? "real users" : "lab approximation";
		return this.ring({
			band: cwv.pass ? "good" : "poor",
			text: cwv.pass ? "✓" : "✗",
			// The one ring whose value is a verdict rather than a number, so it is
			// the one that does not say what it is measuring.
			sublabel: "CWV",
			label: `Core Web Vitals: ${cwv.pass ? "pass" : "fail"} (${source})`,
			pct: 1,
		});
	}

	/**
	 * Bytes, in the units the label names: kB is a thousand, MB a million.
	 *
	 * Decimal rather than binary, matching the site and Chrome DevTools. Dividing
	 * by 1024 under an SI label reports "1015.8 kB" for a page over a million
	 * bytes — a figure that is, by its own label, more than a megabyte.
	 */
	bytes(n) {
		if (typeof n !== "number") return "–";
		if (n < 1000) return `${n} B`;
		// 999,950 rather than a million: the figure is rounded to one decimal, and
		// anything above this prints as "1000.0 kB" — a megabyte in smaller type.
		if (n < 999950) return `${(n / 1000).toFixed(1)} kB`;
		return `${(n / 1000 / 1000).toFixed(2)} MB`;
	}

	ms(n) {
		if (typeof n !== "number") return "–";
		return n < 1000 ? `${Math.round(n)} ms` : `${(n / 1000).toFixed(2)} s`;
	}

	since(iso) {
		if (!iso) return "never";
		const diff = Date.now() - new Date(iso).getTime();
		const minutes = Math.floor(diff / 60000);
		if (minutes < 60) return `${Math.max(1, minutes)}m`;
		const hours = Math.floor(diff / 3600000);
		return hours < 48 ? `${hours}h` : `${Math.floor(diff / 86400000)}d`;
	}

	/** The summary shown on hover or focus. */
	tooltip(data) {
		const rows = [];
		const row = (label, value) => value !== null && value !== undefined && rows.push(`<dt>${label}</dt><dd>${value}</dd>`);

		row("Total", `${data.total} / 400`);
		if (data.rank) row("Rank", `#${data.rank}`);
		row("LCP", this.ms(data.metrics?.lcp));
		row("Weight", this.bytes(data.metrics?.weight));
		row("Requests", data.metrics?.requests);
		if (data.axe !== null) row("Axe violations", data.axe);
		if (data.cwv) row("Core Web Vitals", data.cwv.pass === null ? "no data" : data.cwv.pass ? "pass" : "fail");
		if (data.generator) row("Built with", data.generator);
		if (data.host) row("Hosted by", data.host);

		const measured = `<span class="age${data.stale ? " stale" : ""}">${this.since(data.updated)} old</span>`;
		const link = `<a href="${SpeedlifyStore.join(this.speedlifyUrl, data.page)}">Full report</a>`;
		// The heading is the site itself, so it goes to the site — the report it
		// links to is one line below, and conflating the two would leave no way to
		// reach the thing being measured.
		const name = `<a class="name" href="${SpeedlifyScore.escape(data.url)}">${SpeedlifyScore.escape(data.name)}</a>`;

		return [
			`<span class="tip" role="tooltip" id="tip">`,
			`${name}<br>`,
			measured,
			`<dl>${rows.join("")}</dl>`,
			`<div style="margin-top:.5em">${link}</div>`,
			`</span>`,
		].join("");
	}

	/**
	 * Six circles: the four Lighthouse scores, Core Web Vitals, and axe
	 * violations.
	 *
	 * There is no configuration here on purpose: every instance of the component
	 * looks the same, so a page carrying several of them reads as one table
	 * rather than as a row of differently-shaped badges.
	 *
	 * These six are the ones the leaderboard ranks by — the four categories,
	 * then axe and Core Web Vitals, the two things Lighthouse's own four do not
	 * cover. Total, rank, weight and requests are all in the tooltip, which
	 * costs nothing until asked for.
	 */
	render(data) {
		const parts = [
			this.scoreHtml("Performance", data.lighthouse?.performance),
			this.scoreHtml("Accessibility", data.lighthouse?.accessibility),
			this.scoreHtml("Best Practices", data.lighthouse?.bestPractices),
			this.scoreHtml("SEO", data.lighthouse?.seo),
			// The two things Lighthouse's own four do not cover: a full axe run,
			// then real-user Core Web Vitals. Display order only — the ranking
			// still breaks ties on Core Web Vitals before axe.
			this.axeHtml(data.axe),
			this.cwvHtml(data.cwv),
		];

		return [
			`<button class="trigger" type="button" aria-describedby="tip">${parts.join("")}</button>`,
			this.tooltip(data),
		].join("");
	}
}

SpeedlifyScore.register();

export { SpeedlifyScore, SpeedlifyStore };
