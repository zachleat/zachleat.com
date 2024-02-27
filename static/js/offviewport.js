class OffViewport extends HTMLElement {
	static tagName = "off-viewport";

	static register(tagName) {
		if(!("customElements" in globalThis)) {
			return;
		}
		customElements.define(tagName || this.tagName, this);
	}

	static classes = {
		active: "active"
	};

	static css = `:host { display: block; }`;

	connectedCallback() {
		// https://caniuse.com/mdn-api_cssstylesheet_replacesync
		if(!("IntersectionObserver" in globalThis) || this.shadowRoot || !("replaceSync" in CSSStyleSheet.prototype)) {
			return;
		}

		let root = this.attachShadow({ mode: "open" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(OffViewport.css);
		root.adoptedStyleSheets = [sheet];
		let slot = document.createElement("slot");
		root.appendChild(slot);

		let observer = new IntersectionObserver(entries => {
			for(let entry of entries) {
				if(entry.isIntersecting) {
					this.classList.remove(OffViewport.classes.active);
				} else {
					this.classList.add(OffViewport.classes.active);
				}
			}
		},
		{
			threshold: .001 // .1% of element must be visible
		});

		observer.observe(this);
	}
}

OffViewport.register();
